import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CreditCard, ArrowUpDown, TrendingUp, Settings, LogOut, Send,
  Plus, ArrowUpRight, ArrowDownRight, X, DollarSign, Wallet, BarChart3, PieChart
} from "lucide-react";
import { Link } from "react-router-dom";

/* ── Sidebar ──────────────────────────────────────── */
const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: CreditCard, label: "Accounts", id: "accounts" },
  { icon: ArrowUpDown, label: "Transactions", id: "overview" },
  { icon: TrendingUp, label: "Trading", id: "trading" },
  { icon: Settings, label: "Settings", id: "overview" },
];

/* ── Transactions ─────────────────────────────────── */
const transactions = [
  { name: "Netflix Subscription", amount: -799, date: "Feb 15, 2026", type: "debit" },
  { name: "Salary Credit", amount: 125000, date: "Feb 1, 2026", type: "credit" },
  { name: "Amazon Purchase", amount: -2499, date: "Jan 28, 2026", type: "debit" },
  { name: "Freelance Payment", amount: 45000, date: "Jan 25, 2026", type: "credit" },
  { name: "Electricity Bill", amount: -1850, date: "Jan 20, 2026", type: "debit" },
];

/* ── Stocks ────────────────────────────────────────── */
const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 198.50, change: 2.35 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 178.20, change: -1.15 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 245.80, change: 5.60 },
  { symbol: "BTC", name: "Bitcoin", price: 98450.00, change: 3.22 },
  { symbol: "ETH", name: "Ethereum", price: 3850.00, change: -0.85 },
  { symbol: "AMZN", name: "Amazon", price: 215.40, change: 1.78 },
];

const portfolio = [
  { name: "Stocks", value: "₹4,52,000", pct: 45, color: "bg-primary" },
  { name: "Crypto", value: "₹2,30,000", pct: 23, color: "bg-secondary" },
  { name: "Mutual Funds", value: "₹3,18,000", pct: 32, color: "bg-accent" },
];

/* ── Modal ─────────────────────────────────────────── */
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm px-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="glass-card-strong w-full max-w-md p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

