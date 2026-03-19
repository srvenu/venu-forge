import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Code2, Brain, Cloud, Globe, Database, Cpu } from "lucide-react";

const radarData = [
  { domain: "AI / ML",    score: 92 },
  { domain: "Frontend",   score: 90 },
  { domain: "Backend",    score: 85 },
  { domain: "Cloud",      score: 82 },
  { domain: "DevOps",     score: 75 },
  { domain: "Data Eng.",  score: 87 },
];

const domains = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: "from-primary to-primary/60",
    glow: "hsl(217 91% 60% / 0.25)",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning", "Hugging Face", "OpenCV", "Ray"],
  },
  {
    icon: Globe,
    title: "Frontend",
    color: "from-cyan-500 to-cyan-600/60",
    glow: "hsl(189 100% 56% / 0.2)",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
  },
  {
    icon: Code2,
    title: "Backend & APIs",
    color: "from-secondary to-secondary/60",
    glow: "hsl(260 85% 65% / 0.2)",
    skills: ["Python", "FastAPI", "Node.js", "Flask", "REST APIs", "WebSockets"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "from-amber-500 to-amber-600/60",
    glow: "hsl(43 96% 56% / 0.2)",
    skills: ["AWS", "Docker", "CI/CD", "GitHub Actions", "EC2", "S3"],
  },
  {
    icon: Database,
    title: "Data & Databases",
    color: "from-emerald-500 to-emerald-600/60",
    glow: "hsl(152 69% 50% / 0.2)",
    skills: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Pandas", "NumPy"],
  },
  {
    icon: Cpu,
    title: "Languages",
    color: "from-rose-500 to-rose-600/60",
    glow: "hsl(0 84% 60% / 0.18)",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"],
  },
];

const proficiencies = [
  { name: "Python",        pct: 95, color: "from-blue-500  to-blue-600" },
  { name: "TypeScript",    pct: 90, color: "from-primary   to-secondary" },
  { name: "Deep Learning", pct: 88, color: "from-secondary to-violet-600" },
  { name: "React",         pct: 92, color: "from-cyan-500  to-cyan-600" },
  { name: "AWS",           pct: 82, color: "from-amber-500 to-amber-600" },
  { name: "Docker",        pct: 79, color: "from-sky-500   to-sky-600" },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function ProficiencyBar({ name, pct, color, index }: { name: string; pct: number; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">{pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

const SkillsSection = () => {
  return (
    <section id="skills" className="py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">What I work with</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider" />
        </motion.div>

        {/* ── Top Row: Radar + Proficiency Bars ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8 gradient-border"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Domain Overview
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid
                    stroke="hsl(240 6% 25%)"
                    strokeWidth={1}
                  />
                  <PolarAngleAxis
                    dataKey="domain"
                    tick={{ fill: "hsl(240 5% 65%)", fontSize: 12, fontWeight: 500 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(217 91% 60%)"
                    fill="hsl(217 91% 60%)"
                    fillOpacity={0.18}
                    strokeWidth={2}
                    dot={{ fill: "hsl(217 91% 60%)", r: 4, strokeWidth: 0 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Proficiency Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-8"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Core Proficiency
            </h3>
            <div className="space-y-5">
              {proficiencies.map((p, i) => (
                <ProficiencyBar key={p.name} {...p} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Domain Clusters ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.title}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-card p-6 group cursor-default"
              style={{ transition: "box-shadow 0.3s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${domain.glow}, 0 12px 40px rgba(0,0,0,0.4)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center shadow-md`}>
                  <domain.icon className="h-4.5 w-4.5 text-white h-[18px] w-[18px]" />
                </div>
                <span className="font-semibold text-sm">{domain.title}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {domain.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/8 text-muted-foreground group-hover:border-white/15 transition-colors"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
