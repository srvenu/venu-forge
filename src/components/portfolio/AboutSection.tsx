import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Zap } from "lucide-react";

const AboutSection = () => {
  const facts = [
    { icon: MapPin, label: "Location", value: "India" },
    { icon: Heart, label: "Passion", value: "AI & ML" },
    { icon: Zap, label: "Focus", value: "Scalable Solutions" },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-glow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                  VR
                </div>
                <div className="grid gap-4">
                  {facts.map((fact, index) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <fact.icon className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{fact.label}:</span>
                      <Badge variant="secondary">{fact.value}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Passionate AI & Software Engineer
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a dedicated AI and Software Engineer with a passion for building intelligent systems 
              that solve real-world problems. My journey spans across machine learning, cloud computing, 
              and full-stack development.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through my YouTube channel <span className="text-primary font-semibold">CodeAlchemists</span>, 
              I share coding tutorials and insights, helping developers learn AI, machine learning, and 
              modern web development practices.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in creating scalable solutions using Python, React, AWS, and cutting-edge 
              AI technologies. My goal is to bridge the gap between complex algorithms and practical 
              applications that make a difference.
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {["Python", "Machine Learning", "React", "AWS", "Deep Learning", "Cloud Computing"].map((skill) => (
                <Badge key={skill} variant="outline" className="border-primary/30 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;