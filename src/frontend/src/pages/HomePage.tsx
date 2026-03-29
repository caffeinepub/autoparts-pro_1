import {
  Activity,
  ArrowRight,
  Disc,
  Headphones,
  Layers,
  Package,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type { BlogPost, Product } from "../backend.d";
import { useAllBlogPosts, useFeaturedProducts } from "../hooks/useQueries";

type Page = "home" | "about" | "products" | "services" | "blog" | "contact";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const categories = [
  {
    name: "ENGINE COMPONENTS",
    icon: Settings,
    gradient: "category-gradient-engine",
    count: "1,200+ Parts",
    img: "/assets/generated/category-engine.dim_600x400.jpg",
  },
  {
    name: "BRAKE SYSTEMS",
    icon: Disc,
    gradient: "category-gradient-brake",
    count: "850+ Parts",
    img: "/assets/generated/category-brake.dim_600x400.jpg",
  },
  {
    name: "ELECTRICAL PARTS",
    icon: Zap,
    gradient: "category-gradient-electrical",
    count: "600+ Parts",
    img: "/assets/generated/category-electrical.dim_600x400.jpg",
  },
  {
    name: "SUSPENSION & STEERING",
    icon: Activity,
    gradient: "category-gradient-suspension",
    count: "740+ Parts",
    img: "/assets/generated/category-suspension.dim_600x400.jpg",
  },
  {
    name: "ACCESSORIES & GEAR",
    icon: Layers,
    gradient: "category-gradient-accessories",
    count: "500+ Parts",
    img: "/assets/generated/category-accessories.dim_600x400.jpg",
  },
  {
    name: "PERFORMANCE UPGRADES",
    icon: TrendingUp,
    gradient: "category-gradient-performance",
    count: "320+ Parts",
    img: "/assets/generated/category-performance.dim_600x400.jpg",
  },
];

const toyotaParts = [
  { name: "Door", img: "/assets/generated/toyota-prado-door.dim_800x600.jpg" },
  {
    name: "Sunroof",
    img: "/assets/generated/toyota-prado-sunroof.dim_800x600.jpg",
  },
  {
    name: "Headlights",
    img: "/assets/generated/toyota-prado-headlight.dim_800x600.jpg",
  },
  {
    name: "Side Mirrors",
    img: "/assets/generated/toyota-prado-side-mirror.dim_800x600.jpg",
  },
  {
    name: "Dashboard",
    img: "/assets/generated/toyota-prado-dashboard.dim_800x600.jpg",
  },
  { name: "LCD", img: "/assets/generated/toyota-prado-lcd.dim_800x600.jpg" },
  {
    name: "Bonnet",
    img: "/assets/generated/toyota-prado-bonnet.dim_800x600.jpg",
  },
  {
    name: "Side Panel",
    img: "/assets/generated/toyota-prado-side-panel.dim_800x600.jpg",
  },
];

const whyChoose = [
  {
    icon: Shield,
    title: "GENUINE PARTS",
    desc: "OEM-certified components sourced directly from manufacturer-approved suppliers.",
  },
  {
    icon: Headphones,
    title: "EXPERT SUPPORT",
    desc: "Certified technicians available by phone or chat, 6 days a week.",
  },
  {
    icon: Truck,
    title: "FAST SHIPPING",
    desc: "Same-day dispatch on orders placed before 2 PM. Nationwide coverage.",
  },
  {
    icon: Package,
    title: "WIDE INVENTORY",
    desc: "Over 200,000 parts in stock for domestic and import vehicles, all years.",
  },
];

const categoryImages: Record<string, string> = {
  Engine: "/assets/generated/category-engine.dim_600x400.jpg",
  Brake: "/assets/generated/category-brake.dim_600x400.jpg",
  Electrical: "/assets/generated/category-electrical.dim_600x400.jpg",
  Suspension: "/assets/generated/category-suspension.dim_600x400.jpg",
  Accessories: "/assets/generated/category-accessories.dim_600x400.jpg",
  "Toyota Parts": "/assets/generated/toyota-parts-collection.dim_800x500.jpg",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= Math.round(rating)
              ? "fill-primary text-primary"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}

function formatPKR(price: number): string {
  return `PKR ${Math.round(price * 280).toLocaleString("en-PK")}`;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const imgSrc =
    categoryImages[product.category] ??
    "/assets/generated/category-engine.dim_600x400.jpg";
  return (
    <motion.div
      data-ocid={`products.featured.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-display font-bold uppercase tracking-widest text-primary mb-1 block">
          {product.category}
        </span>
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-2 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-black text-base text-foreground">
            {formatPKR(product.price)}
          </span>
          <button
            type="button"
            data-ocid={`products.featured.add_to_cart.${index + 1}`}
            className="px-3 py-2 bg-secondary text-secondary-foreground font-display font-bold text-xs uppercase tracking-widest hover:bg-secondary/80 transition-colors rounded-sm"
          >
            INQUIRE
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const blogGradients = [
    "from-slate-700 to-slate-900",
    "from-zinc-700 to-zinc-900",
  ];
  return (
    <motion.div
      data-ocid={`blog.preview.item.${index + 1}`}
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col sm:flex-row gap-5 bg-white border border-border rounded-sm overflow-hidden group hover:shadow-card transition-shadow"
    >
      <div
        className={`sm:w-48 h-36 sm:h-auto bg-gradient-to-br ${blogGradients[index % 2]} flex-shrink-0 flex items-center justify-center`}
      >
        <TrendingUp className="w-12 h-12 text-white/30" />
      </div>
      <div className="p-5 flex flex-col justify-center">
        <span className="text-xs text-muted-foreground mb-2 font-display uppercase tracking-widest">
          {post.date}
        </span>
        <h3 className="font-display font-bold text-base uppercase tracking-wide text-foreground mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <span className="text-primary text-xs font-display font-bold uppercase tracking-widest hover:underline cursor-pointer flex items-center gap-1">
          READ MORE <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: featuredProducts = [] } = useFeaturedProducts();
  const { data: blogPosts = [] } = useAllBlogPosts();

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[580px] md:min-h-[660px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-automotive.dim_1400x700.jpg')",
        }}
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 w-full py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-4">
              PERFORMANCE YOU CAN TRUST
            </p>
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05] tracking-tight text-white text-shadow mb-6">
              PREMIUM PERFORMANCE PARTS FOR EVERY DRIVE
            </h1>
            <p className="text-white/75 text-base leading-relaxed mb-8 max-w-md">
              Over 200,000 genuine and aftermarket parts in stock. Fast
              shipping, expert support, and unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                data-ocid="hero.shop_now.primary_button"
                onClick={() => onNavigate("products")}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
              >
                SHOP NOW
              </button>
              <button
                type="button"
                data-ocid="hero.learn_more.secondary_button"
                onClick={() => onNavigate("about")}
                className="px-8 py-3.5 border-2 border-white text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm"
              >
                LEARN MORE
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Official Parts Supplier Banner */}
      <motion.section
        data-ocid="toyota.supplier.section"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-foreground border-b-4 border-primary"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: label badge */}
          <div className="flex items-center gap-3">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground font-display font-black text-[10px] uppercase tracking-[0.2em] rounded-sm shrink-0">
              OFFICIAL PARTS SUPPLIER
            </span>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white leading-none">
              TOYOTA PRADO &amp; LAND CRUISER
            </h2>
          </div>
          {/* Right: tagline */}
          <p className="text-white/55 text-xs font-display uppercase tracking-widest text-center sm:text-right">
            Genuine and aftermarket parts for Pakistan&apos;s most popular
            premium SUVs
          </p>
        </div>
      </motion.section>

      {/* Category Grid */}
      <section className="py-16 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              SHOP BY CATEGORY
            </h2>
            <p className="text-muted-foreground text-sm">
              Find exactly what your vehicle needs
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.name}
                  type="button"
                  data-ocid={`categories.item.${i + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => onNavigate("products")}
                  className="relative group rounded-sm text-left overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                >
                  {/* Background image */}
                  <div className="h-44 sm:h-52 overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-colors" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-8 h-8 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-[0.08em] text-white leading-snug mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-white/60 text-xs mb-2">{cat.count}</p>
                    <span className="inline-flex items-center gap-1 text-primary font-display font-bold text-[11px] uppercase tracking-widest border border-primary/50 px-2.5 py-1 rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      VIEW <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toyota Featured Cars Section */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-2">
              OFFICIAL PARTS SUPPLIER
            </p>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              TOYOTA PRADO & LAND CRUISER
            </h2>
            <p className="text-muted-foreground text-sm">
              Genuine and aftermarket parts for Pakistan&apos;s most popular
              premium SUVs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                img: "/assets/generated/toyota-prado.dim_800x500.jpg",
                title: "TOYOTA PRADO",
                subtitle: "Premium SUV Parts Available",
                ocid: "toyota.prado.card",
                btnOcid: "toyota.prado.button",
              },
              {
                img: "/assets/generated/toyota-land-cruiser.dim_800x500.jpg",
                title: "TOYOTA LAND CRUISER",
                subtitle: "Genuine Parts In Stock",
                ocid: "toyota.land_cruiser.card",
                btnOcid: "toyota.land_cruiser.button",
              },
            ].map((car, i) => (
              <motion.div
                key={car.title}
                data-ocid={car.ocid}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group rounded-sm overflow-hidden bg-secondary cursor-pointer"
                onClick={() => onNavigate("products")}
              >
                <div className="h-64 sm:h-72 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-1">
                    {car.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{car.subtitle}</p>
                  <button
                    type="button"
                    data-ocid={car.btnOcid}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("products");
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-display font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
                  >
                    SHOP PARTS <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toyota Parts Image Grid */}
      <section className="py-16 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-2">
              AVAILABLE NOW
            </p>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              TOYOTA PARTS AVAILABLE
            </h2>
            <p className="text-muted-foreground text-sm">
              All parts available for Toyota Prado & Land Cruiser
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {toyotaParts.map((part, i) => (
              <motion.div
                key={part.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-sm overflow-hidden cursor-pointer"
                onClick={() => onNavigate("products")}
              >
                <div className="h-40 sm:h-44 overflow-hidden">
                  <img
                    src={part.img}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-display font-black text-xs uppercase tracking-widest text-white">
                    {part.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => onNavigate("products")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white font-display font-black text-sm uppercase tracking-widest hover:bg-secondary/80 transition-colors rounded-sm"
            >
              VIEW ALL TOYOTA PARTS <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Toyota Parts Banner Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-2">
              TOYOTA GENUINE PARTS
            </h2>
            <p className="text-white/60 text-sm">
              Direct fitment. Trusted quality. Lahore&apos;s #1 Toyota parts
              supplier.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="h-64 lg:h-auto min-h-[300px] overflow-hidden">
                <img
                  src="/assets/generated/toyota-parts-collection.dim_800x500.jpg"
                  alt="Toyota Genuine Parts Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text */}
              <div className="bg-foreground flex flex-col justify-center p-8 sm:p-12">
                <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-3">
                  QUALITY ASSURED
                </p>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight mb-4">
                  QUALITY PARTS FOR YOUR TOYOTA
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-7">
                  Genuine OEM and aftermarket parts for Toyota Prado and Land
                  Cruiser. Doors, sunroofs, headlights, side mirrors,
                  dashboards, LCD, bonnet, side panels and more.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    "Doors",
                    "Sunroof",
                    "Headlights",
                    "Side Mirrors",
                    "Dashboard",
                    "LCD",
                    "Bonnet",
                    "Side Panels",
                  ].map((part) => (
                    <span
                      key={part}
                      className="text-[11px] font-display font-bold uppercase tracking-widest text-primary border border-primary/40 px-2.5 py-1 rounded-sm"
                    >
                      {part}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  data-ocid="toyota.parts.view_button"
                  onClick={() => onNavigate("products")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm self-start"
                >
                  VIEW TOYOTA PARTS <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              FEATURED PRODUCTS
            </h2>
            <p className="text-muted-foreground text-sm">
              Top-rated parts our customers keep coming back for
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={i}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              type="button"
              data-ocid="home.view_all_products.button"
              onClick={() => onNavigate("products")}
              className="px-8 py-3 border-2 border-secondary text-secondary font-display font-bold text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors rounded-sm"
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              WHY CHOOSE AL KHAN
            </h2>
            <p className="text-muted-foreground text-sm">
              The Al Khan advantage — built for drivers who demand the best
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center px-4"
                >
                  <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-[0.12em] text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-1">
                LATEST FROM THE BLOG
              </h2>
              <p className="text-muted-foreground text-sm">
                Tips, guides, and automotive knowledge
              </p>
            </div>
            <button
              type="button"
              data-ocid="home.view_all_blog.button"
              onClick={() => onNavigate("blog")}
              className="hidden sm:flex items-center gap-1 text-primary font-display font-bold text-xs uppercase tracking-widest hover:underline"
            >
              VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
          <div className="flex flex-col gap-5">
            {blogPosts.slice(0, 2).map((post, i) => (
              <BlogCard key={String(post.id)} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
              READY TO UPGRADE YOUR RIDE?
            </h2>
            <p className="text-white/60 text-sm mb-7 max-w-md mx-auto">
              Browse our full catalog of 200,000+ parts or talk to an expert
              today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                data-ocid="cta.shop_now.primary_button"
                onClick={() => onNavigate("products")}
                className="px-8 py-3.5 bg-primary text-primary-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
              >
                SHOP NOW
              </button>
              <button
                type="button"
                data-ocid="cta.contact_us.secondary_button"
                onClick={() => onNavigate("contact")}
                className="px-8 py-3.5 border-2 border-white/40 text-white font-display font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm"
              >
                CONTACT US
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
