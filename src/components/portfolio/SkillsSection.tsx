import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Network, Brain, Database, GitMerge, Cpu, FlaskConical } from "lucide-react";

const radarData = [
  { domain: "Agent Systems",   score: 94 },
  { domain: "LLM / Prompting", score: 91 },
  { domain: "RAG / VectorDB",  score: 88 },
  { domain: "Python / ML",     score: 95 },
  { domain: "MLOps",           score: 80 },
  { domain: "Data Pipelines",  score: 86 },
];

const domains = [
  {
    icon: Network,
    title: "Agent Orchestration",
    color: "from-primary to-primary/60",
    glow: "hsl(217 91% 60% / 0.25)",
    skills: ["LangGraph", "LangChain", "CrewAI", "AutoGen", "DeepAgents", "Tool Calling", "ReAct Agents", "Multi-Agent"],
  },
  {
    icon: Brain,
    title: "LLM & Foundation Models",
    color: "from-secondary to-secondary/60",
    glow: "hsl(260 85% 65% / 0.2)",
    skills: ["GPT-4o", "Claude 3.5", "Llama 3", "Gemini", "Mistral", "Groq", "Hugging Face", "Ollama"],
  },
  {
    icon: Database,
    title: "RAG & Vector Databases",
    color: "from-cyan-500 to-cyan-600/60",
    glow: "hsl(189 100% 56% / 0.2)",
    skills: ["Pinecone", "ChromaDB", "Weaviate", "FAISS", "LlamaIndex", "Embeddings", "Semantic Search", "Reranking"],
  },
  {
    icon: GitMerge,
    title: "Workflow & Memory",
    color: "from-amber-500 to-amber-600/60",
    glow: "hsl(43 96% 56% / 0.2)",
    skills: ["LangGraph State", "Redis Memory", "Zep", "Mem0", "Tool Use", "Function Calling", "Structured Output"],
  },
  {
    icon: Cpu,
    title: "ML & Python Ecosystem",
    color: "from-emerald-500 to-emerald-600/60",
    glow: "hsl(152 69% 50% / 0.2)",
    skills: ["PyTorch", "Transformers", "Pandas", "NumPy", "FastAPI", "Pydantic", "asyncio", "LangServe"],
  },
  {
    icon: FlaskConical,
    title: "Evals & MLOps",
    color: "from-rose-500 to-rose-600/60",
    glow: "hsl(0 84% 60% / 0.18)",
    skills: ["LangSmith", "RAGAS", "DeepEval", "Weights & Biases", "MLflow", "Prompt Versioning", "A/B Testing"],
  },
];

const proficiencies = [
  { name: "Python",          pct: 95, color: "from-blue-500  to-blue-600" },
  { name: "LangChain",       pct: 93, color: "from-primary   to-secondary" },
  { name: "LangGraph",       pct: 90, color: "from-secondary to-violet-600" },
  { name: "RAG Pipelines",   pct: 88, color: "from-cyan-500  to-cyan-600" },
  { name: "Prompt Eng.",     pct: 91, color: "from-amber-500 to-amber-600" },
  { name: "Agent Workflows", pct: 87, color: "from-emerald-500 to-emerald-600" },
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
          <motion.p variants={fadeUp} className="section-label mb-3">AI toolchain & frameworks</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Agent Stack &{" "}
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
