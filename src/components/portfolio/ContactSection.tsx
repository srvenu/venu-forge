import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  Youtube,
  Twitter,
  Send,
  MapPin,
  Phone,
} from "lucide-react";

const ContactSection = () => {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/srvenu",
      color: "hover:text-gray-300",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/srvenu/",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "X (Twitter)",
      url: "https://x.com/Venuraj02",
      color: "hover:text-blue-400",
    },
    {
      icon: Youtube,
      label: "YouTube",
      url: "https://www.youtube.com/@CodeAlchemists",
      color: "hover:text-red-400",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "srvenugopal2002@gmail.com",
      link: "mailto:srvenugopal2002@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from
            you. Let's build something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Send a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Name
                      </label>
                      <Input
                        placeholder="Your name"
                        className="bg-background/50 border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        className="bg-background/50 border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Subject
                    </label>
                    <Input
                      placeholder="Project collaboration, job opportunity, etc."
                      className="bg-background/50 border-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project or how I can help you..."
                      className="min-h-[120px] bg-background/50 border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full hover-glow bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <motion.div
                      key={info.label}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-2 rounded-lg bg-primary/20">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <social.icon
                        className={`h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors ${social.color}`}
                      />
                      <div>
                        <p className="font-medium text-sm">{social.label}</p>
                        <p className="text-xs text-muted-foreground">
                          Follow me
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
