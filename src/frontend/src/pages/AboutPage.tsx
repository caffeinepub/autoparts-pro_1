import { Award, Eye, Target, Users } from "lucide-react";
import { motion } from "motion/react";

const team = [
  {
    name: "Michael Torres",
    role: "Founder & CEO",
    initials: "MT",
    bio: "20+ years in the automotive industry, former lead engineer at a major OEM supplier.",
  },
  {
    name: "Sandra Lee",
    role: "Head of Procurement",
    initials: "SL",
    bio: "Expert in global parts sourcing with relationships across 40+ manufacturers worldwide.",
  },
  {
    name: "James Park",
    role: "Chief Technical Officer",
    initials: "JP",
    bio: "ASE Master Technician and automotive engineering graduate from University of Michigan.",
  },
  {
    name: "Renata Vasquez",
    role: "Customer Experience Lead",
    initials: "RV",
    bio: "Passionate about making quality parts accessible and support genuinely helpful for every driver.",
  },
];

const values = [
  {
    icon: Award,
    title: "QUALITY FIRST",
    desc: "Every part in our catalog meets strict OEM or higher quality standards before it reaches you.",
  },
  {
    icon: Target,
    title: "CUSTOMER FOCUS",
    desc: "We measure success by your satisfaction—not just the sale. Your vehicle deserves the best.",
  },
  {
    icon: Users,
    title: "COMMUNITY DRIVEN",
    desc: "Built by car enthusiasts, for car enthusiasts. We're passionate about the automotive world.",
  },
  {
    icon: Eye,
    title: "TRANSPARENCY",
    desc: "Honest pricing, real specs, and straightforward return policies. No surprises, ever.",
  },
];

const stats = [
  { value: "200K+", label: "Parts in Stock" },
  { value: "15+", label: "Years in Business" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "50K+", label: "Happy Customers" },
];

export default function AboutPage() {
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
              ABOUT APEX AUTO PARTS
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              BUILT BY CAR PEOPLE,
              <br />
              FOR CAR PEOPLE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-5">
                OUR STORY
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Apex Auto Parts was founded in 2009 in Detroit, Michigan—the
                  heart of American automotive manufacturing. What started as a
                  small warehouse operation with a handful of domestic part
                  lines has grown into one of the most trusted independent auto
                  parts retailers in the country.
                </p>
                <p>
                  Our founder, Michael Torres, spent two decades inside the OEM
                  supply chain and saw firsthand how drivers were being
                  overcharged for parts that should be accessible and
                  affordable. He built Apex to fix that.
                </p>
                <p>
                  Today we stock over 200,000 SKUs spanning domestic and import
                  vehicles from 1980 to present—engine internals, braking
                  systems, electrical components, suspension kits, and
                  everything in between.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-muted border border-border rounded-sm p-6 text-center"
                >
                  <div className="font-display font-black text-3xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-display font-bold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-display font-bold text-xs uppercase tracking-[0.25em] mb-3">
                OUR MISSION
              </p>
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-5">
                MAKING QUALITY PARTS ACCESSIBLE TO EVERY DRIVER
              </h2>
              <p className="text-white/65 leading-relaxed">
                We believe every driver—from weekend mechanics to daily
                commuters—deserves access to reliable, correctly-specified parts
                at fair prices. Our mission is to remove the friction,
                confusion, and markup from buying auto parts, and replace it
                with confidence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              OUR VALUES
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-border rounded-sm p-6"
                >
                  <div className="w-11 h-11 bg-secondary rounded-sm flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-black text-sm uppercase tracking-wide text-foreground mb-2">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-2">
              MEET THE TEAM
            </h2>
            <p className="text-muted-foreground text-sm">
              The people behind every great experience
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                data-ocid={`about.team.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-black text-xl text-primary">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-0.5">
                  {member.name}
                </h3>
                <p className="text-primary text-xs font-display font-semibold uppercase tracking-widest mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
