import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card-strong w-80 h-96 mb-4 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle size={14} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-foreground">Finora AI</p>
                  <p className="text-[10px] text-primary-foreground/70">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="glass-card px-3 py-2 max-w-[80%] mb-3">
                <p className="text-xs text-foreground">Hi! 👋 I'm Finora AI. How can I help you today?</p>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-muted text-foreground text-sm px-3 py-2 rounded-lg border-none outline-none placeholder:text-muted-foreground"
                />
                <button className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-lg animate-pulse-glow hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
};

export default ChatBotButton;
