import { motion } from "framer-motion";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import YouTubeSection from "@/components/portfolio/YouTubeSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Navigation from "@/components/portfolio/Navigation";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <YouTubeSection />
        <ContactSection />
      </motion.div>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            © 2025 Venu Raj.❤️
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;