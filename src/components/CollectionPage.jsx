import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

const SIZES = ["S", "M", "L", "XL", "XXL"];
const PRICE_BUCKETS = [
  { id: "all", label: "All Prices" },
  { id: "under900", label: "Under Rs. 900" },
  { id: "900-1000", label: "Rs. 900 – 1,000" },
  { id: "1000plus", label: "Rs. 1,000+" },
];
const SORTS = [
  { id: "relevance", label: "Relevance" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "name", label: "Name: A to Z" },
];

function inBucket(price, bucket) {
  if (bucket === "under900") return price < 900;
  if (bucket === "900-1000") return price >= 900 && price <= 1000;
  if (bucket === "1000plus") return price > 1000;
  return true;
}

export default function CollectionPage({ title, products }) {
  const [availability, setAvailability] = useState("all");
  const [priceBucket, setPriceBucket] = useState("all");
  const [sizes, setSizes] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;

  const toggleSize = (s) =>
    setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (availability === "in-stock" && !p.inStock) return false;
      if (availability === "out-of-stock" && p.inStock) return false;
      if (!inBucket(p.price, priceBucket)) return false;
      if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
      return true;
    });

    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [products, availability, priceBucket, sizes, sort]);

  const resetFilters = () => {
    setAvailability("all");
    setPriceBucket("all");
    setSizes([]);
  };
  const [slideIndex, setSlideIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(filtered.length - visibleCount, 0);
    if (slideIndex > maxIndex) {
      setSlideIndex(maxIndex);
    }
  }, [filtered.length, visibleCount, slideIndex]);

  const totalSlides = Math.max(filtered.length - visibleCount + 1, 1);
  const maxIndex = Math.max(filtered.length - visibleCount, 0);

  const moveSlide = (delta) => {
    setSlideIndex((prev) => Math.min(Math.max(prev + delta, 0), maxIndex));
  };

  return (
    <div className="bg-cream pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-ink/50 mb-6">
          <Link to="/" className="hover:text-gold-dark transition-colors">Home</Link>
          <ChevronRight size={13} />
          <span className="text-gold-dark">{title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-ink/10 pb-8">
          <div>
            <span className="text-xs tracking-[0.3em] text-gold-dark uppercase">Men</span>
            <h1 className="font-display text-4xl sm:text-5xl text-ink mt-3 uppercase">
              {title}
            </h1>
            <p className="text-ink/50 text-sm mt-2">{filtered.length} products</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-full border border-gold-dark/30 px-4 py-2 text-sm text-gold-dark"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
            <label className="flex items-center gap-2 text-sm text-ink/60">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-charcoal border border-ink/10 rounded-lg px-3 py-2 text-ink text-sm focus:outline-none focus:border-gold-dark/50"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block space-y-8">
            <FilterPanel
              availability={availability}
              setAvailability={setAvailability}
              inStockCount={inStockCount}
              outOfStockCount={outOfStockCount}
              priceBucket={priceBucket}
              setPriceBucket={setPriceBucket}
              sizes={sizes}
              toggleSize={toggleSize}
              resetFilters={resetFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-ink/50" onClick={() => setFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-charcoal border-l border-gold-dark/20 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-ink font-semibold">Filters</p>
                  <button onClick={() => setFiltersOpen(false)} className="text-ink/60 hover:text-gold-dark">
                    <X size={22} />
                  </button>
                </div>
                <FilterPanel
                  availability={availability}
                  setAvailability={setAvailability}
                  inStockCount={inStockCount}
                  outOfStockCount={outOfStockCount}
                  priceBucket={priceBucket}
                  setPriceBucket={setPriceBucket}
                  sizes={sizes}
                  toggleSize={toggleSize}
                  resetFilters={resetFilters}
                />
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="mt-8 w-full rounded-full bg-gold py-3 text-sm font-semibold text-ink"
                >
                  Show {filtered.length} results
                </button>
              </div>
            </div>
          )}

          {/* Product slider */}
          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-ink/60">
                No {title.toLowerCase()} match your filters.
                <button onClick={resetFilters} className="block mx-auto mt-4 text-gold-dark hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-ink/95 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-cream font-semibold shadow-[0_20px_45px_rgba(0,0,0,0.18)]">
                      {`Slide ${slideIndex + 1} of ${totalSlides}`}
                    </span>
                    <span className="text-sm text-ink/70">
                      Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                    </span>
                  </div>
                  {/* header navigation removed — overlay arrows inside carousel provide navigation */}
                </div>
                <div className="relative w-full max-w-full overflow-visible">
                  <div className="overflow-hidden relative">
                    <button
                      type="button"
                      onClick={() => moveSlide(-1)}
                      disabled={slideIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-sm p-3 text-cream transition hover:bg-black/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg pointer-events-auto opacity-100 z-50"
                      aria-label="Previous slide"
                    >
                      <ChevronRight size={18} className="rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSlide(1)}
                      disabled={slideIndex >= maxIndex}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-sm p-3 text-cream transition hover:bg-black/50 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg pointer-events-auto opacity-100 z-50"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <div
                      className="flex gap-5 transition-transform duration-500"
                      style={{ transform: `translateX(calc(-${slideIndex * (100 / visibleCount)}%))` }}
                    >
                      {filtered.map((product, i) => (
                        <div
                          key={product.id}
                          className="shrink-0 px-2 sm:px-3"
                          style={{ flex: `0 0 calc(100% / ${visibleCount})`, width: `calc(100% / ${visibleCount})`, maxWidth: "20rem" }}
                        >
                          <ProductCard product={product} index={i} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`transition-all rounded-full ${
                        idx === slideIndex
                          ? "h-3 w-10 bg-gold shadow-[0_10px_25px_rgba(244,196,48,0.25)]"
                          : "h-3 w-3 bg-ink/30 hover:w-8 hover:bg-ink/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  availability,
  setAvailability,
  inStockCount,
  outOfStockCount,
  priceBucket,
  setPriceBucket,
  sizes,
  toggleSize,
  resetFilters,
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-ink font-semibold text-sm mb-3 uppercase tracking-wide">Availability</p>
        <div className="space-y-2 text-sm">
          {[
            { id: "all", label: "All", count: inStockCount + outOfStockCount },
            { id: "in-stock", label: "In stock", count: inStockCount },
            { id: "out-of-stock", label: "Out of stock", count: outOfStockCount },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center justify-between cursor-pointer group">
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="availability"
                  checked={availability === opt.id}
                  onChange={() => setAvailability(opt.id)}
                  className="accent-yellow-600"
                />
                <span className={`transition-colors ${availability === opt.id ? "text-gold-dark" : "text-ink/60 group-hover:text-ink/80"}`}>
                  {opt.label}
                </span>
              </span>
              <span className="text-ink/40 text-xs">({opt.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-ink font-semibold text-sm mb-3 uppercase tracking-wide">Price</p>
        <div className="space-y-2 text-sm">
          {PRICE_BUCKETS.map((b) => (
            <label key={b.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={priceBucket === b.id}
                onChange={() => setPriceBucket(b.id)}
                className="accent-yellow-600"
              />
              <span className={`transition-colors ${priceBucket === b.id ? "text-gold-dark" : "text-ink/60 group-hover:text-ink/80"}`}>
                {b.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-ink font-semibold text-sm mb-3 uppercase tracking-wide">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`h-9 w-9 rounded-lg border text-xs font-medium transition-all ${
                sizes.includes(s)
                  ? "border-gold bg-gold text-ink"
                  : "border-ink/15 text-ink/60 hover:border-gold-dark/50 hover:text-gold-dark"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button onClick={resetFilters} className="text-xs text-ink/50 hover:text-gold-dark underline underline-offset-2">
        Clear all filters
      </button>
    </div>
  );
}

function ProductCard({ product, index }) {
  const hasPrice = product.price > 0;
  const save = product.compareAt - product.price;
  const whatsappMsg = encodeURIComponent(
    hasPrice
      ? `Hi! I'm interested in the "${product.name}" (Rs. ${product.price}). Is it available?`
      : `Hi! I'm interested in the "${product.name}". Is it available?`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group relative rounded-2xl overflow-hidden border border-ink/10 bg-charcoal shadow-[0_20px_60px_rgba(244,196,48,0.14)] hover:border-gold-dark/50 hover:shadow-[0_20px_80px_rgba(244,196,48,0.24)] transition-all duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center">
        <div className="relative w-[92%] h-full rounded-lg overflow-hidden">
          <ImageSlider
            images={product.images && product.images.length ? product.images : [product.img]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
              !product.inStock ? "grayscale opacity-60" : ""
            }`}
          />

          {save > 0 && product.inStock && (
            <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold text-ink">
              Save Rs. {save}
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-3 left-3 rounded-full bg-ink/80 border border-cream/20 px-3 py-1 text-[11px] font-medium text-cream">
              Out of Stock
            </span>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
            <a
              href={product.inStock ? `https://wa.me/919677340615?text=${whatsappMsg}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!product.inStock}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                product.inStock
                  ? "bg-gold text-ink hover:bg-gold-light"
                  : "bg-cream/20 text-cream/60 pointer-events-none"
              }`}
            >
              {product.inStock ? "Order on WhatsApp" : "Notify Me"}
            </a>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-ink font-medium text-sm leading-snug">{product.name}</h3>
        {hasPrice && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gold-dark font-semibold">Rs. {product.price}.00</span>
            {product.compareAt > product.price && (
              <span className="text-ink/40 text-xs line-through">Rs. {product.compareAt}.00</span>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.sizes.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded border border-ink/10 text-ink/50">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
