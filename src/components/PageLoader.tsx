import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="loader-container"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center"
            >
              <span className="text-primary-foreground font-display font-bold text-lg">F</span>
            </motion.div>
            <p className="text-sm text-muted-foreground font-medium">Loading Finora Bank...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
