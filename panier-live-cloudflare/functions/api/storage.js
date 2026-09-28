// Cloudflare Pages Function — handles GET/POST on /api/storage
// Backed by a Workers KV namespace bound as PANIER_KV (set this binding
// name in the Cloudflare dashboard: Settings -> Functions -> KV namespace
// bindings, or via wrangler.toml when using the CLI).

export async function onRequestGet(context) {
  const { request, env } = context;
  const kv = env.PANIER_KV;
  if (!kv) return jsonResponse({ error: "PANIER_KV binding is not configured" }, 500);

  const url = new URL(request.url);
  const action = url.searchParams.get("action") || "get";

  if (action === "list") {
    const prefix = url.searchParams.get("prefix") || undefined;
    const shared = url.searchParams.get("shared") === "true";
    const listResult = await kv.list(prefix ? { prefix } : undefined);
    return jsonResponse({ keys: listResult.keys.map((k) => k.name), prefix, shared });
  }

  const key = url.searchParams.get("key");
  const shared = url.searchParams.get("shared") === "true";
  if (!key) return jsonResponse({ error: "missing key" }, 400);

  const value = await kv.get(key);
  if (value === null) return jsonResponse(null, 404);
  return jsonResponse({ key, value, shared });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const kv = env.PANIER_KV;
  if (!kv) return jsonResponse({ error: "PANIER_KV binding is not configured" }, 500);

  let body;
  try {
    body = await request.json();
  } catch (e) {
    body = null;
  }
  const { action, key, value, shared } = body || {};
  if (!key) return jsonResponse({ error: "missing key" }, 400);

  if (action === "delete") {
    await kv.delete(key);
    return jsonResponse({ key, deleted: true, shared: !!shared });
  }

  await kv.put(key, typeof value === "string" ? value : JSON.stringify(value));
  return jsonResponse({ key, value, shared: !!shared });
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
