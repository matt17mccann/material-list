import type { Context, Config } from "@netlify/functions";

// Truck Report — proxies the joblist's truck-report feed (jobs whose product is
// arriving, with delivery dates) so the home page can show what's coming in and
// which material lists to print. The joblist key stays server-side; the feed
// URL sits next to the material-list intake URL already configured in
// JOBLIST_API_URL (…/.netlify/functions/material-list → …/truck-report).
export default async (req: Request, context: Context) => {
  const base = process.env.JOBLIST_API_URL;
  const key = process.env.JOBLIST_API_KEY;
  if (!base || !key) {
    return new Response(JSON.stringify({ ok: false, configured: false, error: "Joblist not connected" }), { status: 503 });
  }
  const feed = process.env.JOBLIST_TRUCK_URL || base.replace(/material-list\/?$/, "truck-report");
  const q = new URL(req.url).searchParams;
  const params = new URLSearchParams();
  for (const k of ["back", "ahead"]) { const v = q.get(k); if (v && /^\d{1,3}$/.test(v)) params.set(k, v); }
  try {
    const upstream = await fetch(feed + (params.toString() ? "?" + params : ""), {
      headers: { Authorization: `Bearer ${key}` },
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "fetch failed" }), { status: 502 });
  }
};

export const config: Config = {
  path: "/api/truck-report",
};
