import { motion } from "framer-motion";
import { Brain, BarChart3, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "NLP Spending Analysis",
    desc: "Our Natural Language Processing engine analyzes your spending behavior, categorizes transactions, and provides actionable insights in plain language.",
  },
  {
    icon: BarChart3,
    title: "ML Market Predictions",
    desc: "Machine Learning models trained on historical data predict market trends and help you make informed trading decisions with confidence.",
  },
  {
    icon: Lightbulb,
    title: "Smart Portfolio Suggestions",
    desc: "AI-powered portfolio recommendations personalized to your risk tolerance, financial goals, and market conditions.",
  },
];

const AISection = () => (
  <section id="ai" className="py-24 relative section-glow">
    <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 glass-card px-4 py-1.5 mb-4">
          <Brain size={14} className="text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Powered by AI</span>
        </div>
        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          Intelligence That <span className="text-gradient">Works For You</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Leveraging cutting-edge AI to transform how you bank and trade.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card-strong p-8 group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6">
              <f.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AISection;
