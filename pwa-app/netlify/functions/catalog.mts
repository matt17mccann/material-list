import { getStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore({ name: "catalog", consistency: "strong" });

  // GET — return the lumber catalog
  if (req.method === "GET") {
    const catalog = await store.get("current", { type: "json" });
    // Returns null if not yet set — client will seed defaults
    return new Response(JSON.stringify(catalog));
  }

  // PUT — replace the catalog
  if (req.method === "PUT") {
    const body = await req.json();
    await store.setJSON("current", body);
    return new Response(JSON.stringify({ success: true }));
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
};

export const config: Config = {
  path: "/api/catalog",
};
