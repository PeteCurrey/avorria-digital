import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { trackNavClick } from "@/lib/tracking";

const Footer = () => {
  const services = [
    { name: "SEO Services", href: "/services/seo" },
    { name: "Paid Media", href: "/services/paid-media" },
    { name: "Web Design", href: "/services/web-design" },
    { name: "Content & Email", href: "/services/content-email" },
    { name: "Social & Personal Brand", href: "/services/social-personal-brand" },
  ];

  const locations = [
    { name: "SEO in London", href: "/seo/london" },
    { name: "SEO in Manchester", href: "/seo/manchester" },
    { name: "SEO in Birmingham", href: "/seo/birmingham" },
  ];

  const industries = [
    { name: "Web Design for Trades", href: "/web-design/for/trades" },
    { name: "Paid Media for Professional Services", href: "/paid-media/for/professional-services" },
  ];

  const company = [
    { name: "About", href: "/about" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-light tracking-tight text-foreground">
                Avorria
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The performance-led digital partner that makes agency fluff look amateur.
              Revenue-focused marketing, technical SEO, and conversion-optimized design.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Locations</h3>
            <ul className="space-y-3">
              {locations.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Industries</h3>
            <ul className="space-y-3">
              {industries.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Avorria. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
