// Simple JSON config fetcher with in-memory cache
const cache = new Map();

export async function fetchConfig(name) {
  const key = `config:${name}`;
  if (cache.has(key)) return cache.get(key);
  const res = await fetch(`/config/${name}.json`, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to load ${name} config (${res.status})`);
  const data = await res.json();
  cache.set(key, data);
  return data;
}

export async function fetchWallet() {
  const res = await fetch('/config/wallet.json', { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to load wallet (${res.status})`);
  return res.json();
}

export async function fetchSettingsDefaults() {
  const res = await fetch('/config/settings.json', { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to load settings defaults (${res.status})`);
  return res.json();
}