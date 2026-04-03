import { getStore } from "@netlify/blobs";
import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore({ name: "jobs", consistency: "strong" });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  // GET — list all jobs or get one by ID
  if (req.method === "GET") {
    if (id) {
      const job = await store.get(id, { type: "json" });
      if (!job) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
      return new Response(JSON.stringify(job));
    }

    // List all jobs — return summaries
    const { blobs } = await store.list();
    const jobs: any[] = [];
    for (const blob of blobs) {
      const data = await store.get(blob.key, { type: "json" });
      if (data) {
        jobs.push({
          id: data.id,
          job: data.job,
          units: data.units,
          savedAt: data.savedAt,
          status: data.status || "in_progress",
          starred: data.starred || false,
        });
      }
    }
    // Sort newest first
    jobs.sort((a, b) => (b.savedAt || "").localeCompare(a.savedAt || ""));
    return new Response(JSON.stringify(jobs));
  }

  // POST — save/update a job
  if (req.method === "POST") {
    const body = await req.json();
    if (!body.id) {
      return new Response(JSON.stringify({ error: "Missing job id" }), { status: 400 });
    }
    await store.setJSON(body.id.toString(), body);
    return new Response(JSON.stringify({ success: true, id: body.id }));
  }

  // DELETE — remove a job
  if (req.method === "DELETE") {
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
    }
    await store.delete(id);
    return new Response(JSON.stringify({ success: true }));
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
};

export const config: Config = {
  path: "/api/jobs",
};
