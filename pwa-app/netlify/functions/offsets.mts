import { getStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore({ name: "offsets", consistency: "strong" });

  // GET — return the calculation offsets
  if (req.method === "GET") {
    const offsets = await store.get("current", { type: "json" });
    // Returns null if not yet set — client will seed defaults
    return new Response(JSON.stringify(offsets));
  }

  // PUT — replace the offsets
  if (req.method === "PUT") {
    const body = await req.json();
    await store.setJSON("current", body);
    return new Response(JSON.stringify({ success: true }));
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
};

export const config: Config = {
  path: "/api/offsets",
};
