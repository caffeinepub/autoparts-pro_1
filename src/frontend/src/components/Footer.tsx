import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscribeNewsletter } from "../hooks/useQueries";

type Page = "home" | "about" | "products" | "services" | "blog" | "contact";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe(email, {
      onSuccess: () => {
        toast.success("You're subscribed! Welcome to the Apex family.");
        setEmail("");
      },
      onError: () => toast.error("Subscription failed. Please try again."),
    });
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-display font-black text-sm">
                  A
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-white text-base tracking-widest uppercase">
                  APEX
                </span>
                <span className="font-display font-medium text-[10px] tracking-[0.2em] text-primary uppercase">
                  AUTO PARTS
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Your trusted source for genuine OEM and high-performance
              aftermarket parts. Over 200,000 parts in stock for domestic and
              import vehicles.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.15em] text-primary mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {(
                [
                  ["Home", "home"],
                  ["About Us", "about"],
                  ["Products", "products"],
                  ["Services", "services"],
                  ["Blog", "blog"],
                  ["Contact Us", "contact"],
                ] as [string, Page][]
              ).map(([label, page]) => (
                <li key={page}>
                  <button
                    type="button"
                    data-ocid={`footer.${page}.link`}
                    onClick={() => onNavigate(page)}
                    className="text-white/60 hover:text-primary transition-colors text-sm text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.15em] text-primary mb-4">
              CONTACT INFO
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  4821 Industrial Drive
                  <br />
                  Detroit, MI 48201
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+18005551234"
                  className="hover:text-primary transition-colors"
                >
                  1-800-555-1234
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@apexautoparts.com"
                  className="hover:text-primary transition-colors"
                >
                  info@apexautoparts.com
                </a>
              </li>
            </ul>
            <div className="mt-4 text-white/60 text-sm">
              <p className="font-semibold text-white/80 mb-1">Business Hours</p>
              <p>Mon – Fri: 8:00 AM – 7:00 PM</p>
              <p>Sat: 9:00 AM – 5:00 PM</p>
              <p>Sun: Closed</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-[0.15em] text-primary mb-4">
              NEWSLETTER
            </h4>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Get exclusive deals, new arrivals, and expert tips delivered to
              your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                data-ocid="footer.newsletter.input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-white/10 text-white placeholder:text-white/40 text-sm px-3 py-2.5 rounded-sm border border-white/20 outline-none focus:border-primary transition-colors"
              />
              <button
                data-ocid="footer.newsletter.submit_button"
                type="submit"
                disabled={isPending}
                className="py-2.5 bg-primary text-primary-foreground font-display font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60"
              >
                {isPending ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} Apex Auto Parts. All rights
            reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
