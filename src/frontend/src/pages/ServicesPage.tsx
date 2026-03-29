import {
  ArrowRight,
  BookOpen,
  Building,
  Search,
  Shield,
  Truck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import type { Service } from "../backend.d";
import { useAllServices } from "../hooks/useQueries";

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  tool: Wrench,
  truck: Truck,
  shield: Shield,
  building: Building,
  book: BookOpen,
};

const skeletonKeys = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6"];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] ?? Wrench;
  return (
    <motion.div
      data-ocid={`services.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white border border-border rounded-sm p-6 group hover:shadow-card hover:border-primary/30 transition-all"
    >
      <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="font-display font-black text-sm uppercase tracking-wide text-foreground mb-3">
        {service.name}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <span className="inline-flex items-center gap-1 text-primary font-display font-bold text-[11px] uppercase tracking-widest hover:underline cursor-pointer">
        LEARN MORE <ArrowRight className="w-3 h-3" />
      </span>
    </motion.div>
  );
}

export default function ServicesPage() {
  const { data: services = [], isLoading } = useAllServices();

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
              WHAT WE OFFER
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              OUR SERVICES
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-foreground mb-3">
              MORE THAN JUST PARTS
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Apex, we go beyond stocking shelves. From expert technical
              consultations to same-day shipping and dedicated fleet accounts,
              we provide end-to-end support for every type of automotive
              customer.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div
              data-ocid="services.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skeletonKeys.map((k) => (
                <div
                  key={k}
                  className="bg-white border border-border rounded-sm p-6 animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-sm mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <ServiceCard
                  key={String(service.id)}
                  service={service}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-3">
              NEED EXPERT HELP FINDING A PART?
            </h2>
            <p className="text-white/60 text-sm mb-7 max-w-md mx-auto">
              Our certified technicians are ready to help you find exactly the
              right component for your vehicle.
            </p>
            <button
              type="button"
              data-ocid="services.contact_us.primary_button"
              className="px-8 py-3.5 bg-primary text-primary-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm"
            >
              TALK TO AN EXPERT
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
