import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ImagePlus,
  LogOut,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { CATEGORIES, addUpload, logout } from "../utils/adminStore";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const STATUS_OPTIONS = [
  { key: "published", label: "Published" },
  { key: "draft", label: "Draft" },
];

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].key);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("published");
  const [photos, setPhotos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const next = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }
    if (photos.length === 0) {
      setError("Add at least one product photo.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const dataUrls = await Promise.all(photos.map((p) => readFileAsDataURL(p.file)));
      addUpload(category, {
        name,
        images: dataUrls,
        price,
        stock,
        sku,
        description,
        status,
      });
      navigate("/admin", { replace: true });
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

  return (
    <div className="bg-cream min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-ink/10 pb-8">
          <div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs text-ink/50 hover:text-gold-dark transition-colors mb-3"
            >
              <ArrowLeft size={14} /> Back to dashboard
            </Link>
            <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">
              Admin / Products
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-ink mt-3 uppercase">
              Add Product
            </h1>
            <p className="text-ink/50 text-sm mt-2">
              Fill in the details below to publish a new product to the store.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-gold-dark/30 px-5 py-2.5 text-sm text-gold-dark hover:bg-gold hover:text-ink transition-all self-start"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-charcoal border border-gold-dark/20 rounded-2xl p-6 sm:p-8">
              <h2 className="text-ink font-semibold mb-5">Product Information</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Product name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Classic Oxford Shirt"
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Fabric, fit, care instructions..."
                    rows={5}
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-charcoal border border-gold-dark/20 rounded-2xl p-6 sm:p-8">
              <h2 className="text-ink font-semibold mb-5">Media</h2>

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

              {photos.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-6">
                  {photos.map((item, i) => (
                    <div
                      key={item.previewUrl}
                      className="group relative rounded-xl border border-ink/10 overflow-hidden bg-cream/40"
                    >
                      <img src={item.previewUrl} alt="" className="w-full aspect-[4/5] object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label="Remove photo"
                        className="absolute top-1.5 right-1.5 rounded-full bg-ink/70 p-1.5 text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 text-ink/40 text-xs mt-4">
                  <ImagePlus size={16} /> No photos added yet.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar column */}
          <div className="space-y-6">
            <div className="bg-charcoal border border-gold-dark/20 rounded-2xl p-6 sm:p-8">
              <h2 className="text-ink font-semibold mb-5">Pricing & Inventory</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. LMO-SHRT-001"
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-charcoal border border-gold-dark/20 rounded-2xl p-6 sm:p-8">
              <h2 className="text-ink font-semibold mb-5">Organize</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wide text-ink/60 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-cream/40 px-4 py-3 text-sm text-ink outline-none focus:border-gold-dark/50"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink hover:bg-gold-light transition-all disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
              <Link
                to="/admin"
                className="text-center text-sm text-ink/50 hover:text-red-500 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
