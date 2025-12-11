import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterState {
  sector: string;
  service: string;
  outcome: string;
  year: string;
}

interface CaseFilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  options: {
    sectors: string[];
    services: string[];
    outcomes: { value: string; label: string }[];
    years: number[];
  };
  resultCount: number;
}

export const CaseFilterBar = ({
  filters,
  onFilterChange,
  onClearFilters,
  options,
  resultCount,
}: CaseFilterBarProps) => {
  const hasActiveFilters = Object.values(filters).some((v) => v !== "all");

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-40 py-4 px-6 bg-[hsl(220,25%,8%)/0.95] backdrop-blur-xl border-b border-white/10"
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Icon */}
          <div className="flex items-center gap-2 text-white/60">
            <Filter size={18} />
            <span className="text-sm font-medium hidden sm:inline">Filter by</span>
          </div>

          {/* Industry/Sector */}
          <Select
            value={filters.sector}
            onValueChange={(value) => onFilterChange("sector", value)}
          >
            <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {options.sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Service */}
          <Select
            value={filters.service}
            onValueChange={(value) => onFilterChange("service", value)}
          >
            <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {options.services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Outcome */}
          <Select
            value={filters.outcome}
            onValueChange={(value) => onFilterChange("outcome", value)}
          >
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              {options.outcomes.map((outcome) => (
                <SelectItem key={outcome.value} value={outcome.value}>
                  {outcome.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Select
            value={filters.year}
            onValueChange={(value) => onFilterChange("year", value)}
          >
            <SelectTrigger className="w-[120px] bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {options.years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X size={16} className="mr-1" />
              Clear
            </Button>
          )}

          {/* Result Count */}
          <div className="ml-auto text-sm text-white/50">
            {resultCount} {resultCount === 1 ? "project" : "projects"}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