/* ── Dashboard Page ────────────────────────────────── */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSend, setShowSend] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showTrade, setShowTrade] = useState<{ symbol: string; type: "buy" | "sell" } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">F</span>
            </div>
            <span className="font-display font-bold text-foreground">Finora</span>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => { setActiveTab(link.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors ${
                activeTab === link.id
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <link.icon size={18} /> {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <LogOut size={18} /> Logout
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-background/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
              <LayoutDashboard size={20} />
            </button>
            <h1 className="font-display font-semibold text-foreground capitalize">{activeTab === "overview" ? "Dashboard" : "Trading"}</h1>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">JD</div>
        </header>

        <div className="p-6 max-w-6xl">
          {activeTab === "overview" ? (
            <BankingView onSend={() => setShowSend(true)} onAdd={() => setShowAdd(true)} />
          ) : (
            <TradingView onTrade={(symbol, type) => setShowTrade({ symbol, type })} />
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showSend && (
          <Modal title="Send Money" onClose={() => setShowSend(false)}>
            <div className="flex flex-col gap-4">
              <input placeholder="Recipient Name" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <input placeholder="Account Number" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <input placeholder="Amount (₹)" type="number" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <button className="btn-primary-glow w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2">
                <Send size={16} /> Send Money
              </button>
            </div>
          </Modal>
        )}

        {showAdd && (
          <Modal title="Add Money" onClose={() => setShowAdd(false)}>
            <div className="flex flex-col gap-4">
              <input placeholder="Amount (₹)" type="number" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <select className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none">
                <option>UPI</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
              </select>
              <button className="btn-primary-glow w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2">
                <Plus size={16} /> Add Money
              </button>
            </div>
          </Modal>
        )}

        {showTrade && (
          <Modal title={`${showTrade.type === "buy" ? "Buy" : "Sell"} ${showTrade.symbol}`} onClose={() => setShowTrade(null)}>
            <div className="flex flex-col gap-4">
              <input placeholder="Quantity" type="number" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <input placeholder="Price (₹)" type="number" className="bg-muted text-foreground text-sm px-4 py-3 rounded-lg border border-border focus:border-primary focus:outline-none placeholder:text-muted-foreground" />
              <button className={`w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 ${showTrade.type === "buy" ? "btn-primary-glow" : "bg-destructive"}`}>
                {showTrade.type === "buy" ? "Confirm Buy" : "Confirm Sell"}
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Banking View ──────────────────────────────────── */
const BankingView = ({ onSend, onAdd }: { onSend: () => void; onAdd: () => void }) => (
  <div className="space-y-6">
    {/* Balance cards */}
    <div className="grid sm:grid-cols-3 gap-4">
      {[
        { icon: Wallet, label: "Total Balance", value: "₹10,52,340", sub: "+12.5% this month" },
        { icon: DollarSign, label: "Income", value: "₹1,70,000", sub: "This month" },
        { icon: BarChart3, label: "Investments", value: "₹10,00,000", sub: "+24.5% returns" },
      ].map((c) => (
        <div key={c.label} className="glass-card p-5 hover:glow-effect transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <c.icon size={16} className="text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">{c.label}</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{c.value}</p>
          <p className="text-xs text-gain mt-1">{c.sub}</p>
        </div>
      ))}
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <button onClick={onSend} className="btn-primary-glow px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground flex items-center gap-2">
        <Send size={14} /> Send Money
      </button>
      <button onClick={onAdd} className="btn-outline-glow px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground flex items-center gap-2">
        <Plus size={14} /> Add Money
      </button>
    </div>

    {/* Transactions */}
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-display font-semibold text-foreground">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-border">
        {transactions.map((t) => (
          <div key={t.name + t.date} className="flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === "credit" ? "bg-gain/10" : "bg-loss/10"}`}>
                {t.type === "credit" ? <ArrowDownRight size={16} className="text-gain" /> : <ArrowUpRight size={16} className="text-loss" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${t.type === "credit" ? "text-gain" : "text-loss"}`}>
              {t.type === "credit" ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Trading View ──────────────────────────────────── */
const TradingView = ({ onTrade }: { onTrade: (symbol: string, type: "buy" | "sell") => void }) => (
  <div className="space-y-6">
    {/* Portfolio Summary */}
    <div className="glass-card-strong p-6">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <PieChart size={18} className="text-primary" /> Portfolio Summary
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {portfolio.map((p) => (
          <div key={p.name} className="glass-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${p.color}`} />
              <span className="text-xs text-muted-foreground">{p.name}</span>
            </div>
            <p className="font-display font-bold text-foreground">{p.value}</p>
            <div className="w-full h-1.5 bg-muted rounded-full mt-2">
              <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Chart placeholder */}
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">Market Overview</h3>
      <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-xl">
        <div className="text-center">
          <BarChart3 size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Live chart visualization</p>
        </div>
      </div>
    </div>

    {/* Stock table */}
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-display font-semibold text-foreground">Market Watch</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Symbol</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Name</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Price</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Change</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {stocks.map((s) => (
              <tr key={s.symbol} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 text-sm font-semibold text-primary">{s.symbol}</td>
                <td className="px-5 py-4 text-sm text-foreground">{s.name}</td>
                <td className="px-5 py-4 text-sm text-foreground text-right font-medium">
                  {s.symbol === "BTC" || s.symbol === "ETH" ? "$" : "₹"}{s.price.toLocaleString()}
                </td>
                <td className={`px-5 py-4 text-sm text-right font-medium ${s.change >= 0 ? "text-gain" : "text-loss"}`}>
                  {s.change >= 0 ? "+" : ""}{s.change}%
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onTrade(s.symbol, "buy")}
                      className="px-3 py-1.5 rounded-lg bg-gain/10 text-gain text-xs font-semibold hover:bg-gain/20 transition-colors"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => onTrade(s.symbol, "sell")}
                      className="px-3 py-1.5 rounded-lg bg-loss/10 text-loss text-xs font-semibold hover:bg-loss/20 transition-colors"
                    >
                      Sell
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
