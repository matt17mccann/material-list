import type { Context, Config } from "@netlify/functions";

// Forwards a submitted job's material-list PDF to the external joblist app.
// The API key lives here (server-side) so it is never exposed to the browser.
// Until JOBLIST_API_URL / JOBLIST_API_KEY are configured in Netlify env vars,
// this endpoint no-ops gracefully so submitting a job never fails.
//
// Resubmits send the same `jobId`, so the joblist app should upsert by jobId
// (create on first submit, replace the stored PDF on every resubmit).
//
// Connected to rba-joblist (JOBLIST_API_URL/KEY set in Netlify env, 2026-05-29).
export default async (req: Request, context: Context) => {
  const url = process.env.JOBLIST_API_URL;
  const key = process.env.JOBLIST_API_KEY;
  const configured = !!(url && key);

  // Cheap capability check so the client can skip generating a PDF when unconfigured.
  if (req.method === "GET") {
    return new Response(JSON.stringify({ configured }));
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  if (!configured) {
    // Not wired up yet — succeed silently so the submit flow is unaffected.
    return new Response(JSON.stringify({ configured: false, pushed: false }));
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  if (!body?.jobId) {
    return new Response(JSON.stringify({ error: "Missing jobId" }), { status: 400 });
  }

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        jobId: body.jobId,
        customerName: body.customerName || "",
        poNumber: body.poNumber || "",
        fileName: body.fileName || "material-list.pdf",
        savedAt: body.savedAt || new Date().toISOString(),
        pdfBase64: body.pdfBase64 || null,
        // Linear-feet cost payload (2026-07-29) — forwarded verbatim; the
        // joblist prices it against its material_prices key. Optional.
        materialLf: body.materialLf ?? null,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => "");
      return new Response(
        JSON.stringify({ configured: true, pushed: false, status: upstream.status, detail: text.slice(0, 500) }),
        { status: 502 }
      );
    }

    return new Response(JSON.stringify({ configured: true, pushed: true }));
  } catch (err: any) {
    return new Response(
      JSON.stringify({ configured: true, pushed: false, error: err?.message || "fetch failed" }),
      { status: 502 }
    );
  }
};

export const config: Config = {
  path: "/api/push-to-joblist",
};
