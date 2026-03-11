import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!isLogin && !name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast({ title: isLogin ? "Welcome back!" : "Account created!", description: "Redirecting to dashboard..." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero relative px-4">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong w-full max-w-md p-8 relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold">F</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">Finora Bank</span>
        </Link>

        {/* Toggle */}
        <div className="flex rounded-xl bg-muted p-1 mb-8">
          {["Login", "Sign Up"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => { setIsLogin(i === 0); setErrors({}); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                (i === 0 ? isLogin : !isLogin)
                  ? "bg-gradient-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-muted text-foreground text-sm pl-10 pr-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-muted text-foreground text-sm pl-10 pr-10 py-3 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-border accent-primary" />
                <span className="text-xs text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary-glow w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 mt-2">
            {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
