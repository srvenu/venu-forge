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
    title: "AI-Powered Video Assistant",
    tagline: "Turn any video into structured, topic-based notes",
    description:
      "Deep learning system that analyzes YouTube video content and provides intelligent insights using computer vision and NLP — exported as clean PDFs.",
    image: "/images/featured-image-youtube-video-to-notes.jpg",
    tech: ["Python", "TensorFlow", "OpenCV", "NLP", "Flask"],
    github: "https://github.com/srvenu/youtube_video_to_notes",
    demo: "#",
    category: "AI / ML",
    featured: true,
    problem:
      "Learners waste hours rewatching long tutorials to find key moments. There was no tool to auto-extract topic-segmented notes with supporting images.",
    architecture:
      "Transcription via Whisper → topic segmentation with NLP → keyframe extraction with OpenCV → PDF generation with structured layout. Hosted on Flask with async processing.",
    impact: [
      "60+ views in first week of YouTube demo",
      "Reduces study time by ~60% for long-form content",
      "PDF output used by 10+ students for exam prep",
    ],
    lessons:
      "Balancing transcription accuracy with processing speed — batching frames and parallelizing NLP tasks cut latency by 3×.",
  },
  {
    title: "Sign Language Recognition",
    tagline: "Real-time hand gesture → meaningful sentences",
    description:
      "Webcam-based sign language recognition system using OpenCV, cvzone, TensorFlow and Streamlit for interactive real-time translation.",
    image: "/images/sign_language_recognition.jpg",
    tech: ["Python", "Computer Vision", "Deep Learning", "React", "FastAPI"],
    github: "https://github.com/srvenu/Sign_Language_Recognition",
    demo: "#",
    category: "AI / ML",
    featured: true,
    problem:
      "Communication gap between hearing-impaired individuals and those who don't know sign language — existing tools were desktop-only and non-real-time.",
    architecture:
      "MediaPipe hand landmark detection → custom CNN classifier (TensorFlow) → sentence builder logic → Streamlit + React frontend with FastAPI backend.",
    impact: [
      "95%+ accuracy on ASL alphabet classification",
      "Real-time inference at 30fps on consumer hardware",
      "Accessible via browser — no install required",
    ],
    lessons:
      "Hand landmark normalization was critical — raw pixel coordinates failed under lighting variation. Switching to relative distances improved accuracy by 18%.",
  },
  {
    title: "Track Drive Assist",
    tagline: "Automatic service tracking for vehicles",
    description:
      "React-based application that intelligently tracks vehicle service history, deadlines, and reminders using AI-powered scheduling APIs.",
    image: "/images/track_assest.jpg",
    tech: ["React", "Node.js", "AI APIs", "TailwindCSS", "MongoDB"],
    github: "https://github.com/srvenu/track-drive-assist",
    demo: "#",
    category: "Web App",
    featured: false,
    problem:
      "Vehicle owners miss service deadlines due to lack of a unified tracking tool — leading to safety risks and costly repairs.",
    architecture:
      "React SPA → Node.js REST API → MongoDB for vehicle data → AI API for smart reminder scheduling → push notification layer.",
    impact: [
      "Tracks unlimited vehicles per user",
      "Smart reminders reduce missed services",
      "Clean mobile-first responsive UI",
    ],
    lessons:
      "Building the reminder logic with time-zone awareness was harder than expected. Using UTC + user locale on the frontend solved edge cases cleanly.",
  },
  {
    title: "Raw Materials Search Engine",
    tagline: "Desktop search & management for raw materials DB",
    description:
      "Tkinter + Pandas desktop application for efficient searching, filtering, and management of raw materials databases — built for manufacturing clients.",
    image: "/images/project1.jpg",
    tech: ["Python", "Tkinter", "Pandas", "SQLite", "Data Processing"],
    github: "https://github.com/srvenu/Excel-Search-Application",
    demo: "#",
    category: "Desktop App",
    featured: false,
    problem:
      "Manufacturing teams relied on manual Excel search — slow, error-prone, and impossible to filter across multiple criteria simultaneously.",
    architecture:
      "Tkinter GUI → Pandas DataFrames for in-memory filtering → SQLite for persistence → Excel/CSV import/export pipeline.",
    impact: [
      "Search time reduced from minutes to milliseconds",
      "Multi-column filter with live preview",
      "Used by a real client in production",
    ],
    lessons:
      "Pandas is great for data manipulation but Tkinter's lack of reactivity required manual re-render triggers — reinforced appreciation for declarative UI frameworks.",
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
          <motion.p variants={fadeUp} className="section-label mb-3">What I've built</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider mb-4" />
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl">
            Click any card to explore the full case study — problem, architecture, impact, and lessons learned.
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
