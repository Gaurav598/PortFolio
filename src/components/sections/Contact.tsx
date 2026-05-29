import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PERSONAL, SOCIAL_LINKS } from '@/data/portfolio';
import { Send } from 'lucide-react';
import { useState } from 'react';

function Field({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/5 border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20 transition placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

function ContactCard({ label, value, href, icon }: { label: string; value: string; href: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 glass rounded-2xl p-4 hover:border-neon-blue/40 hover:bg-white/[0.04] transition"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-aurora text-white font-bold text-sm">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="font-display font-semibold truncate">{value}</div>
      </div>
      <span className="text-muted-foreground group-hover:text-neon-blue group-hover:translate-x-1 transition-all">↗</span>
    </a>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-neon-purple/15 blur-[120px]" />

      <div className="relative section-container max-w-5xl">
        <SectionHeader
          kicker="// Let's Build"
          title={<>Have an idea? <span className="text-gradient">Let's make it real.</span></>}
          subtitle="Open for freelance, internships, collaborations and ambitious products."
        />

        <div className="mt-16 grid lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-8 space-y-5 glow-blue"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold font-display">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <Field label="Your Name" name="name" placeholder="John Doe" />
                <Field label="Email" name="email" type="email" placeholder="john@company.com" />
                <Field label="Subject" name="subject" placeholder="Let's build something insane" />
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your idea…"
                    className="w-full rounded-xl bg-white/5 border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-blue/60 focus:ring-2 focus:ring-neon-blue/20 transition resize-none placeholder:text-muted-foreground/60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3.5 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Transmit Message →
                    </span>
                  )}
                </button>
              </>
            )}
          </motion.form>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <ContactCard label="Email" value={PERSONAL.email} href={`mailto:${PERSONAL.email}`} icon="✉" />
            <ContactCard label="GitHub" value="@Gaurav598" href={SOCIAL_LINKS[0].href} icon="◐" />
            <ContactCard label="LinkedIn" value="/in/gaurav-thakur-193619321" href={SOCIAL_LINKS[1].href} icon="in" />

            {/* Availability Status */}
            <div className="glass rounded-2xl p-6">
              <div className="text-xs font-mono uppercase tracking-widest text-neon-blue mb-2">Status</div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-green" />
                </span>
                <span className="font-display font-semibold">Available for new projects</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Open to full-time roles, freelance projects, and exciting collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
