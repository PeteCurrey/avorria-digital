import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface ResourceTOCProps {
  content: string;
}

const ResourceTOC = ({ content }: ResourceTOCProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^##\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[1];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      items.push({ id, text, level: 2 });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="border-l-2 border-border pl-4">
        <p className="text-sm font-semibold text-foreground mb-4">On This Page</p>
        <ul className="space-y-3">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "text-sm transition-colors hover:text-accent",
                  activeId === item.id
                    ? "text-accent font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ResourceTOC;
