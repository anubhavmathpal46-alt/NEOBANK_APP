import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, LineChart, Bitcoin, Building2, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  { icon: Briefcase, title: "Financial Consultancy", desc: "Expert advisors to guide your financial decisions with personalized strategies tailored to your goals." },
  { icon: LineChart, title: "Wealth Management", desc: "Grow and protect your wealth with AI-powered portfolio management and diversified investment plans." },
  { icon: Bitcoin, title: "Stock & Crypto Trading", desc: "Trade stocks, ETFs, and cryptocurrencies with zero-commission fees and real-time market data." },
  { icon: Building2, title: "Corporate Banking", desc: "Enterprise-grade banking solutions with multi-currency accounts, payroll, and treasury management." },
];

const ServicesCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % services.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Comprehensive financial solutions designed for the modern investor.</p>
        </motion.div>

        {/* Cards grid — always visible */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 group ${
                i === active ? "glow-effect-strong border-primary/30" : "hover:glow-effect"
              }`}
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                i === active ? "bg-gradient-primary" : "bg-muted"
              }`}>
                <s.icon size={20} className={i === active ? "text-primary-foreground" : "text-muted-foreground"} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
