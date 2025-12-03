import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronRight, ArrowRight, ExternalLink,
  Layers, Search, Target, Palette, Sparkles, Bot,
  Users, Award, BarChart3, LineChart,
  BookOpen, Wrench, BookText, GraduationCap,
  DollarSign, Mail, ClipboardCheck, HelpCircle
} from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
    description: "Strategic digital services",
    links: [{
      name: "Services Overview",
      description: "All our digital services",
      href: "/services",
      icon: Layers
    }, {
      name: "SEO Services",
      description: "Organic search growth",
      href: "/services/seo",
      icon: Search
    }, {
      name: "Paid Media",
      description: "PPC & social advertising",
      href: "/services/paid-media",
      icon: Target
    }, {
      name: "Web Design",
      description: "Conversion-focused sites",
      href: "/web-design",
      icon: Palette
    }, {
      name: "Website Studio",
      description: "Build your dream site",
      href: "/web-design/studio",
      icon: Sparkles,
      highlight: true
    }]
  }, {
    title: "Why Avorria",
    description: "Our story & results",
    links: [{
      name: "About Us",
      description: "Meet the team",
      href: "/about",
      icon: Users
    }, {
      name: "Why Choose Us",
      description: "What sets us apart",
      href: "/why-avorria",
      icon: Award
    }, {
      name: "Case Studies",
      description: "Client success stories",
      href: "/case-studies",
      icon: BarChart3
    }, {
      name: "Reporting",
      description: "Transparent dashboards",
      href: "/reporting",
      icon: LineChart
    }]
  }, {
    title: "Resources",
    description: "Learn & grow",
    links: [{
      name: "Resources Hub",
      description: "Guides & insights",
      href: "/resources",
      icon: BookOpen
    }, {
      name: "SEO Glossary",
      description: "Terms explained",
      href: "/resources/seo-glossary",
      icon: GraduationCap
    }, {
      name: "Tools",
      description: "Free SEO tools",
      href: "/tools",
      icon: Wrench
    }]
  }, {
    title: "Get Started",
    description: "Let's talk",
    links: [{
      name: "Pricing",
      description: "Transparent pricing",
      href: "/pricing",
      icon: DollarSign
    }, {
      name: "Contact",
      description: "Get in touch",
      href: "/contact",
      icon: Mail
    }, {
      name: "Free Audit",
      description: "Website health check",
      href: "/free-seo-website-audit",
      icon: ClipboardCheck,
      highlight: true
    }, {
      name: "FAQs",
      description: "Common questions",
      href: "/faqs",
      icon: HelpCircle
    }]
  }];

  const shouldBeTransparent = transparent && !isScrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || !transparent ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/40" : "bg-transparent"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-6 h-20">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className={`text-2xl font-extralight tracking-wide transition-colors ${shouldBeTransparent ? "text-white" : "text-foreground"}`}>
              Avorria
            </span>
          </Link>

          <div className="hidden lg:flex flex-1"></div>

          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="http://ai.avorria.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => trackNavClick('avorria_ai', 'header')}
                    className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      shouldBeTransparent 
                        ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white hover:from-violet-500/30 hover:to-fuchsia-500/30 backdrop-blur-sm border border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]" 
                        : "bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-foreground hover:from-violet-500/20 hover:to-fuchsia-500/20 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    }`}
                  >
                    <Bot className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
                    Avorria AI
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px] text-center">
                  <p>Explore our AI-powered tools and solutions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={`px-4 py-2 rounded-full transition-all duration-200 font-normal text-sm ${
                      shouldBeTransparent 
                        ? "bg-white/10 text-white hover:bg-white/20 data-[state=open]:bg-white/20 backdrop-blur-sm" 
                        : "bg-muted/50 text-foreground hover:bg-muted data-[state=open]:bg-muted"
                    }`}
                  >
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[880px] bg-popover/98 backdrop-blur-xl border border-border/60 shadow-2xl rounded-xl overflow-hidden">
                      {/* Header */}
                      <div className="px-8 py-5 border-b border-border/40 bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Explore our services, resources, and learn why businesses choose Avorria.
                        </p>
                      </div>
                      
                      {/* Content Grid */}
                      <div className="grid grid-cols-4 gap-0 divide-x divide-border/40">
                        {navSections.map((section, sectionIndex) => (
                          <div key={section.title} className="p-5">
                            <div className="mb-4">
                              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                {section.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {section.description}
                              </p>
                            </div>
                            <ul className="space-y-1">
                              {section.links.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <li key={link.href}>
                                    <Link 
                                      to={link.href} 
                                      onClick={() => trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'header')} 
                                      className={`group flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200 ${
                                        link.highlight 
                                          ? "bg-accent/10 hover:bg-accent/20 border border-accent/20" 
                                          : "hover:bg-muted/60"
                                      }`}
                                    >
                                      <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                                        link.highlight 
                                          ? "bg-accent/20 text-accent" 
                                          : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                                      }`}>
                                        <Icon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className={`block text-sm font-medium transition-colors ${
                                          link.highlight ? "text-accent" : "text-foreground group-hover:text-accent"
                                        }`}>
                                          {link.name}
                                        </span>
                                        <span className="block text-xs text-muted-foreground mt-0.5 leading-tight">
                                          {link.description}
                                        </span>
                                      </div>
                                      <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${
                                        link.highlight ? "text-accent" : "text-muted-foreground"
                                      }`} />
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      {/* Footer CTA */}
                      <div className="px-8 py-4 border-t border-border/40 bg-muted/20 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Not sure where to start?
                        </p>
                        <Link 
                          to="/contact"
                          onClick={() => trackNavClick('book_call_menu', 'header')}
                          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                        >
                          Book a free strategy call
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button 
              variant="default" 
              size="sm" 
              asChild 
              className={`rounded-full px-5 font-normal transition-all duration-200 hover:scale-105 ${
                shouldBeTransparent 
                  ? "bg-white text-black hover:bg-white/90" 
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              <Link to="/contact" onClick={() => trackNavClick('get_in_touch', 'header')}>
                Get in Touch
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${shouldBeTransparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-background z-40 overflow-y-auto animate-fade-in">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {navSections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <div className="px-2 mb-3">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                  {section.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={link.href} 
                        to={link.href} 
                        className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all ${
                          link.highlight 
                            ? "bg-accent/10 border border-accent/20" 
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => {
                          trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'header');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <div className={`w-9 h-9 rounded-md flex items-center justify-center ${
                          link.highlight ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <span className={`block text-sm font-medium ${link.highlight ? "text-accent" : "text-foreground"}`}>
                            {link.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">{link.description}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </div>
              ))}
              <div className="pt-6 space-y-3 px-2 border-t border-border">
                <Button variant="outline" className="w-full h-12 text-base rounded-lg" asChild>
                  <a 
                    href="http://ai.avorria.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackNavClick('avorria_ai', 'header');
                      setIsMobileMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <Bot className="w-5 h-5" />
                    Avorria AI
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full h-12 text-base rounded-lg" asChild>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
                <Button variant="default" className="w-full h-12 text-base rounded-lg" asChild>
                  <Link to="/free-seo-website-audit" onClick={() => setIsMobileMenuOpen(false)}>
                    Free Website Audit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;