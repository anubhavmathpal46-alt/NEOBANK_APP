import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Award } from "lucide-react";

const stats = [
  { icon: Users, value: 10, suffix: "M+", label: "Active Users", prefix: "" },
  { icon: TrendingUp, value: 50, suffix: "B+", label: "Trades Processed", prefix: "₹" },
  { icon: Award, value: 4.9, suffix: "/5", label: "Top Rated Bank", prefix: "" },
];

const Counter = ({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.round(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="font-display text-4xl lg:text-5xl font-bold text-foreground">
      {prefix}{Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)}{suffix}
    </div>
  );
};

const StatsSection = () => (
  <section className="py-20 relative section-glow">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card p-8 text-center group hover:glow-effect transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <stat.icon size={22} className="text-primary-foreground" />
            </div>
            <Counter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
