import type { BlogPost, Product, Service } from "../backend.d";

export const sampleProducts: Product[] = [
  {
    id: 1n,
    name: "Performance Intake Manifold",
    description:
      "High-flow aluminum intake manifold for improved throttle response and horsepower gains.",
    category: "Engine",
    price: 289.99,
    rating: 4.8,
    featured: true,
    imageUrl: "",
  },
  {
    id: 2n,
    name: "Ceramic Brake Pad Set",
    description:
      "Low-dust ceramic compound pads with OEM+ stopping power for daily drivers and performance use.",
    category: "Brake",
    price: 79.99,
    rating: 4.7,
    featured: true,
    imageUrl: "",
  },
  {
    id: 3n,
    name: "Stainless Brake Rotors (Pair)",
    description:
      "Drilled and slotted rotors for maximum heat dissipation and consistent braking performance.",
    category: "Brake",
    price: 149.99,
    rating: 4.6,
    featured: false,
    imageUrl: "",
  },
  {
    id: 4n,
    name: "Ignition Coil Pack (Set of 4)",
    description:
      "OEM replacement coil packs delivering reliable spark for improved fuel economy and power.",
    category: "Electrical",
    price: 124.99,
    rating: 4.5,
    featured: true,
    imageUrl: "",
  },
  {
    id: 5n,
    name: "LED Headlight Conversion Kit",
    description:
      "6000K pure white LED upgrade delivering 3x more light output than stock halogen bulbs.",
    category: "Electrical",
    price: 89.99,
    rating: 4.4,
    featured: false,
    imageUrl: "",
  },
  {
    id: 6n,
    name: "Sport Coilover Suspension Kit",
    description:
      "Height-adjustable coilover system for a lower stance and improved cornering precision.",
    category: "Suspension",
    price: 649.99,
    rating: 4.9,
    featured: true,
    imageUrl: "",
  },
  {
    id: 7n,
    name: "Polyurethane Sway Bar Bushings",
    description:
      "Performance bushings replacing rubber OEM parts to reduce body roll and improve handling.",
    category: "Suspension",
    price: 39.99,
    rating: 4.3,
    featured: false,
    imageUrl: "",
  },
  {
    id: 8n,
    name: "Carbon Fiber Hood Vents",
    description:
      "Real carbon fiber hood vents that reduce underhood heat and add an aggressive look.",
    category: "Accessories",
    price: 199.99,
    rating: 4.6,
    featured: false,
    imageUrl: "",
  },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 1n,
    title: "5 Signs Your Brake Pads Need Replacing Right Now",
    excerpt:
      "Grinding noises, longer stopping distances, and a vibrating pedal are warning signs you can't ignore. Here's how to diagnose worn brake pads before they become a safety issue.",
    content: "",
    date: "March 15, 2026",
    imageUrl: "",
  },
  {
    id: 2n,
    title: "How to Choose the Right Engine Oil for Your Vehicle",
    excerpt:
      "With dozens of viscosity grades and synthetic formulas on the market, picking the right oil can feel overwhelming. We break down everything you need to know in plain language.",
    content: "",
    date: "March 8, 2026",
    imageUrl: "",
  },
  {
    id: 3n,
    title: "Coilovers vs. Lowering Springs: Which Is Right for You?",
    excerpt:
      "Both options will lower your ride height, but they serve very different purposes. We compare cost, ride quality, and adjustability to help you make the right call.",
    content: "",
    date: "February 28, 2026",
    imageUrl: "",
  },
  {
    id: 4n,
    title: "Top 7 Electrical Issues That Trigger a Check Engine Light",
    excerpt:
      "A check engine light doesn't always mean catastrophe. Learn the seven most common electrical faults—and which ones you can fix yourself with basic tools.",
    content: "",
    date: "February 20, 2026",
    imageUrl: "",
  },
];

export const sampleServices: Service[] = [
  {
    id: 1n,
    name: "Expert Parts Sourcing",
    icon: "search",
    description:
      "Can't find the part you need? Our team will source OEM and aftermarket components for any make or model, domestic or import.",
  },
  {
    id: 2n,
    name: "Technical Consultation",
    icon: "tool",
    description:
      "Speak directly with our certified automotive technicians who can guide you to the right part and explain the installation process.",
  },
  {
    id: 3n,
    name: "Same-Day Shipping",
    icon: "truck",
    description:
      "Orders placed before 2 PM EST ship the same business day. Expedited and overnight delivery options available nationwide.",
  },
  {
    id: 4n,
    name: "Warranty & Returns",
    icon: "shield",
    description:
      "Every part comes backed by our 12-month warranty. Easy returns within 30 days—no questions asked on unopened items.",
  },
  {
    id: 5n,
    name: "Fleet Accounts",
    icon: "building",
    description:
      "Special pricing and priority service for commercial fleets, auto shops, and dealerships. Dedicated account manager included.",
  },
  {
    id: 6n,
    name: "Installation Guides",
    icon: "book",
    description:
      "Every purchase includes access to our library of step-by-step installation guides, torque specs, and how-to video tutorials.",
  },
];
