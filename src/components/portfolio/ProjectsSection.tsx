import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI-Powered Video Assistant",
      description: "Deep learning system that analyzes video content and provides intelligent insights using computer vision and NLP techniques.",
      image: "/api/placeholder/500/300",
      tech: ["Python", "TensorFlow", "OpenCV", "NLP", "Flask"],
      github: "https://github.com/srvenu",
      demo: "#",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Smart Traffic Management System",
      description: "AI-driven traffic optimization system using computer vision to analyze traffic patterns and suggest improvements.",
      image: "/api/placeholder/500/300",
      tech: ["Python", "Computer Vision", "Deep Learning", "React", "FastAPI"],
      github: "https://github.com/srvenu",
      demo: "#",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "YouTube Notes Generator",
      description: "React-based application that automatically generates comprehensive notes from YouTube videos using AI transcription.",
      image: "/api/placeholder/500/300",
      tech: ["React", "Node.js", "AI APIs", "TailwindCSS", "MongoDB"],
      github: "https://github.com/srvenu",
      demo: "#",
      category: "Web Development",
      featured: false,
    },
    {
      title: "Raw Materials Search Engine",
      description: "Desktop application built with Tkinter and Pandas for efficient searching and management of raw materials database.",
      image: "/api/placeholder/500/300",
      tech: ["Python", "Tkinter", "Pandas", "SQLite", "Data Processing"],
      github: "https://github.com/srvenu",
      demo: "#",
      category: "Desktop App",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Showcase of my recent work in AI, machine learning, and full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={project.featured ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="glass-card hover-glow group h-full overflow-hidden">
                <div className="relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-primary/60 text-6xl font-bold">
                      {project.title.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant={project.featured ? "default" : "secondary"} className="bg-primary/90">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-primary/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/srvenu" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;