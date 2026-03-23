import { Shield, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-cyber font-bold tracking-wider">
                <span className="text-primary">PHISH</span>
                <span className="text-foreground">GUARD</span>
                <span className="text-secondary text-xs ml-1 font-mono">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              AI-Powered Phishing URL Detection System. Protecting users from phishing attacks with artificial intelligence and advanced heuristic analysis.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              {[
                { to: '/scanner', label: 'URL Scanner' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/education', label: 'Learn More' },
                { to: '/about', label: 'About Project' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Project Info</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Final Year AI/ML Project<br />
              Built with React, TypeScript & TailwindCSS<br />
              Heuristic-based phishing detection engine
            </p>
          </div>
        </div>
        <div className="border-t border-border/50 mt-8 pt-6 text-center">
          <p className="text-[10px] text-muted-foreground font-mono">
            PhishGuard AI v2.0 — AI-Powered URL Security Analysis © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
