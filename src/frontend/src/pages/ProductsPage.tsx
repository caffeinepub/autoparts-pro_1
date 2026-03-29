import { MessageCircle, Settings, ShoppingCart, Star } from "lucide-react";
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
  "Toyota Parts",
];

const categoryImages: Record<string, string> = {
  Engine: "/assets/generated/category-engine.dim_600x400.jpg",
  Brake: "/assets/generated/category-brake.dim_600x400.jpg",
  Electrical: "/assets/generated/category-electrical.dim_600x400.jpg",
  Suspension: "/assets/generated/category-suspension.dim_600x400.jpg",
  Accessories: "/assets/generated/category-accessories.dim_600x400.jpg",
};

interface ToyotaPart {
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
}

const toyotaParts: ToyotaPart[] = [
  {
    name: "Door",
    image: "/assets/generated/toyota-prado-door.dim_800x600.jpg",
    description:
      "OEM replacement door panel for Toyota Prado / Land Cruiser. Perfect fit with factory finish.",
    price: 450,
    rating: 4.7,
  },
  {
    name: "Roof / Sunroof",
    image: "/assets/generated/toyota-prado-sunroof.dim_800x600.jpg",
    description:
      "Panoramic sunroof glass assembly for Toyota Prado / Land Cruiser. Includes frame and seals.",
    price: 650,
    rating: 4.5,
  },
  {
    name: "Headlights",
    image: "/assets/generated/toyota-prado-headlight.dim_800x600.jpg",
    description:
      "LED headlamp assembly with chrome housing for Toyota Prado / Land Cruiser. Direct bolt-on.",
    price: 380,
    rating: 4.8,
  },
  {
    name: "Side Mirrors",
    image: "/assets/generated/toyota-prado-side-mirror.dim_800x600.jpg",
    description:
      "Power-foldable side mirror with turn signal for Toyota Prado / Land Cruiser. OEM quality.",
    price: 120,
    rating: 4.6,
  },
  {
    name: "Dashboard",
    image: "/assets/generated/toyota-prado-dashboard.dim_800x600.jpg",
    description:
      "Complete dashboard instrument panel for Toyota Prado / Land Cruiser. Premium leather trim finish.",
    price: 890,
    rating: 4.9,
  },
  {
    name: "LCD Screen",
    image: "/assets/generated/toyota-prado-lcd.dim_800x600.jpg",
    description:
      "Infotainment touchscreen LCD unit for Toyota Prado / Land Cruiser. Plug-and-play replacement.",
    price: 540,
    rating: 4.7,
  },
  {
    name: "Bonnet / Hood",
    image: "/assets/generated/toyota-prado-bonnet.dim_800x600.jpg",
    description:
      "OEM bonnet hood panel for Toyota Prado / Land Cruiser. Metallic silver factory finish.",
    price: 320,
    rating: 4.5,
  },
  {
    name: "Side Panel",
    image: "/assets/generated/toyota-prado-side-panel.dim_800x600.jpg",
    description:
      "Body side panel for Toyota Prado / Land Cruiser. Precision-cut for exact OEM replacement.",
    price: 280,
    rating: 4.6,
  },
];

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
  const imgSrc =
    categoryImages[product.category] ??
    "/assets/generated/category-engine.dim_600x400.jpg";
  return (
    <motion.div
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div className="h-44 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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

function ToyotaPartCard({ part, index }: { part: ToyotaPart; index: number }) {
  const whatsappNumber = "923071111234";
  const message = encodeURIComponent(
    `Hi! I'm interested in the ${part.name} for Toyota Prado / Land Cruiser. Price: $${part.price}. Please share availability.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      data-ocid={`toyota.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div className="h-44 overflow-hidden relative">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 text-[10px] font-display font-bold uppercase tracking-widest text-white bg-primary px-2 py-0.5 rounded-sm">
          TOYOTA
        </span>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-display font-bold uppercase tracking-widest text-muted-foreground mb-1">
          Toyota Prado / Land Cruiser
        </p>
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-2 leading-snug">
          {part.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
          {part.description}
        </p>
        <StarRating rating={part.rating} />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <span className="font-display font-black text-lg text-foreground">
            ${part.price.toFixed(2)}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`toyota.inquire.${index + 1}`}
            className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white font-display font-bold text-[11px] uppercase tracking-widest hover:bg-green-700 transition-colors rounded-sm"
          >
            <MessageCircle className="w-3 h-3" />
            INQUIRE
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const isToyotaTab = activeCategory === "Toyota Parts";
  const { data: products = [], isLoading } = useProductsByCategory(
    isToyotaTab ? "All" : activeCategory,
  );

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
          {isToyotaTab ? (
            <>
              <div className="mb-6">
                <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-1">
                  GENUINE & OEM PARTS
                </p>
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                  Toyota Prado / Land Cruiser Parts
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {toyotaParts.map((part, i) => (
                  <ToyotaPartCard key={part.name} part={part} index={i} />
                ))}
              </div>
            </>
          ) : isLoading ? (
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
