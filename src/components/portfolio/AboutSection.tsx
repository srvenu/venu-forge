import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Rocket,
  Brain,
  Youtube,
  Globe,
  MapPin,
  Heart,
} from "lucide-react";

const timeline = [
  {
    year: "2020",
    icon: GraduationCap,
    title: "Started CS Journey",
    description: "Enrolled in Computer Science — fell in love with algorithms and the fundamentals of intelligent systems.",
    color: "from-blue-500 to-blue-600",
  },
  {
    year: "2022",
    icon: Brain,
    title: "First AI Project",
    description: "Built a computer vision pipeline using OpenCV & PyTorch — the spark that ignited the deep-learning path.",
    color: "from-primary to-primary/80",
  },
  {
    year: "2023",
    icon: Rocket,
    title: "LLMs & Prompt Engineering",
    description: "Explored GPT APIs, RAG patterns, and LangChain — shipped the first retrieval-augmented knowledge assistant.",
    color: "from-secondary to-secondary/80",
  },
  {
    year: "2024",
    icon: Youtube,
    title: "Launched CodeAlchemists + LangGraph Agents",
    description: "Started teaching LLM engineering on YouTube and built stateful multi-agent systems with LangGraph & CrewAI.",
    color: "from-red-500 to-red-600",
  },
  {
    year: "2025",
    icon: Globe,
    title: "AI Agent Systems Engineer",
    description: "Architecting production-grade agentic pipelines — LangGraph, DeepAgents, RAG, evals, and LangSmith observability.",
    color: "from-cyan-500 to-cyan-600",
  },
];

const stats = [
  { value: 6,    suffix: "+", label: "AI Agents Shipped" },
  { value: 300,  suffix: "+", label: "YouTube Subscribers" },
  { value: 10,   suffix: "+", label: "LLM Integrations" },
  { value: 1000, suffix: "+", label: "Hours of Watch Time" },
];

const techStack = [
  "LangChain", "LangGraph", "DeepAgents", "CrewAI", "Python",
  "RAG", "ChromaDB", "Hugging Face", "LangSmith", "FastAPI",
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = (target / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-8"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.12), transparent)" }} />

      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Who I am</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            My{" "}
            <span className="gradient-text">Journey</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Timeline ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div key={item.year} variants={fadeUp} className="relative flex gap-6 mb-10 last:mb-0">
                {/* Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1 pb-8">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-bold text-primary/70 tracking-widest">{item.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: Bio + Stats ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            {/* Profile card */}
            <motion.div variants={fadeUp} className="glass-card p-8 gradient-border">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-black text-white shadow-lg">
                    VR
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-background" />
                </div>
                <div>
                  <div className="font-bold text-lg">Venu Raj</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> India
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                I'm an AI Agent Engineer specializing in LangChain, LangGraph, and multi-agent systems.
                I build production-grade agentic pipelines — RAG systems, stateful agents, and LLM-powered workflows.
                Through{" "}
                <span className="text-primary font-semibold">CodeAlchemists</span>, I teach LLM engineering and agent design patterns.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm">
                My focus: turn frontier models into{" "}
                <span className="text-foreground font-medium">reliable, observable, production-ready agents</span> that actually ship.
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                <span>Passionate about AI Agents · LLM Evals · Open Source</span>
              </div>
            </motion.div>

            {/* Stat counters */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 text-center hover-lift cursor-default">
                  <div className="text-3xl font-black gradient-text mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Tech stack badges */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest mb-3">Agent Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="tag-pill"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08, y: -1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
