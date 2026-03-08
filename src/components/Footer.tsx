import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import { trackNavClick } from "@/lib/tracking";

const Footer = () => {
  const services = [
  { name: "SEO Services", href: "/services/seo" },
  { name: "Paid Media", href: "/services/paid-media" },
  { name: "Web Design", href: "/web-design" },
  { name: "Content & Email", href: "/services/content-email" },
  { name: "Social & Personal Brand", href: "/services/social-personal-brand" },
  { name: "Analytics & CRO", href: "/services/analytics" },
  { name: "Reporting", href: "/reporting" }];


  const locations = [
  { name: "All Locations", href: "/locations" },
  { name: "SEO London", href: "/seo-agency/london" },
  { name: "SEO Manchester", href: "/seo-agency/manchester" },
  { name: "SEO New York", href: "/seo-agency/new-york" },
  { name: "SEO Sydney", href: "/seo-agency/sydney" },
  { name: "SEO Toronto", href: "/seo-agency/toronto" }];


  const industries = [
  { name: "All Industries", href: "/industries" },
  { name: "Web Design for Trades", href: "/web-design/for/trades" },
  { name: "SEO for Professional Services", href: "/seo-agency/for/professional-services" },
  { name: "Paid Media for SaaS", href: "/paid-media-agency/for/saas" }];


  const company = [
  { name: "About", href: "/about" },
  { name: "Why Avorria", href: "/why-avorria" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/resources" },
  { name: "Pricing", href: "/pricing" },
  { name: "Free SEO Audit", href: "/free-seo-website-audit" },
  { name: "Contact", href: "/contact" }];


  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <span className="text-[1.75rem] font-extralight tracking-wider text-foreground">
                Avorria<span className="text-pink-500 font-bold">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              The performance led digital partner that makes agency BS look amateur. Revenue focused marketing, technical SEO and conversion optimised design.
            
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/avorria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/avorria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/avorria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Locations</h3>
            <ul className="space-y-2 sm:space-y-3">
              {locations.map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Industries</h3>
            <ul className="space-y-2 sm:space-y-3">
              {industries.map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {company.map((link) =>
              <li key={link.href}>
                  <Link
                  to={link.href}
                  onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'footer')}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">

                    {link.name}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Avorria. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;