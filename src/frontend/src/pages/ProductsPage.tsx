import { Settings, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { useProductsByCategory } from "../hooks/useQueries";

const categories = [
  "All",
  "Engine",
  "Brake",
  "Electrical",
  "Suspension",
  "Accessories",
];

const categoryColors: Record<string, string> = {
  Engine: "bg-blue-900",
  Brake: "bg-red-900",
  Electrical: "bg-green-900",
  Suspension: "bg-amber-900",
  Accessories: "bg-purple-900",
};

const skeletonKeys = [
  "sk-1",
  "sk-2",
  "sk-3",
  "sk-4",
  "sk-5",
  "sk-6",
  "sk-7",
  "sk-8",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-primary text-primary" : "text-gray-300"}`}
        />
      ))}
      <span className="ml-1 text-[11px] text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const bg = categoryColors[product.category] ?? "bg-gray-800";
  return (
    <motion.div
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div className={`h-44 ${bg} flex items-center justify-center`}>
        <Settings className="w-14 h-14 text-white/25" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-primary border border-primary/30 px-2 py-0.5 rounded-sm">
            {product.category}
          </span>
          {product.featured && (
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white bg-secondary px-2 py-0.5 rounded-sm">
              FEATURED
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-2 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-display font-black text-lg text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            data-ocid={`products.add_to_cart.${index + 1}`}
            className="flex items-center gap-1.5 px-3 py-2 bg-secondary text-secondary-foreground font-display font-bold text-[11px] uppercase tracking-widest hover:bg-secondary/80 transition-colors rounded-sm"
          >
            <ShoppingCart className="w-3 h-3" />
            ADD TO CART
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products = [], isLoading } =
    useProductsByCategory(activeCategory);

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <section className="bg-secondary py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-3">
              PARTS CATALOG
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              ALL PRODUCTS
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-border sticky top-[112px] z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            className="flex overflow-x-auto gap-0 scrollbar-none"
            data-ocid="products.category.tab"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="products.filter.tab"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-4 font-display font-bold text-xs uppercase tracking-[0.12em] border-b-2 transition-colors ${
                  activeCategory === cat
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div
              data-ocid="products.loading_state"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {skeletonKeys.map((k) => (
                <div
                  key={k}
                  className="bg-white border border-border rounded-sm overflow-hidden animate-pulse"
                >
                  <div className="h-44 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div data-ocid="products.empty_state" className="text-center py-20">
              <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground mb-2">
                NO PARTS FOUND
              </h3>
              <p className="text-muted-foreground text-sm">
                No products in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, i) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
