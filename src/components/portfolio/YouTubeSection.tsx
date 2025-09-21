import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Youtube, Users, Clock } from "lucide-react";

const YouTubeSection = () => {
  const channelStats = [
    { icon: Users, label: "Subscribers", value: "5K+" },
    { icon: Play, label: "Videos", value: "50+" },
    { icon: Clock, label: "Watch Time", value: "10K+ hours" },
  ];

  const featuredVideos = [
    {
      title: "Complete Machine Learning Tutorial for Beginners",
      description: "Learn ML from scratch with Python, covering algorithms, data preprocessing, and model evaluation.",
      duration: "45:30",
      views: "12K",
      thumbnail: "ML",
    },
    {
      title: "Building AI Applications with React & TensorFlow.js",
      description: "Create intelligent web applications using modern frameworks and machine learning in the browser.",
      duration: "38:45",
      views: "8.5K",
      thumbnail: "AI",
    },
    {
      title: "AWS Cloud Computing Masterclass",
      description: "Master cloud deployment, scaling, and management with hands-on AWS projects.",
      duration: "52:15",
      views: "15K",
      thumbnail: "AWS",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50" id="youtube">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Content & Community</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Join the CodeAlchemists community where I share coding tutorials, AI insights, and software development best practices
          </p>
        </motion.div>

        {/* Channel Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-card hover-glow max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    <Youtube className="h-12 w-12" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 text-primary">CodeAlchemists</h3>
                  <p className="text-muted-foreground mb-4">
                    Transforming complex programming concepts into simple, actionable tutorials. 
                    From AI and machine learning to web development and cloud computing.
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                    {channelStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2"
                      >
                        <stat.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-semibold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button 
                    size="lg" 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    asChild
                  >
                    <a 
                      href="https://www.youtube.com/@CodeAlchemists" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-5 w-5" />
                      Subscribe
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Featured Videos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card hover-glow group overflow-hidden">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-primary/60 text-4xl font-bold">
                      {video.thumbnail}
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/80 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <Badge variant="outline" className="border-primary/30">
                        Tutorial
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://www.youtube.com/@CodeAlchemists" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5 mr-2" />
              View All Videos
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;