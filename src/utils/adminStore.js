const AUTH_KEY = "lmo_admin_authed";
const UPLOADS_KEY = "lmo_uploaded_products";
const UPLOADS_EVENT = "lmo-uploads-changed";

const ADMIN_CREDENTIALS = {
  username: "ameen",
  password: "noor12345",
};

export const CATEGORIES = [
  { key: "shirts", label: "Shirts" },
  { key: "pants", label: "Pants" },
  { key: "tshirts", label: "T-Shirts" },
  { key: "trackpants", label: "Track Pants" },
];

export function login(username, password) {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function readAll() {
  try {
    const raw = localStorage.getItem(UPLOADS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(UPLOADS_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(UPLOADS_EVENT));
}

export function getUploads(categoryKey) {
  const all = readAll();
  return all[categoryKey] || [];
}

export function addUpload(
  categoryKey,
  { name, images, price, stock, sku, description, status }
) {
  const all = readAll();
  const list = all[categoryKey] || [];
  const photos = images && images.length ? images : [];
  const entry = {
    id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name?.trim() || "New Arrival",
    images: photos,
    img: photos[0] || "",
    price: price ? Number(price) : undefined,
    stock: stock ? Number(stock) : undefined,
    sku: sku?.trim() || undefined,
    description: description?.trim() || undefined,
    status: status || "published",
    addedAt: new Date().toISOString(),
  };
  all[categoryKey] = [entry, ...list];
  writeAll(all);
  return entry;
}

export function removeUpload(categoryKey, id) {
  const all = readAll();
  const list = all[categoryKey] || [];
  all[categoryKey] = list.filter((item) => item.id !== id);
  writeAll(all);
}

export function subscribeToUploads(callback) {
  window.addEventListener(UPLOADS_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPLOADS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
