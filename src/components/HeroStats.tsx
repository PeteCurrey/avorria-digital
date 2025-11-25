import { Card, CardContent } from "@/components/ui/card";
interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}
const StatCard = ({
  value,
  label,
  delay = 0
}: StatCardProps) => {
  return <Card style={{
    animationDelay: `${delay}ms`
  }} className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 transition-all duration-300 animate-fade-in-up rounded-sm opacity-70">
      <CardContent className="p-6 text-center rounded-sm opacity-100">
        <div className="text-4xl font-light text-accent mb-2">{value}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
      </CardContent>
    </Card>;
};
const HeroStats = () => {
  const stats = [{
    value: "3.8x",
    label: "Average ROAS on paid campaigns"
  }, {
    value: "+41%",
    label: "Average increase in qualified leads"
  }, {
    value: "120+",
    label: "Websites & funnels built"
  }, {
    value: "98%",
    label: "Client retention on 12+ month retainers"
  }];
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((stat, index) => <StatCard key={index} value={stat.value} label={stat.label} delay={index * 100} />)}
    </div>;
};
export default HeroStats;