import { motion } from "framer-motion";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import YouTubeSection from "@/components/portfolio/YouTubeSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Navigation from "@/components/portfolio/Navigation";
import TerminalChat from "@/components/portfolio/TerminalChat";
import { Github, Linkedin, Youtube, Twitter } from "lucide-react";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <YouTubeSection />
        <TerminalChat />
        <ContactSection />
      </motion.main>

      {/* ── Footer ── */}
      <footer className="py-10 px-4 border-t border-border/30 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-black text-white shadow-md">
                VR
              </div>
              <div>
                <div className="font-bold text-sm">Venu Raj</div>
                <div className="text-xs text-muted-foreground">AI & Software Engineer</div>
              </div>
            </div>

            {/* Copyright */}
            <motion.p
              className="text-xs text-muted-foreground/60 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Venu Raj · Built with React, Framer Motion & Tailwind
            </motion.p>

            {/* Social Mini Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Github,   url: "https://github.com/srvenu" },
                { Icon: Linkedin, url: "https://www.linkedin.com/in/srvenu/" },
                { Icon: Twitter,  url: "https://x.com/Venuraj02" },
                { Icon: Youtube,  url: "https://www.youtube.com/@CodeAlchemists" },
              ].map(({ Icon, url }) => (
                <motion.a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
