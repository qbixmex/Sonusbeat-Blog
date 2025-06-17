"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { TrendingUp } from "lucide-react";

export const description = "A multiple bar chart";

const chartData = [
  { month: "Enero", current: 1250, previous: 1322 },
  { month: "Febrero", current: 1375, previous: 950 },
  { month: "Marzo", current: 1800, previous: 921 },
  { month: "Abril", current: 1755, previous: 1575 },
  { month: "Mayo", current: 1500, previous: 1221 },
  { month: "Junio", current: 1850, previous: 1205 },
];

const chartConfig = {
  current: {
    label: "Current",
    color: "var(--chart-4)",
  },
  previous: {
    label: "Previous",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const AppAreaChart = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-semibold text-primary">Visitantes Totales</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelClassName="text-blue-500"
                  className="w-[140px]"
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="current"
              type="natural"
              fill="var(--color-current)"
              fillOpacity={0.4}
              stroke="var(--color-current)"
              stackId="a"
            />
            <Area
              dataKey="previous"
              type="natural"
              fill="var(--color-previous)"
              fillOpacity={0.4}
              stroke="var(--color-previous)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Tendencia a la alta por 8.5% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando el total de visitantes de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
};

export default AppAreaChart