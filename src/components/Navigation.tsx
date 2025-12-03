import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Layers, Search, Target, Palette, Users, Award, BarChart3, LineChart, BookOpen, Wrench, BookText, DollarSign, Mail, ClipboardCheck, HelpCircle } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { trackNavClick } from "@/lib/tracking";

interface NavigationProps {
  transparent?: boolean;
}

const Navigation = ({
  transparent = false
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navSections = [{
    title: "What We Do",
    links: [{
      name: "Services Overview",
      href: "/services",
      icon: Layers
    }, {
      name: "SEO Services",
      href: "/services/seo",
      icon: Search
    }, {
      name: "Paid Media",
      href: "/services/paid-media",
      icon: Target
    }, {
      name: "Web Design",
      href: "/services/web-design",
      icon: Palette
    }]
  }, {
    title: "Why Avorria",
    links: [{
      name: "About Us",
      href: "/about",
      icon: Users
    }, {
      name: "Why Choose Us",
      href: "/why-avorria",
      icon: Award
    }, {
      name: "Case Studies",
      href: "/case-studies",
      icon: BarChart3
    }, {
      name: "Reporting",
      href: "/reporting",
      icon: LineChart
    }]
  }, {
    title: "Resources",
    links: [{
      name: "Resources Hub",
      href: "/resources",
      icon: BookOpen
    }, {
      name: "SEO Glossary",
      href: "/resources/seo-glossary",
      icon: BookText
    }, {
      name: "Tools",
      href: "/tools",
      icon: Wrench
    }]
  }, {
    title: "Get Started",
    links: [{
      name: "Pricing",
      href: "/pricing",
      icon: DollarSign
    }, {
      name: "Contact",
      href: "/contact",
      icon: Mail
    }, {
      name: "Free Audit",
      href: "/free-seo-website-audit",
      icon: ClipboardCheck
    }, {
      name: "FAQs",
      href: "/faqs",
      icon: HelpCircle
    }]
  }];
  const shouldBeTransparent = transparent && !isScrolled;
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !transparent ? "bg-background shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-6 h-20">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 font-extralight text-lg">
            <span className={`text-2xl font-extralight tracking-wide transition-colors ${shouldBeTransparent ? "text-white" : "text-foreground"}`}>Avorria</span>
          </Link>

          {/* Spacer for logo */}
          <div className="hidden lg:flex flex-1"></div>

          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`backdrop-blur-sm transition-transform duration-200 hover:scale-105 font-extralight ${shouldBeTransparent ? "bg-white/10 text-white hover:bg-white/20 data-[state=open]:bg-white/20" : "bg-card/40 text-foreground hover:bg-card/60 data-[state=open]:bg-card/60"}`}>
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-4 gap-8 p-8 w-[820px] bg-popover border border-border/50 shadow-xl">
                      {navSections.map(section => (
                        <div key={section.title} className="space-y-4">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h4>
                          <ul className="space-y-1">
                            {section.links.map(link => {
                              const Icon = link.icon;
                              return (
                                <li key={link.href}>
                                  <Link 
                                    to={link.href} 
                                    onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'header')} 
                                    className="flex items-center gap-3 text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 transition-all py-2.5 px-2 rounded-md group"
                                  >
                                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                                    <span>{link.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button variant="default" size="sm" asChild className={`transition-transform duration-200 hover:scale-105 font-extralight ${shouldBeTransparent ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              <Link to="/contact" onClick={() => trackNavClick('get_in_touch', 'header')}>Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className={`lg:hidden p-2 transition-colors ${shouldBeTransparent ? "text-white" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-background z-40 overflow-y-auto animate-fade-in">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {navSections.map(section => <div key={section.title} className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                    {section.title}
                  </h4>
                  {section.links.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={link.href} 
                        to={link.href} 
                        className="flex items-center gap-3 py-3 px-3 text-base font-medium text-foreground hover:text-accent hover:bg-muted/50 rounded-md transition-colors" 
                        onClick={() => {
                          trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'header');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>)}
              <div className="pt-6 space-y-3 px-2 border-t border-border">
                <Button variant="outline" className="w-full h-12 text-base" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
                <Button variant="accent" className="w-full h-12 text-base" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Book Strategy Call
                  </Link>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;