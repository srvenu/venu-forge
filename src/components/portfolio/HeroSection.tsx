import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, FileText, Mail, ArrowDown, Sparkles, Network, Brain, GitMerge, Workflow } from "lucide-react";

const roles = [
  "AI Agent Engineer",
  "LangChain Developer",
  "LLM Systems Architect",
  "Multi-Agent Workflow Designer",
];

const floatingIcons = [
  { Icon: Brain,    top: "18%", left: "8%",  delay: 0 },
  { Icon: Network,  top: "70%", left: "6%",  delay: 1.2 },
  { Icon: GitMerge, top: "20%", left: "88%", delay: 0.6 },
  { Icon: Workflow, top: "72%", left: "90%", delay: 1.8 },
];

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const orb1X = useTransform(springX, [-600, 600], [-35, 35]);
  const orb1Y = useTransform(springY, [-600, 600], [-25, 25]);
  const orb2X = useTransform(springX, [-600, 600], [25, -25]);
  const orb2Y = useTransform(springY, [-600, 600], [20, -20]);
  const orb3X = useTransform(springX, [-600, 600], [-15, 15]);
  const orb3Y = useTransform(springY, [-600, 600], [30, -30]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg grid-bg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Aurora Orbs ── */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.22), transparent 70%)",
          x: orb1X,
          y: orb1Y,
          top: "5%",
          left: "0%",
        }}
      />
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(260 85% 65% / 0.18), transparent 70%)",
          x: orb2X,
          y: orb2Y,
          bottom: "5%",
          right: "0%",
        }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-[90px] animate-aurora pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(189 100% 56% / 0.12), transparent 70%)",
          x: orb3X,
          y: orb3Y,
          top: "55%",
          left: "25%",
        }}
      />

      {/* ── Floating Icon Nodes ── */}
      {floatingIcons.map(({ Icon, top, left, delay }) => (
        <motion.div
          key={`${top}-${left}`}
          className="absolute hidden lg:flex items-center justify-center w-12 h-12 rounded-xl glass-card text-primary/60"
          style={{ top, left }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
        >
          <Icon className="h-5 w-5" />
        </motion.div>
      ))}

      {/* ── Particle Field ── */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            background: `hsl(217 91% 70% / ${Math.random() * 0.35 + 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl">

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 text-sm font-medium mb-10 cursor-default"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-primary/90">Available for opportunities</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="block text-foreground/95">Venu</span>
          <span className="block gradient-text glow-text">Raj</span>
        </motion.h1>

        {/* Animated Role */}
        <div className="h-14 mb-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="text-2xl md:text-3xl font-semibold text-muted-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <span className="gradient-text">{roles[roleIndex]}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Building{" "}
          <span className="text-primary font-semibold">autonomous agents</span>{" "}
          and{" "}
          <span className="text-secondary font-semibold">LLM-powered workflows</span>{" "}
          with{" "}
          <span className="text-cyan-400 font-semibold">LangChain &amp; LangGraph</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 font-semibold shadow-lg"
              style={{ boxShadow: "0 0 30px hsl(217 91% 60% / 0.35)" }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="shimmer-overlay" />
              <Mail className="mr-2 h-5 w-5" />
              Hire Me
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/35 text-primary hover:bg-primary/8 hover:border-primary/60 px-8 h-12 font-semibold backdrop-blur-sm"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Venugopal_resume_2025.pdf";
                link.download = "Venugopal_resume_2025.pdf";
                link.click();
              }}
            >
              <FileText className="mr-2 h-5 w-5" />
              View Resume
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-primary/5 px-8 h-12 font-semibold"
              asChild
            >
              <a href="https://github.com/srvenu" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-0 justify-center"
        >
          {[
            { value: "6+",   label: "AI Agents Shipped" },
            { value: "10+",  label: "LLM Integrations" },
            { value: "300+", label: "YT Subscribers" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`px-10 py-4 text-center ${i !== 2 ? "border-r border-border/40" : ""}`}
            >
              <div className="text-3xl font-black gradient-text mb-0.5">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors duration-300"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Explore</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
