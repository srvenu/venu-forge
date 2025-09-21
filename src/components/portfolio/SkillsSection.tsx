import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Brain, 
  Cloud, 
  Globe, 
  Database, 
  Cpu,
  GitBranch,
  Smartphone
} from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 95, color: "from-blue-500 to-blue-600" },
        { name: "JavaScript/TypeScript", level: 90, color: "from-yellow-500 to-yellow-600" },
        { name: "Java", level: 85, color: "from-red-500 to-red-600" },
        { name: "C++", level: 80, color: "from-purple-500 to-purple-600" },
      ],
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      skills: [
        { name: "Deep Learning", level: 90, color: "from-primary to-secondary" },
        { name: "Computer Vision", level: 85, color: "from-green-500 to-green-600" },
        { name: "NLP", level: 80, color: "from-indigo-500 to-indigo-600" },
        { name: "TensorFlow/PyTorch", level: 88, color: "from-orange-500 to-orange-600" },
      ],
    },
    {
      icon: Globe,
      title: "Web Development",
      skills: [
        { name: "React/Next.js", level: 92, color: "from-cyan-500 to-cyan-600" },
        { name: "Node.js", level: 85, color: "from-green-600 to-green-700" },
        { name: "TailwindCSS", level: 95, color: "from-teal-500 to-teal-600" },
        { name: "REST APIs", level: 90, color: "from-pink-500 to-pink-600" },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 85, color: "from-amber-500 to-amber-600" },
        { name: "Docker", level: 80, color: "from-blue-600 to-blue-700" },
        { name: "Git/GitHub", level: 95, color: "from-gray-600 to-gray-700" },
        { name: "CI/CD", level: 75, color: "from-violet-500 to-violet-600" },
      ],
    },
  ];

  const tools = [
    "Ray", "OpenCV", "Hugging Face", "Pandas", "NumPy", 
    "Tkinter", "FastAPI", "MongoDB", "PostgreSQL", "Redis"
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card hover-glow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.1) + (skillIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: (index * 0.1) + (skillIndex * 0.1) }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-primary">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 cursor-default"
                >
                  {tool}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;