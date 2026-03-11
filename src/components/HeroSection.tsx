import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsla(260,80%,62%,0.3), transparent 70%)" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">AI-Powered Banking & Trading</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              The Future of{" "}
              <span className="text-gradient">Intelligent</span>{" "}
              Banking & Trading
            </h1>

            <p className="text-muted-foreground text-lg max-w-lg mb-8 leading-relaxed">
              Experience seamless digital banking, smart trading, and AI-driven financial insights — all in one powerful platform.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="btn-primary-glow px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground inline-flex items-center gap-2">
                Open Account <ArrowRight size={16} />
              </Link>
              <Link to="/dashboard" className="btn-outline-glow px-8 py-3.5 rounded-xl text-sm font-semibold text-foreground inline-flex items-center gap-2">
                <Play size={16} /> Start Trading
              </Link>
            </div>
          </motion.div>

          {/* Right — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-effect-strong">
              <img
                src={heroDashboard}
                alt="Finora Bank Dashboard showing financial analytics"
                className="w-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card-strong px-5 py-3 animate-float">
              <p className="text-xs text-muted-foreground">Portfolio Growth</p>
              <p className="text-lg font-display font-bold text-gain">+24.5%</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
