import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonRow {
  category: string;
  avorria: string;
  typical: string;
  avorriaPositive: boolean;
}

const comparisons: ComparisonRow[] = [
  {
    category: 'Strategy',
    avorria: 'Revenue-first planning with clear CPL/ROAS targets',
    typical: 'Vague goals and channel-first thinking',
    avorriaPositive: true,
  },
  {
    category: 'Execution',
    avorria: 'Senior-led, no handoffs to juniors mid-project',
    typical: 'Sold by seniors, delivered by grads',
    avorriaPositive: true,
  },
  {
    category: 'Reporting',
    avorria: 'Live dashboards with commercial metrics that matter',
    typical: 'Monthly PDFs full of vanity metrics',
    avorriaPositive: true,
  },
  {
    category: 'Results',
    avorria: 'Tied to pipeline and revenue, not impressions',
    typical: 'Traffic reports with no attribution',
    avorriaPositive: true,
  },
  {
    category: 'Communication',
    avorria: 'Direct Slack/Teams access, same-day responses',
    typical: 'Ticket systems and 48hr SLAs',
    avorriaPositive: true,
  },
  {
    category: 'Contracts',
    avorria: '90-day rolling, earn your place every quarter',
    typical: '12-month lock-ins with break fees',
    avorriaPositive: true,
  },
];

const ServiceComparisonGrid: React.FC = () => {
  return (
    <section id="comparison" className="py-24 md:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-4">
            Why Avorria vs. the rest?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not the cheapest. But here's why clients stay.
          </p>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-border">
          {/* Header */}
          <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
            <div className="p-4 md:p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </div>
            <div className="p-4 md:p-6 text-sm font-medium text-accent uppercase tracking-wider text-center border-x border-border">
              Avorria
            </div>
            <div className="p-4 md:p-6 text-sm font-medium text-muted-foreground uppercase tracking-wider text-center">
              Typical Agency
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                'grid grid-cols-3 group hover:bg-muted/30 transition-colors',
                index < comparisons.length - 1 && 'border-b border-border'
              )}
            >
              <div className="p-4 md:p-6 flex items-center">
                <span className="font-medium text-foreground">{row.category}</span>
              </div>
              <div className="p-4 md:p-6 border-x border-border bg-accent/5 group-hover:bg-accent/10 transition-colors">
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                  </motion.div>
                  <span className="text-sm text-foreground">{row.avorria}</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  >
                    <X className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                  </motion.div>
                  <span className="text-sm text-muted-foreground">{row.typical}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceComparisonGrid;
