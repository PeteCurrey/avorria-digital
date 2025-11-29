import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { pageTemplates, categoryIcons } from "@/data/siteTemplates";
import * as Icons from "lucide-react";
import { Search, Plus, Check } from "lucide-react";

interface PageTemplateLibraryProps {
  onAddPage: (template: any) => void;
  selectedPages: any[];
}

export const PageTemplateLibrary = ({ onAddPage, selectedPages }: PageTemplateLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(pageTemplates.map(t => t.category)));

  const filteredTemplates = pageTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isPageAdded = (templateId: string) => {
    return selectedPages.some(p => p.page_type === templateId);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search page templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Badge>
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
        {filteredTemplates.map(template => {
          const IconComponent = (Icons as any)[template.icon] || Icons.FileText;
          const added = isPageAdded(template.id);

          return (
            <Card key={template.id} className="p-4 hover:border-primary transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold">
                        {template.name}
                        {template.isRequired && (
                          <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {template.sections.length} sections
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onAddPage(template)}
                      disabled={added}
                      variant={added ? "outline" : "default"}
                      className="gap-2"
                    >
                      {added ? (
                        <>
                          <Check className="h-3 w-3" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          Add Page
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
