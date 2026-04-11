const fs = require('fs');

const path = './src/components/Navigation.tsx';
let content = fs.readFileSync(path, 'utf8');

const newNavSections = `const navSections = [{
    title: "Services",
    description: "What we actually do",
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
      description: "Conversion-focused websites",
      href: "/services/web-design",
      icon: Palette
    }]
  }, {
    title: "Company",
    description: "Who we are",
    links: [{
      name: "About Us",
      description: "Meet the core team",
      href: "/about",
      icon: Users
    }, {
      name: "Case Studies",
      description: "Client success stories",
      href: "/case-studies",
      icon: BarChart3
    }, {
      name: "Contact Us",
      description: "Get in touch",
      href: "/contact",
      icon: Mail
    }]
  }];`;

// Use regex to replace the array
content = content.replace(/const navSections = \[[\s\S]*?\}\]\s*\}\];/, newNavSections);

fs.writeFileSync(path, content, 'utf8');
console.log("Updated Navigation.tsx");
