'use client';
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  TrendingDown, 
  Calculator, 
  ArrowRight,
  PoundSterling,
  AlertTriangle
} from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RevenueLossCalculator: React.FC = () => {
  const [monthlyTraffic, setMonthlyTraffic] = useState(10000);
  const [conversionRate, setConversionRate] = useState(1.5);
  const [avgDealValue, setAvgDealValue] = useState(2500);
  const [showResult, setShowResult] = useState(false);

  const calculations = useMemo(() => {
    const currentConversions = monthlyTraffic * (conversionRate / 100);
    const currentMonthlyRevenue = currentConversions * avgDealValue;
    
    // Assume 50% improvement with a better website
    const improvedConversionRate = conversionRate * 1.5;
    const improvedConversions = monthlyTraffic * (improvedConversionRate / 100);
    const improvedMonthlyRevenue = improvedConversions * avgDealValue;
    
    const monthlyLoss = improvedMonthlyRevenue - currentMonthlyRevenue;
    const annualLoss = monthlyLoss * 12;

    return {
      currentConversions: Math.round(currentConversions),
      currentMonthlyRevenue,
      improvedConversions: Math.round(improvedConversions),
      improvedMonthlyRevenue,
      monthlyLoss,
      annualLoss,
    };
  }, [monthlyTraffic, conversionRate, avgDealValue]);

  // Generate 12-month chart data with cumulative loss
  const chartData = useMemo(() => {
    return MONTHS.map((month, index) => {
      const cumulativeCurrent = calculations.currentMonthlyRevenue * (index + 1);
      const cumulativeImproved = calculations.improvedMonthlyRevenue * (index + 1);
      const cumulativeLoss = cumulativeImproved - cumulativeCurrent;
      
      return {
        month,
        current: Math.round(cumulativeCurrent),
        potential: Math.round(cumulativeImproved),
        gap: Math.round(cumulativeLoss),
      };
    });
  }, [calculations]);

  const handleCalculate = () => {
    setShowResult(true);
    trackEvent("calculator_completed", {
      monthly_traffic: monthlyTraffic,
      conversion_rate: conversionRate,
      avg_deal_value: avgDealValue,
      annual_loss: calculations.annualLoss,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-GB").format(value);
  };

  const formatAxisValue = (value: number) => {
    if (value >= 1000000) {
      return `Â£${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `Â£${(value / 1000).toFixed(0)}k`;
    }
    return `Â£${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-xs text-accent">
              Potential: {formatCurrency(payload[0]?.value || 0)}
            </p>
            <p className="text-xs text-muted-foreground">
              Current: {formatCurrency(payload[1]?.value || 0)}
            </p>
            <p className="text-xs text-destructive font-medium">
              Gap: {formatCurrency(payload[2]?.value || 0)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-8 lg:p-12 border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4"
        >
          <Calculator className="h-8 w-8 text-destructive" />
        </motion.div>
        <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-2">
          Revenue Loss Calculator
        </h3>
        <p className="text-muted-foreground">
          See how much a poor website is really costing your business.
        </p>
      </div>

      <div className="space-y-8">
        {/* Monthly Traffic Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Monthly Website Visitors</Label>
            <span className="text-lg font-medium text-accent">
              {formatNumber(monthlyTraffic)}
            </span>
          </div>
          <Slider
            value={[monthlyTraffic]}
            onValueChange={(value) => {
              setMonthlyTraffic(value[0]);
              setShowResult(false);
            }}
            min={1000}
            max={100000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1k</span>
            <span>50k</span>
            <span>100k</span>
          </div>
        </div>

        {/* Conversion Rate Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-foreground">Current Conversion Rate</Label>
            <span className="text-lg font-medium text-accent">
              {conversionRate.toFixed(1)}%
            </span>
          </div>
          <Slider
            value={[conversionRate * 10]}
            onValueChange={(value) => {
              setConversionRate(value[0] / 10);
              setShowResult(false);
            }}
            min={1}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.1%</span>
            <span>2.5%</span>
            <span>5%</span>
          </div>
        </div>

        {/* Average Deal Value Input */}
        <div className="space-y-4">
          <Label className="text-foreground">Average Deal / Order Value (Â£)</Label>
          <div className="relative">
            <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              value={avgDealValue}
              onChange={(e) => {
                setAvgDealValue(Number(e.target.value) || 0);
                setShowResult(false);
              }}
              className="pl-10"
              min={0}
            />
          </div>
        </div>

        {/* Calculate Button */}
        {!showResult && (
          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full"
          >
            Calculate My Revenue Loss
            <Calculator className="ml-2 h-4 w-4" />
          </Button>
        )}

        {/* Results */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Current vs Improved */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Current Monthly Revenue</p>
                  <p className="text-2xl font-medium text-foreground">
                    {formatCurrency(calculations.currentMonthlyRevenue)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {calculations.currentConversions} conversions/month
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <p className="text-sm text-muted-foreground mb-1">Potential Monthly Revenue</p>
                  <p className="text-2xl font-medium text-accent">
                    {formatCurrency(calculations.improvedMonthlyRevenue)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {calculations.improvedConversions} conversions/month
                  </p>
                </div>
              </div>

              {/* 12-Month Revenue Gap Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 rounded-xl bg-muted/30 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-foreground">
                    12-Month Cumulative Revenue Gap
                  </h4>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Potential</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                      <span className="text-muted-foreground">Current</span>
                    </div>
                  </div>
                </div>
                <div className="h-[200px] sm:h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="potentialGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        dy={8}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        tickFormatter={formatAxisValue}
                        width={50}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="potential"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        fill="url(#potentialGradient)"
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                      <Area
                        type="monotone"
                        dataKey="current"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        fill="url(#currentGradient)"
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={300}
                      />
                      <Area
                        type="monotone"
                        dataKey="gap"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={0}
                        fill="url(#gapGradient)"
                        animationDuration={1500}
                        animationEasing="ease-out"
                        animationBegin={600}
                        style={{ display: 'none' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  The gap between the lines represents your missed revenue opportunity
                </p>
              </motion.div>

              {/* Annual Loss Reveal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="p-6 rounded-xl bg-destructive/10 border border-destructive/30 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-destructive mb-2">
                  <TrendingDown className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Annual Revenue You're Leaving on the Table
                  </span>
                </div>
                <motion.p
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", damping: 10 }}
                  className="text-4xl lg:text-5xl font-bold text-destructive"
                >
                  {formatCurrency(calculations.annualLoss)}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on a conservative 50% conversion rate improvement
                </p>
              </motion.div>

              {/* Warning */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              >
                <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium">Every month you wait costs you</p>
                  <p className="text-muted-foreground">
                    {formatCurrency(calculations.monthlyLoss)} in missed opportunities.
                  </p>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    trackEvent("calculator_cta_clicked", {
                      annual_loss: calculations.annualLoss,
                    });
                    window.location.href = "/free-seo-website-audit?source=revenue-calculator";
                  }}
                >
                  Stop Losing {formatCurrency(calculations.annualLoss)} Every Year
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default RevenueLossCalculator;


