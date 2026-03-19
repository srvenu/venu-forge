import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  X,
  Layers,
  Target,
  BarChart2,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

interface Project {
  title: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  category: string;
  featured: boolean;
  problem: string;
  architecture: string;
  impact: string[];
  lessons: string;
}

const projects: Project[] = [
  {
    title: "LangGraph Research Agent",
    tagline: "Autonomous multi-step research workflow with self-correction",
    description:
      "A stateful multi-agent system built with LangGraph that decomposes complex research queries, delegates to specialized sub-agents, and synthesizes structured reports with source citations.",
    image: "/images/featured-image-youtube-video-to-notes.jpg",
    tech: ["LangGraph", "LangChain", "GPT-4o", "Tavily", "Python", "FastAPI"],
    github: "https://github.com/srvenu/youtube_video_to_notes",
    demo: "#",
    category: "AI Agents",
    featured: true,
    problem:
      "Single LLM calls cannot reliably handle multi-step research tasks requiring web search, fact verification, and structured synthesis — they hallucinate or lose context.",
    architecture:
      "LangGraph StateGraph → Planner node decomposes query → Researcher nodes run Tavily search → Critic node evaluates quality → Synthesizer generates final report. Conditional edges enable self-correction loops.",
    impact: [
      "Reduces research time from hours to ~3 minutes per query",
      "Self-correction loop cuts hallucination rate by 70%",
      "Handles 10-step reasoning chains with full state persistence",
    ],
    lessons:
      "Graph-based state machines are far more controllable than chain-of-thought alone — explicit edge conditions make agent behavior auditable and debuggable.",
  },
  {
    title: "RAG Knowledge Assistant",
    tagline: "Production-grade retrieval-augmented generation pipeline",
    description:
      "End-to-end RAG system using LangChain + ChromaDB with hybrid search, contextual compression, and LangSmith tracing — deployed as a FastAPI service.",
    image: "/images/sign_language_recognition.jpg",
    tech: ["LangChain", "ChromaDB", "Hugging Face", "FastAPI", "LangSmith", "Python"],
    github: "https://github.com/srvenu/Sign_Language_Recognition",
    demo: "#",
    category: "RAG Systems",
    featured: true,
    problem:
      "Off-the-shelf LLMs lack domain knowledge and hallucinate facts. A naive vector search returns irrelevant chunks, degrading answer quality significantly.",
    architecture:
      "Document ingestion → chunk + embed (sentence-transformers) → ChromaDB store → hybrid BM25 + dense retrieval → contextual compression reranker → GPT-4o generation → LangSmith eval traces.",
    impact: [
      "Answer faithfulness score of 0.91 on RAGAS benchmark",
      "Retrieval precision improved 40% over naive top-k search",
      "LangSmith tracing enables per-query debugging in production",
    ],
    lessons:
      "Chunking strategy matters more than model choice — recursive character splitting with overlap outperformed fixed-size chunks by a wide margin on long documents.",
  },
  {
    title: "AI Video Notes Agent",
    tagline: "Turn any YouTube video into structured topic-based notes",
    description:
      "Agentic pipeline that uses Whisper for transcription, LangChain for topic segmentation, and a summarization agent to produce clean PDF study notes from long-form videos.",
    image: "/images/track_assest.jpg",
    tech: ["LangChain", "Whisper", "GPT-4o-mini", "Python", "Flask", "OpenCV"],
    github: "https://github.com/srvenu/youtube_video_to_notes",
    demo: "#",
    category: "AI Agents",
    featured: false,
    problem:
      "Learners waste hours rewatching long tutorials. Existing tools produce flat transcripts without semantic topic structure or key-frame summaries.",
    architecture:
      "Whisper transcription → LangChain MapReduce chain for topic segmentation → Summarization agent per segment → OpenCV keyframe extraction → PDF generation with structured layout.",
    impact: [
      "60+ views in first week of YouTube demo",
      "Reduces study time by ~60% for long-form content",
      "PDF output used by 10+ students for exam prep",
    ],
    lessons:
      "LangChain's MapReduce chain handles token limits gracefully — splitting transcripts into overlapping windows and merging summaries preserved topic continuity.",
  },
  {
    title: "Multi-Agent Sign Language Tutor",
    tagline: "Real-time gesture recognition with an LLM explanation agent",
    description:
      "Combines a computer vision pipeline for ASL recognition with a LangChain-powered tutoring agent that explains gestures and tracks learning progress via persistent memory.",
    image: "/images/project1.jpg",
    tech: ["LangChain", "DeepAgents", "MediaPipe", "PyTorch", "Mem0", "FastAPI"],
    github: "https://github.com/srvenu/Sign_Language_Recognition",
    demo: "#",
    category: "AI Agents",
    featured: false,
    problem:
      "Sign language apps recognize gestures but provide no explanation or adaptive teaching — learners have no feedback loop to improve.",
    architecture:
      "MediaPipe → CNN classifier → gesture event emitted → LangChain agent with Mem0 memory retrieves learner history → tutoring response personalized to learning gaps.",
    impact: [
      "95%+ accuracy on ASL alphabet classification",
      "Tutor agent retention: learners complete 3× more sessions",
      "Mem0 persistent memory enables cross-session personalization",
    ],
    lessons:
      "Coupling vision inference with an LLM agent requires careful latency budgeting — offloading agent calls to async background tasks kept the UI at 30fps.",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <DialogContent className="max-w-2xl glass-card-strong border-border/30 max-h-[90vh] overflow-y-auto">
      <DialogHeader className="pb-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <span className="tag-pill mb-3 inline-block">{project.category}</span>
            <DialogTitle className="text-2xl font-black leading-tight">{project.title}</DialogTitle>
            <p className="text-muted-foreground text-sm mt-1">{project.tagline}</p>
          </div>
        </div>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest mb-2">Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tag-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Problem</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
        </div>

        {/* Architecture */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-secondary/80">Architecture</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.architecture}</p>
        </div>

        {/* Impact */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400/80">Impact</span>
          </div>
          <ul className="space-y-2">
            {project.impact.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Lessons */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400/80">Key Lesson</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.lessons}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 border-border/50 hover:border-primary/40" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </a>
          </Button>
          {project.demo !== "#" && (
            <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className={`glass-card overflow-hidden group cursor-pointer hover-glow ${
          project.featured && index < 2 ? "lg:col-span-1" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              const parent = el.parentElement;
              if (parent) {
                parent.style.background = "linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(260 85% 65% / 0.1))";
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-primary border border-primary/30">
              View Case Study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <span className="tag-pill">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-primary/70 font-medium mb-3">{project.tagline}</p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded-full bg-primary/6 border border-primary/12 text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); window.open(project.github, "_blank"); }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            View Source
          </button>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <CaseStudyModal project={project} onClose={() => setOpen(false)} />
      </Dialog>
    </>
  );
}

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-28 px-4 relative">
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Agents & LLM systems I've built</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Featured{" "}
            <span className="gradient-text">AI Projects</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider mb-4" />
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl">
            Click any card to explore the full case study — problem, agent architecture, impact, and lessons learned.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/40 hover:bg-primary/5"
            asChild
          >
            <a href="https://github.com/srvenu" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              Explore All on GitHub
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
