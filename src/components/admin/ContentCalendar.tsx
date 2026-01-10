import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO, isToday } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  FileText,
  Layers,
  Briefcase,
  MessageSquare,
  GripVertical,
  MoreHorizontal,
  Trash2,
  Edit,
  Tag,
  Clock,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useContentCalendar,
  useCreateContentItem,
  useUpdateContentItem,
  useDeleteContentItem,
  ContentItem,
} from "@/hooks/useContentCalendar";

const contentTypes = [
  { value: "blog_post", label: "Blog Post", icon: FileText, color: "text-blue-400" },
  { value: "landing_page", label: "Landing Page", icon: Layers, color: "text-purple-400" },
  { value: "case_study", label: "Case Study", icon: Briefcase, color: "text-amber-400" },
  { value: "social_post", label: "Social Post", icon: MessageSquare, color: "text-green-400" },
];

const statusOptions = [
  { value: "idea", label: "Idea", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  { value: "planned", label: "Planned", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { value: "review", label: "Review", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { value: "published", label: "Published", color: "bg-green-500/20 text-green-400 border-green-500/30" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "bg-gray-500/20 text-gray-400" },
  { value: "medium", label: "Medium", color: "bg-blue-500/20 text-blue-400" },
  { value: "high", label: "High", color: "bg-orange-500/20 text-orange-400" },
  { value: "urgent", label: "Urgent", color: "bg-red-500/20 text-red-400" },
];

const ContentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"calendar" | "kanban">("calendar");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [draggedItem, setDraggedItem] = useState<ContentItem | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const { data: contentItems, isLoading } = useContentCalendar();
  const createItem = useCreateContentItem();
  const updateItem = useUpdateContentItem();
  const deleteItem = useDeleteContentItem();

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    content_type: "blog_post",
    status: "idea",
    priority: "medium",
    scheduled_date: "",
    author_name: "",
    tags: "",
    notes: "",
  });

  // Local state for optimistic reordering
  const [localItems, setLocalItems] = useState<ContentItem[] | null>(null);
  const itemsToUse = localItems ?? contentItems;

  // Reset local state when server data changes
  useMemo(() => {
    if (contentItems) {
      setLocalItems(null);
    }
  }, [contentItems]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const getItemsForDate = (date: Date) => {
    return itemsToUse?.filter((item) =>
      item.scheduled_date && isSameDay(parseISO(item.scheduled_date), date)
    ) || [];
  };

  // Handle drag start
  const handleDragStart = (item: ContentItem) => {
    setDraggedItem(item);
  };

  // Handle drag end - update status when dropped on new column
  const handleDragEnd = () => {
    if (draggedItem && dragOverColumn && draggedItem.status !== dragOverColumn) {
      // Optimistic update
      if (itemsToUse) {
        setLocalItems(
          itemsToUse.map((item) =>
            item.id === draggedItem.id ? { ...item, status: dragOverColumn } : item
          )
        );
      }
      // Server update
      updateItem.mutate({ id: draggedItem.id, status: dragOverColumn });
    }
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  // Handle column hover during drag
  const handleDragOverColumn = (status: string) => {
    if (draggedItem && draggedItem.status !== status) {
      setDragOverColumn(status);
    }
  };

  const handleCreate = () => {
    createItem.mutate({
      title: newItem.title,
      description: newItem.description || null,
      content_type: newItem.content_type,
      status: newItem.status,
      priority: newItem.priority,
      scheduled_date: newItem.scheduled_date || null,
      author_name: newItem.author_name || null,
      tags: newItem.tags ? newItem.tags.split(",").map((t) => t.trim()) : null,
      notes: newItem.notes || null,
    });
    setIsCreateOpen(false);
    setNewItem({
      title: "",
      description: "",
      content_type: "blog_post",
      status: "idea",
      priority: "medium",
      scheduled_date: "",
      author_name: "",
      tags: "",
      notes: "",
    });
  };

  const handleStatusChange = (itemId: string, newStatus: string) => {
    updateItem.mutate({ id: itemId, status: newStatus });
  };

  const handleDateChange = (itemId: string, newDate: string) => {
    updateItem.mutate({ id: itemId, scheduled_date: newDate || null });
  };

  const getContentTypeIcon = (type: string) => {
    const found = contentTypes.find((t) => t.value === type);
    return found ? <found.icon className={`h-4 w-4 ${found.color}`} /> : <FileText className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const found = statusOptions.find((s) => s.value === status);
    return found ? (
      <Badge className={found.color}>{found.label}</Badge>
    ) : (
      <Badge variant="outline">{status}</Badge>
    );
  };

  const groupedByStatus = useMemo(() => {
    const groups: Record<string, ContentItem[]> = {};
    statusOptions.forEach((s) => {
      groups[s.value] = [];
    });
    itemsToUse?.forEach((item) => {
      if (groups[item.status]) {
        groups[item.status].push(item);
      }
    });
    return groups;
  }, [itemsToUse]);

  if (isLoading) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Content Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Content Calendar
          </CardTitle>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex bg-muted/50 rounded-lg p-1">
              <Button
                variant={view === "calendar" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                Calendar
              </Button>
              <Button
                variant={view === "kanban" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("kanban")}
              >
                <Layers className="h-4 w-4 mr-1" />
                Kanban
              </Button>
            </div>

            {/* Month Navigation */}
            {view === "calendar" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[140px] text-center">
                  {format(currentMonth, "MMMM yyyy")}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Create Button */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Content Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter title..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={newItem.content_type}
                        onValueChange={(v) => setNewItem({ ...newItem, content_type: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              <div className="flex items-center gap-2">
                                <t.icon className={`h-4 w-4 ${t.color}`} />
                                {t.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Status</Label>
                      <Select
                        value={newItem.status}
                        onValueChange={(v) => setNewItem({ ...newItem, status: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={newItem.priority}
                        onValueChange={(v) => setNewItem({ ...newItem, priority: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Scheduled Date</Label>
                      <Input
                        type="date"
                        value={newItem.scheduled_date}
                        onChange={(e) => setNewItem({ ...newItem, scheduled_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Author</Label>
                    <Input
                      value={newItem.author_name}
                      onChange={(e) => setNewItem({ ...newItem, author_name: e.target.value })}
                      placeholder="Author name..."
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Brief description..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      value={newItem.tags}
                      onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                      placeholder="seo, marketing, content..."
                    />
                  </div>

                  <Button
                    onClick={handleCreate}
                    disabled={!newItem.title || createItem.isPending}
                    className="w-full"
                  >
                    {createItem.isPending ? "Creating..." : "Create Content Item"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {view === "calendar" ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: days[0].getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-28" />
                ))}

                {days.map((day) => {
                  const items = getItemsForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const today = isToday(day);

                  return (
                    <motion.div
                      key={day.toISOString()}
                      className={`h-28 border rounded-lg p-1 transition-colors ${
                        today
                          ? "border-primary bg-primary/5"
                          : isCurrentMonth
                          ? "border-border/50 bg-card/30 hover:bg-card/50"
                          : "border-transparent bg-muted/20"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedDate(day);
                        setNewItem({ ...newItem, scheduled_date: format(day, "yyyy-MM-dd") });
                        setIsCreateOpen(true);
                      }}
                    >
                      <div
                        className={`text-xs font-medium mb-1 ${
                          today ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {format(day, "d")}
                      </div>

                      <div className="space-y-0.5 overflow-hidden">
                        {items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-1 text-xs p-1 rounded bg-muted/50 truncate cursor-pointer hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingItem(item);
                            }}
                          >
                            {getContentTypeIcon(item.content_type)}
                            <span className="truncate">{item.title}</span>
                          </div>
                        ))}
                        {items.length > 3 && (
                          <div className="text-xs text-muted-foreground pl-1">
                            +{items.length - 3} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="kanban"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {statusOptions.map((status) => {
                  const isDropTarget = dragOverColumn === status.value && draggedItem?.status !== status.value;
                  
                  return (
                    <motion.div
                      key={status.value}
                      className={`rounded-lg p-3 min-h-[400px] transition-all duration-200 ${
                        isDropTarget
                          ? "bg-primary/20 ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "bg-muted/30"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOverColumn(status.value);
                      }}
                      onDragLeave={() => {
                        if (dragOverColumn === status.value) {
                          setDragOverColumn(null);
                        }
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDragEnd();
                      }}
                      animate={{
                        scale: isDropTarget ? 1.02 : 1,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={status.color}>
                          {status.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {groupedByStatus[status.value]?.length || 0}
                        </span>
                      </div>

                      {isDropTarget && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 40 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-2 border-2 border-dashed border-primary rounded-lg flex items-center justify-center text-xs text-primary"
                        >
                          Drop here to move to {status.label}
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        {(groupedByStatus[status.value] || []).map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            draggable
                            onDragStart={() => handleDragStart(item)}
                            onDragEnd={handleDragEnd}
                            whileDrag={{ 
                              scale: 1.05, 
                              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                              zIndex: 50,
                              cursor: "grabbing"
                            }}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
                              draggedItem?.id === item.id
                                ? "opacity-50 border-primary"
                                : "border-border/50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                {getContentTypeIcon(item.content_type)}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setEditingItem(item)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  {statusOptions.map((s) => (
                                    s.value !== item.status && (
                                      <DropdownMenuItem
                                        key={s.value}
                                        onClick={() => handleStatusChange(item.id, s.value)}
                                      >
                                        Move to {s.label}
                                      </DropdownMenuItem>
                                    )
                                  ))}
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => deleteItem.mutate(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <h4 className="font-medium text-sm mb-2 line-clamp-2">
                              {item.title}
                            </h4>

                            {item.description && (
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {item.description}
                              </p>
                            )}

                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.tags?.slice(0, 2).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs py-0"
                                >
                                  <Tag className="h-2 w-2 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              {item.scheduled_date && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {format(parseISO(item.scheduled_date), "MMM d")}
                                </span>
                              )}
                              {item.author_name && (
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {item.author_name}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2 border-dashed border"
                        onClick={() => {
                          setNewItem({ ...newItem, status: status.value });
                          setIsCreateOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Item Dialog */}
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Content Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={editingItem.status}
                      onValueChange={(v) =>
                        setEditingItem({ ...editingItem, status: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Scheduled Date</Label>
                    <Input
                      type="date"
                      value={editingItem.scheduled_date || ""}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, scheduled_date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingItem.description || ""}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      updateItem.mutate({
                        id: editingItem.id,
                        title: editingItem.title,
                        description: editingItem.description,
                        status: editingItem.status,
                        scheduled_date: editingItem.scheduled_date,
                      });
                      setEditingItem(null);
                    }}
                    disabled={updateItem.isPending}
                    className="flex-1"
                  >
                    {updateItem.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => {
                      deleteItem.mutate(editingItem.id);
                      setEditingItem(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContentCalendar;
