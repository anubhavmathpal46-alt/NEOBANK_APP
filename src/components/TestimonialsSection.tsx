import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Entrepreneur",
    text: "Finora Bank transformed how I manage my business finances. The AI insights are incredibly accurate and have saved me thousands.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Alex Chen",
    role: "Day Trader",
    text: "The trading platform is lightning-fast. The ML predictions have helped me make smarter trades. Best fintech app I've used.",
    rating: 5,
    avatar: "AC",
  },
  {
    name: "Maria González",
    role: "Freelancer",
    text: "Seamless banking experience with zero hidden fees. The spending analysis feature helps me budget effectively every month.",
    rating: 5,
    avatar: "MG",
  },
];

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          What Our <span className="text-gradient">Users Say</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Trusted by millions worldwide.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card p-8 hover:glow-effect transition-shadow duration-300"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
