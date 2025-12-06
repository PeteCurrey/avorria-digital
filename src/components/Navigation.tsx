import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronRight, ArrowRight, ExternalLink,
  Layers, Search, Target, Palette, Sparkles, Bot, Zap,
  Users, Award, BarChart3, LineChart,
  BookOpen, Wrench, GraduationCap,
  DollarSign, Mail, ClipboardCheck, HelpCircle
} from "lucide-react";
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
                    <div className="w-[calc(100vw-3rem)] max-w-[880px] bg-popover/98 backdrop-blur-xl border border-border/60 shadow-2xl rounded-xl overflow-hidden">
                      {/* Header */}
                      <div className="px-4 md:px-8 py-4 md:py-5 border-b border-border/40 bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Explore our services, resources, and learn why businesses choose Avorria.
                        </p>
                      </div>
                      
                      {/* Content Grid - responsive */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-border/40">
                        {navSections.map((section, sectionIndex) => (
                          <div key={section.title} className={`p-4 md:p-5 ${sectionIndex >= 2 ? 'border-t border-border/40 lg:border-t-0' : ''}`}>
                            <div className="mb-3 md:mb-4">
                              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                {section.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">
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
                                      className={`group relative flex items-center gap-2 md:gap-3 py-2 px-2 md:px-3 rounded-r-lg transition-all duration-200 border-l-2 hover:translate-x-1 ${
                                        link.highlight 
                                          ? "border-l-accent bg-accent/5 translate-x-1" 
                                          : "border-l-transparent hover:border-l-accent hover:bg-muted/40"
                                      }`}
                                    >
                                      <Icon className={`flex-shrink-0 w-4 h-4 transition-colors ${
                                        link.highlight 
                                          ? "text-accent" 
                                          : "text-muted-foreground group-hover:text-foreground"
                                      }`} />
                                      <div className="flex-1 min-w-0">
                                        <span className={`block text-xs md:text-sm font-medium transition-colors ${
                                          link.highlight ? "text-accent" : "text-foreground"
                                        }`}>
                                          {link.name}
                                        </span>
                                        <span className="hidden md:block text-xs text-muted-foreground mt-0.5 leading-tight">
                                          {link.description}
                                        </span>
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      {/* Avorria Ecosystem Section */}
                      <div className="px-4 md:px-8 py-4 md:py-5 border-t border-border/40 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                Avorria Ecosystem
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Our platform suite for growth
                              </p>
                            </div>
                            <Link 
                              to="/contact"
                              onClick={() => trackNavClick('book_call_menu', 'header')}
                              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                            >
                              Book a free strategy call
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {/* Avorria AI */}
                            <a 
                              href="http://ai.avorria.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackNavClick('avorria_ai', 'header')}
                              className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 hover:from-violet-500/20 hover:to-fuchsia-500/10 border border-violet-500/20 hover:border-violet-500/30"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                <Bot className="w-4.5 h-4.5 text-violet-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-foreground">Avorria AI</span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-60" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                                  AI-powered marketing assistant & automation
                                </p>
                              </div>
                            </a>
                            
                            {/* Avorria Media */}
                            <a 
                              href="https://media.avorria.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackNavClick('avorria_media', 'header')}
                              className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 bg-gradient-to-br from-amber-500/10 to-orange-500/5 hover:from-amber-500/20 hover:to-orange-500/10 border border-amber-500/20 hover:border-amber-500/30"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                <Sparkles className="w-4.5 h-4.5 text-amber-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-foreground">Avorria Media</span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-60" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                                  Creative content & video production
                                </p>
                              </div>
                            </a>
                            
                            {/* Marketing Command */}
                            <a 
                              href="https://marketing.avorria.com" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={() => trackNavClick('marketing_command', 'header')}
                              className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:from-emerald-500/20 hover:to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/30"
                            >
                              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <Zap className="w-4.5 h-4.5 text-emerald-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-foreground">Marketing Command</span>
                                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-60" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                                  Campaign management & analytics hub
                                </p>
                              </div>
                            </a>
                          </div>
                          
                          {/* Mobile CTA */}
                          <Link 
                            to="/contact"
                            onClick={() => trackNavClick('book_call_menu', 'header')}
                            className="sm:hidden inline-flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors pt-2"
                          >
                            Book a free strategy call
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
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
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-r-lg transition-all duration-200 border-l-2 hover:translate-x-1 ${
                          link.highlight 
                            ? "border-l-accent bg-accent/5 translate-x-1" 
                            : "border-l-transparent hover:border-l-accent hover:bg-muted/40"
                        }`}
                        onClick={() => {
                          trackNavClick(link.name.toLowerCase().replace(/ /g, '_'), 'header');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Icon className={`w-5 h-5 ${
                          link.highlight ? "text-accent" : "text-muted-foreground"
                        }`} />
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
              {/* Avorria Ecosystem - Mobile */}
              <div className="pt-6 space-y-4 px-2 border-t border-border">
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Avorria Ecosystem
                  </h4>
                  <p className="text-xs text-muted-foreground">Our platform suite</p>
                </div>
                
                <div className="space-y-2">
                  <a 
                    href="http://ai.avorria.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackNavClick('avorria_ai', 'header');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/5 border border-violet-500/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">Avorria AI</span>
                      <p className="text-xs text-muted-foreground">AI-powered marketing assistant</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                  
                  <a 
                    href="https://media.avorria.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackNavClick('avorria_media', 'header');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">Avorria Media</span>
                      <p className="text-xs text-muted-foreground">Creative content & video</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                  
                  <a 
                    href="https://marketing.avorria.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackNavClick('marketing_command', 'header');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border border-emerald-500/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">Marketing Command</span>
                      <p className="text-xs text-muted-foreground">Campaign management hub</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
              
              <div className="pt-4 space-y-3 px-2">
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