import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI-Powered Video Assistant",
      description:
        "Deep learning system that analyzes video content and provides intelligent insights using computer vision and NLP techniques.",
      image: "/images/featured-image-youtube-video-to-notes.jpg", // Update with the correct path
      tech: ["Python", "TensorFlow", "OpenCV", "NLP", "Flask"],
      github: "https://github.com/srvenu/youtube_video_to_notes",
      demo: "#",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Sign Language Recognition",
      description:
        "This project is a real-time sign language recognition system that uses a webcam to detect hand gestures and convert them into meaningful sentences. It leverages OpenCV, cvzone, TensorFlow, and Streamlit to provide an interactive user experience.",
      image: "/images/sign_language_recognition.jpg", // Update with the correct path
      tech: ["Python", "Computer Vision", "Deep Learning", "React", "FastAPI"],
      github: "https://github.com/srvenu/Sign_Language_Recognition",
      demo: "#",
      category: "AI/ML",
      featured: true,
    },
    {
      title: "Track Drive Assist",
      description:
        "React-based application that automatically Tracks the Service and deadline of vehicles.",
      image: "/images/track_assest.jpg", // Update with the correct path
      tech: ["React", "Node.js", "AI APIs", "TailwindCSS", "MongoDB"],
      github: "https://github.com/srvenu/track-drive-assist",
      demo: "#",
      category: "Web Development",
      featured: false,
    },
    {
      title: "Raw Materials Search Engine",
      description:
        "Desktop application built with Tkinter and Pandas for efficient searching and management of raw materials database.",
      image: "/images/project1.jpg",
      tech: ["Python", "Tkinter", "Pandas", "SQLite", "Data Processing"],
      github: "https://github.com/srvenu/Excel-Search-Application",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Showcase of my recent work in AI, machine learning, and full-stack
            development
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
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={project.featured ? "default" : "secondary"}
                      className="bg-primary/90"
                    >
                      {project.category}
                    </Badge>
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
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-primary/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
            <a
              href="https://github.com/srvenu"
              target="_blank"
              rel="noopener noreferrer"
            >
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
