import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pageTemplates } from "@/data/siteTemplates";
import * as Icons from "lucide-react";
import {
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Settings
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SiteStructureBuilderProps {
  pages: any[];
  onUpdatePage: (index: number, updates: any) => void;
  onRemovePage: (index: number) => void;
  onReorder: (newOrder: any[]) => void;
}

export const SiteStructureBuilder = ({
  pages,
  onUpdatePage,
  onRemovePage,
  onReorder
}: SiteStructureBuilderProps) => {
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedPages);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPages(newExpanded);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...pages];
    [newPages[index], newPages[index - 1]] = [newPages[index - 1], newPages[index]];
    onReorder(newPages);
  };

  const moveDown = (index: number) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    onReorder(newPages);
  };

  if (pages.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-4 text-muted-foreground">
            <Icons.LayoutDashboard className="h-12 w-12 mx-auto mb-3 opacity-50" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Pages Yet</h3>
          <p className="text-sm text-muted-foreground">
            Start building your website by selecting page templates from the library on the left.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
      {pages.map((page, index) => {
        const template = pageTemplates.find(t => t.id === page.page_type);
        if (!template) return null;

        const IconComponent = (Icons as any)[template.icon] || Icons.FileText;
        const isExpanded = expandedPages.has(index);
        const availableSections = template.sections;

        return (
          <Card key={index} className="overflow-hidden">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex flex-col gap-1 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 cursor-move"
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{page.page_title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {page.sections?.length || 0} sections
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{page.page_slug}</p>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveDown(index)}
                    disabled={index === pages.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(index)}
                    className="h-8 w-8 p-0"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemovePage(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Page Title</label>
                    <Input
                      value={page.page_title}
                      onChange={(e) => onUpdatePage(index, { page_title: e.target.value })}
                      placeholder="Page title"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">URL Slug</label>
                    <Input
                      value={page.page_slug}
                      onChange={(e) => onUpdatePage(index, { page_slug: e.target.value })}
                      placeholder="/page-url"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Sections ({page.sections?.length || 0} selected)
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
                      {availableSections.map((section: any) => {
                        const isChecked = page.sections?.includes(section.id);
                        return (
                          <label
                            key={section.id}
                            className="flex items-start gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded"
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newSections = checked
                                  ? [...(page.sections || []), section.id]
                                  : (page.sections || []).filter((s: string) => s !== section.id);
                                onUpdatePage(index, { sections: newSections });
                              }}
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{section.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {section.description}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Notes</label>
                    <Textarea
                      value={page.notes || ""}
                      onChange={(e) => onUpdatePage(index, { notes: e.target.value })}
                      placeholder="Add notes about this page..."
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
