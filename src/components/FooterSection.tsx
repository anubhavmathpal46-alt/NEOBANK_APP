import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const FooterSection = () => (
  <footer className="border-t border-border py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">F</span>
            </div>
            <span className="font-display font-bold text-lg text-foreground">Finora Bank</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">The future of intelligent banking and trading, powered by AI.</p>
          <div className="flex gap-3">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {["Home", "Features", "Trading", "Dashboard"].map((l) => (
              <Link key={l} to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
          <div className="flex flex-col gap-2.5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"].map((l) => (
              <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} /> hello@finorabank.com
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone size={14} /> +91 800 123 4567
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} /> Mumbai, India
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Finora Bank. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
