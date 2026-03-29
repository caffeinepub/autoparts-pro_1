import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

type Page = "home" | "about" | "products" | "services" | "blog" | "contact";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "HOME", page: "home" },
  { label: "ABOUT US", page: "about" },
  { label: "PRODUCTS", page: "products" },
  { label: "SERVICES", page: "services" },
  { label: "BLOG", page: "blog" },
  { label: "CONTACT US", page: "contact" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo + Business Name */}
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/uploads/logo-019d3768-b9d1-7450-8589-48a0983820bb-1.jpg"
              alt="AL KAHN AUTO & IMPORTS"
              className="h-12 w-auto object-contain rounded-sm"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-primary font-display font-extrabold text-base sm:text-lg tracking-wider uppercase">
                AL KAHN AUTO
              </span>
              <span className="text-white/70 font-display font-semibold text-xs tracking-[0.18em] uppercase">
                &amp; IMPORTS
              </span>
            </div>
          </button>

          {/* Right utilities */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    data-ocid="header.search_input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search parts..."
                    className="bg-white/10 text-white placeholder:text-white/50 text-sm px-3 py-1.5 rounded-sm border border-white/20 outline-none focus:border-primary w-48"
                    onKeyDown={(e) =>
                      e.key === "Escape" && setSearchOpen(false)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="header.search_input"
                  onClick={() => setSearchOpen(true)}
                  className="text-white/80 hover:text-primary transition-colors p-1"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Phone */}
            <a
              href="tel:+923071111234"
              className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="font-display font-semibold tracking-wide">
                +92 307-111-1234
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923071111234"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden md:flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              data-ocid="nav.mobile.toggle"
              className="lg:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary nav bar */}
      <nav className="hidden lg:block bg-[oklch(0.14_0.005_260)] border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <ul className="flex items-center">
            {navLinks.map(({ label, page }) => (
              <li key={page}>
                <button
                  type="button"
                  data-ocid={`nav.${page}.link`}
                  onClick={() => handleNav(page)}
                  className={`relative px-4 py-4 text-xs font-display font-semibold tracking-[0.12em] uppercase transition-colors ${
                    currentPage === page
                      ? "text-primary"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                  {currentPage === page && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              </li>
            ))}
            <li className="ml-auto">
              <button
                type="button"
                data-ocid="nav.shop_now.primary_button"
                onClick={() => handleNav("products")}
                className="my-2 px-5 py-2 bg-primary text-primary-foreground font-display font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
              >
                SHOP NOW
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-secondary border-t border-white/10">
          <ul className="divide-y divide-white/10">
            {navLinks.map(({ label, page }) => (
              <li key={page}>
                <button
                  type="button"
                  data-ocid={`nav.mobile.${page}.link`}
                  onClick={() => handleNav(page)}
                  className={`w-full text-left px-6 py-4 text-sm font-display font-semibold uppercase tracking-[0.1em] transition-colors flex items-center justify-between ${
                    currentPage === page
                      ? "text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                  {currentPage === page && (
                    <ChevronDown className="w-4 h-4 text-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="px-6 py-4">
            <button
              type="button"
              data-ocid="nav.mobile.shop_now.primary_button"
              onClick={() => handleNav("products")}
              className="w-full py-3 bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
