import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Youtube,
  Twitter,
  Send,
  MapPin,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@srvenu",
    url: "https://github.com/srvenu",
    color: "hover:border-gray-400/40 hover:bg-gray-400/5",
    iconColor: "text-gray-400",
    glow: "hsl(0 0% 70% / 0.15)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "in/srvenu",
    url: "https://www.linkedin.com/in/srvenu/",
    color: "hover:border-blue-500/40 hover:bg-blue-500/5",
    iconColor: "text-blue-400",
    glow: "hsl(217 91% 60% / 0.2)",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    handle: "@Venuraj02",
    url: "https://x.com/Venuraj02",
    color: "hover:border-sky-400/40 hover:bg-sky-400/5",
    iconColor: "text-sky-400",
    glow: "hsl(199 89% 48% / 0.2)",
  },
  {
    icon: Youtube,
    label: "YouTube",
    handle: "@CodeAlchemists",
    url: "https://www.youtube.com/@CodeAlchemists",
    color: "hover:border-red-500/40 hover:bg-red-500/5",
    iconColor: "text-red-400",
    glow: "hsl(0 84% 60% / 0.2)",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(217 91% 60% / 0.1), transparent)" }}
      />

      <div className="container mx-auto max-w-6xl relative">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Let's build together</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Get In{" "}
            <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider mb-4" />
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl">
            Have a project, role, or idea? I'd love to hear from you.{" "}
            <span className="text-foreground font-medium">Let's build something meaningful.</span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Form (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass-card gradient-border p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-4.5 w-4.5 text-primary h-[18px] w-[18px]" />
                </div>
                <h3 className="text-lg font-bold">Send a Message</h3>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold mb-1">Message Sent!</h4>
                  <p className="text-sm text-muted-foreground">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
                      <Input
                        required
                        placeholder="Your name"
                        className="bg-background/40 border-border/50 focus:border-primary/50 h-11"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                      <Input
                        required
                        type="email"
                        placeholder="your@email.com"
                        className="bg-background/40 border-border/50 focus:border-primary/50 h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
                    <Input
                      required
                      placeholder="Project idea, collaboration, job opportunity…"
                      className="bg-background/40 border-border/50 focus:border-primary/50 h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label>
                    <Textarea
                      required
                      placeholder="Tell me what you're building or how I can help…"
                      className="min-h-[130px] bg-background/40 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 font-semibold h-12"
                      style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.3)" }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── Right: Info + Socials (2 cols) ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Availability status */}
            <motion.div variants={fadeUp} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">Available for Work</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Open to full-time roles, freelance projects, and exciting collaborations. Let's chat!
              </p>
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-2.5 text-sm">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <a
                    href="mailto:srvenugopal2002@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    srvenugopal2002@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm mt-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-medium">India · Open to Remote</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeUp} className="glass-card p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70 mb-4">Connect</h3>
              <div className="space-y-2.5">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 3 }}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-border/30 transition-all duration-200 group ${social.color}`}
                  >
                    <social.icon className={`h-5 w-5 ${social.iconColor} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-none mb-0.5">{social.label}</div>
                      <div className="text-xs text-muted-foreground truncate">{social.handle}</div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground/60 transition-colors flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Response time note */}
            <motion.div
              variants={fadeUp}
              className="px-5 py-4 rounded-xl border border-border/30 bg-primary/3 text-center"
            >
              <p className="text-xs text-muted-foreground">
                ⚡ Typical response within <span className="text-primary font-semibold">24 hours</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
