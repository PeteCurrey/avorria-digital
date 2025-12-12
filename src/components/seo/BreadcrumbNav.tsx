import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const BreadcrumbNav = ({ items, className = "" }: BreadcrumbNavProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm text-muted-foreground ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="hover:text-foreground transition-colors flex items-center gap-1"
            aria-label="Home"
          >
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mx-1 text-muted-foreground/50" />
            {item.href && index !== items.length - 1 ? (
              <Link 
                to={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
