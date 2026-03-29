import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitContact, isPending } = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        toast.success("Message sent! We'll get back to you within 24 hours.");
      },
      onError: () => toast.error("Failed to send message. Please try again."),
    });
  };

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
              GET IN TOUCH
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              CONTACT US
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-6"
            >
              <div>
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-5">
                  CONTACT INFORMATION
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-sm flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs uppercase tracking-widest text-foreground mb-0.5">
                        ADDRESS
                      </p>
                      <p className="text-muted-foreground text-sm">
                        4821 Industrial Drive
                        <br />
                        Detroit, MI 48201
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs uppercase tracking-widest text-foreground mb-0.5">
                        PHONE
                      </p>
                      <a
                        href="tel:+18005551234"
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        1-800-555-1234
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs uppercase tracking-widest text-foreground mb-0.5">
                        EMAIL
                      </p>
                      <a
                        href="mailto:info@apexautoparts.com"
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        info@apexautoparts.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-sm flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-xs uppercase tracking-widest text-foreground mb-0.5">
                        HOURS
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Mon – Fri: 8:00 AM – 7:00 PM
                        <br />
                        Sat: 9:00 AM – 5:00 PM
                        <br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-52 bg-secondary rounded-sm flex flex-col items-center justify-center text-center p-4">
                <MapPin className="w-8 h-8 text-primary mb-2" />
                <p className="text-white/60 text-xs font-display uppercase tracking-widest">
                  4821 Industrial Drive
                </p>
                <p className="text-white/40 text-xs">Detroit, MI 48201</p>
              </div>
            </motion.aside>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white border border-border rounded-sm p-6 sm:p-8">
                <h2 className="font-display font-black text-xl uppercase tracking-tight text-foreground mb-6">
                  SEND US A MESSAGE
                </h2>

                {submitted ? (
                  <div
                    data-ocid="contact.success_state"
                    className="py-12 text-center"
                  >
                    <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
                    <h3 className="font-display font-black text-lg uppercase tracking-wide text-foreground mb-2">
                      MESSAGE SENT!
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Thanks for reaching out. Our team will respond within 24
                      hours.
                    </p>
                    <button
                      type="button"
                      data-ocid="contact.send_another.button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-secondary text-secondary-foreground font-display font-bold text-xs uppercase tracking-widest hover:bg-secondary/80 transition-colors rounded-sm"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    data-ocid="contact.form"
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-display font-bold text-[11px] uppercase tracking-widest text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          data-ocid="contact.name.input"
                          value={form.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          placeholder="John Smith"
                          className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-display font-bold text-[11px] uppercase tracking-widest text-foreground mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          data-ocid="contact.email.input"
                          value={form.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          placeholder="john@example.com"
                          className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-display font-bold text-[11px] uppercase tracking-widest text-foreground mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        data-ocid="contact.phone.input"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        placeholder="(555) 000-0000"
                        className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block font-display font-bold text-[11px] uppercase tracking-widest text-foreground mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        data-ocid="contact.message.textarea"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what you need..."
                        className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={isPending}
                      className="w-full py-3.5 bg-primary text-primary-foreground font-display font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors rounded-sm disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />{" "}
                          SENDING...
                        </>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
