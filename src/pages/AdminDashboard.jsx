import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImagePlus, LogOut, Plus, Trash2, UploadCloud } from "lucide-react";
import {
  CATEGORIES,
  addUpload,
  getUploads,
  logout,
  removeUpload,
  subscribeToUploads,
} from "../utils/adminStore";
import ImageSlider from "../components/ImageSlider";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].key);
  const [uploads, setUploads] = useState(() => getUploads(activeCategory));
  const [pendingName, setPendingName] = useState("");
  const [pendingPhotos, setPendingPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const refresh = () => setUploads(getUploads(activeCategory));
    refresh();
    return subscribeToUploads(refresh);
  }, [activeCategory]);

  const clearPending = () => {
    pendingPhotos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingPhotos([]);
    setPendingName("");
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const next = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPendingPhotos((prev) => [...prev, ...next]);
    if (!pendingName && files[0]) {
      setPendingName(files[0].name.replace(/\.[^.]+$/, ""));
    }
    e.target.value = "";
  };

  const removePendingPhoto = (index) => {
    setPendingPhotos((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSave = async () => {
    if (pendingPhotos.length === 0) return;
    setSaving(true);
    setError("");
    try {
      const dataUrls = await Promise.all(pendingPhotos.map((p) => readFileAsDataURL(p.file)));
      addUpload(activeCategory, { name: pendingName, images: dataUrls });
      clearPending();
    } catch (err) {
      setError(
        err?.name === "QuotaExceededError"
          ? "Storage is full. Remove some photos or use smaller images."
          : "Something went wrong while saving. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const activeLabel = CATEGORIES.find((c) => c.key === activeCategory)?.label;

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-ink/10 pb-8">
          <div>
            <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Admin</span>
            <h1 className="font-display text-4xl sm:text-5xl text-ink mt-3 uppercase">
              Manage Products
            </h1>
            <p className="text-ink/50 text-sm mt-2">
              Upload photos for each category — saved photos appear on the site instantly.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start">
            <Link
              to="/admin/add-product"
              className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light transition-all"
            >
              <Plus size={16} /> Add Product
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-gold-dark/30 px-5 py-2.5 text-sm text-gold-dark hover:bg-gold hover:text-ink transition-all"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setActiveCategory(c.key);
                clearPending();
                setError("");
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === c.key
                  ? "bg-gold text-ink"
                  : "border border-ink/15 text-ink/60 hover:border-gold-dark/50 hover:text-gold-dark"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="bg-charcoal border border-gold-dark/20 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="text-ink font-semibold mb-5">Add photos to {activeLabel}</h2>

          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold-dark/30 py-10 cursor-pointer hover:border-gold-dark/60 transition-colors">
            <UploadCloud size={28} className="text-gold-dark" />
            <span className="text-sm text-ink/70">Click to choose photos, or drag them here</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </label>

          {pendingPhotos.length > 0 && (
            <div className="mt-6 space-y-4">
              <p className="text-xs text-ink/50">
                These photos will be saved together as one product with a photo slider. Add more photos of the
                same item, or click Save to publish.
              </p>

              <input
                type="text"
                value={pendingName}
                onChange={(e) => setPendingName(e.target.value)}
                placeholder="Product name"
                className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-dark/50"
              />

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {pendingPhotos.map((item, i) => (
                  <div
                    key={item.previewUrl}
                    className="group relative rounded-xl border border-ink/10 overflow-hidden bg-cream/40"
                  >
                    <img src={item.previewUrl} alt="" className="w-full aspect-[4/5] object-cover" />
                    <button
                      onClick={() => removePendingPhoto(i)}
                      aria-label="Remove photo"
                      className="absolute top-1.5 right-1.5 rounded-full bg-ink/70 p-1.5 text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-ink hover:bg-gold-light transition-all disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : `Save product (${pendingPhotos.length} photo${pendingPhotos.length > 1 ? "s" : ""}) to ${activeLabel}`}
                </button>
                <button
                  onClick={clearPending}
                  disabled={saving}
                  className="text-sm text-ink/50 hover:text-red-500 transition-colors disabled:opacity-60"
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-ink font-semibold mb-4">
            Live on site — {activeLabel} ({uploads.length})
          </h2>
          {uploads.length === 0 ? (
            <div className="flex items-center gap-3 text-ink/50 text-sm py-8">
              <ImagePlus size={18} /> No uploaded photos yet for {activeLabel}.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {uploads.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl overflow-hidden border border-ink/10 bg-charcoal"
                >
                  <div className="relative aspect-[4/5]">
                    <ImageSlider
                      images={item.images && item.images.length ? item.images : [item.img]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-ink text-sm truncate">{item.name}</p>
                    {item.images && item.images.length > 1 && (
                      <p className="text-ink/40 text-xs mt-0.5">{item.images.length} photos</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeUpload(activeCategory, item.id)}
                    className="absolute top-2 right-2 rounded-full bg-ink/70 p-2 text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                    aria-label="Remove photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
