import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Youtube, Users, Clock, Eye, ArrowUpRight } from "lucide-react";

const channelStats = [
  { icon: Users, label: "Subscribers", value: "300+" },
  { icon: Play,  label: "Videos",      value: "5+" },
  { icon: Clock, label: "Watch Time",  value: "1K+ hrs" },
];

const featuredVideos = [
  {
    title: "Transform YouTube Videos into Smart, Topic-Based Notes (with Images & PDF Generator)",
    description:
      "Convert any YouTube tutorial into structured notes with images — exported as a polished PDF for easy review.",
    duration: "1:16:22",
    views: "60+",
    videoId: "9ok0tdN1Zcw",
    thumbnail: "https://img.youtube.com/vi/9ok0tdN1Zcw/hqdefault.jpg",
    link: "https://youtu.be/9ok0tdN1Zcw",
    tag: "AI / Tools",
  },
  {
    title: "Building AI Web Apps with React & TensorFlow.js (Beginner to Pro)",
    description:
      "Create intelligent web applications using React and TensorFlow.js — from setup to deployment with ML in the browser.",
    duration: "38:45",
    views: "8.5K",
    videoId: "PdzKDeX59q8",
    thumbnail: "https://img.youtube.com/vi/PdzKDeX59q8/hqdefault.jpg",
    link: "https://youtu.be/PdzKDeX59q8",
    tag: "React + ML",
  },
  {
    title: "AWS Cloud Deployment Masterclass: Scale & Manage Full-Stack Apps",
    description:
      "Master deploying and scaling full-stack apps on AWS — covering EC2, S3, and CloudFront with hands-on best practices.",
    duration: "52:15",
    views: "15K",
    videoId: "n8qMg9XIPvA",
    thumbnail: "https://img.youtube.com/vi/n8qMg9XIPvA/hqdefault.jpg",
    link: "https://youtu.be/n8qMg9XIPvA",
    tag: "Cloud / AWS",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const YouTubeSection = () => {
  return (
    <section id="youtube" className="py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      {/* Red accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[120px] pointer-events-none opacity-8"
        style={{ background: "radial-gradient(ellipse, hsl(0 84% 60% / 0.15), transparent)" }}
      />

      <div className="container mx-auto max-w-6xl relative">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">Teaching & Community</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Content &{" "}
            <span className="gradient-text">Community</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="section-divider mb-4" />
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl">
            Sharing everything I know about AI, machine learning, and modern web development on the{" "}
            <span className="text-primary font-semibold">CodeAlchemists</span> channel.
          </motion.p>
        </motion.div>

        {/* Channel Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card gradient-border p-8 mb-14"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Channel Logo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-xl">
                  <Youtube className="h-10 w-10 text-white" />
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-red-500/40 animate-pulse-ring" />
              </div>
            </div>

            {/* Channel Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black mb-1 gradient-text">CodeAlchemists</h3>
              <p className="text-sm text-muted-foreground mb-5 max-w-md">
                Transforming complex programming concepts into simple, actionable tutorials — AI, machine learning,
                web development, and cloud computing.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                {channelStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className="flex-shrink-0">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 shadow-lg"
                  style={{ boxShadow: "0 0 24px hsl(0 84% 60% / 0.3)" }}
                  asChild
                >
                  <a href="https://www.youtube.com/@CodeAlchemists" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2 h-5 w-5" />
                    Subscribe
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredVideos.map((video) => (
            <motion.a
              key={video.videoId}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass-card overflow-hidden group block hover-glow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover play overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl">
                    <Play className="h-7 w-7 text-white ml-0.5" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
                  {video.duration}
                </div>
                {/* Tag */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-primary/90 text-white">
                    {video.tag}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="p-5">
                <h4 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {video.views} views
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/40 hover:bg-primary/5" asChild>
            <a href="https://www.youtube.com/@CodeAlchemists" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5 mr-2" />
              View All Videos
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeSection;
