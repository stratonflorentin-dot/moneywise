"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"
import { type Transaction } from "@/lib/data"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from "@/components/ui/chart"
import { formatCurrency } from "@/lib/utils";

interface SpendingByCategoryChartProps {
  data: Transaction[]
}

const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#f59e0b", // amber-500
  "#10b981", // emerald-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
];

export function SpendingByCategoryChart({ data }: SpendingByCategoryChartProps) {
  const chartData = React.useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    data.forEach(transaction => {
      if (transaction.type === 'expense') {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
      }
    });
    return Object.entries(categoryTotals).map(([category, total]) => ({
      name: category,
      value: total,
    }));
  }, [data]);

  const chartConfig = React.useMemo(() => {
      const config: ChartConfig = {};
      chartData.forEach((item, index) => {
          config[item.name] = {
              label: item.name,
              color: chartColors[index % chartColors.length]
          }
      });
      return config;
  }, [chartData]);


  if (chartData.length === 0) {
    return (
        <div className="flex h-96 w-full items-center justify-center">
            <p className="text-muted-foreground">No expense data to display.</p>
        </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-96 w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent
            formatter={(value) => `${formatCurrency(value as number)}`}
            nameKey="name" 
            hideLabel 
            />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius="50%"
          strokeWidth={2}
        >
             {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
