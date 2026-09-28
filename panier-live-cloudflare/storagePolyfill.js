// Polyfills the `window.storage` API (get/set/delete/list) that the app expects,
// backed by a Netlify Function (netlify/functions/storage.mts) which itself
// persists data in Netlify Blobs. This lets the app's existing storage calls
// work unmodified once deployed on Netlify.

const API_BASE = '/api/storage';

async function safeJson(res) {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}

window.storage = {
  async get(key, shared = false) {
    const res = await fetch(`${API_BASE}?action=get&key=${encodeURIComponent(key)}&shared=${shared}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`storage.get failed (${res.status})`);
    return safeJson(res);
  },

  async set(key, value, shared = false) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'set', key, value, shared }),
    });
    if (!res.ok) throw new Error(`storage.set failed (${res.status})`);
    return safeJson(res);
  },

  async delete(key, shared = false) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', key, shared }),
    });
    if (!res.ok) throw new Error(`storage.delete failed (${res.status})`);
    return safeJson(res);
  },

  async list(prefix = '', shared = false) {
    const res = await fetch(`${API_BASE}?action=list&prefix=${encodeURIComponent(prefix)}&shared=${shared}`);
    if (!res.ok) throw new Error(`storage.list failed (${res.status})`);
    return safeJson(res);
  },
};
