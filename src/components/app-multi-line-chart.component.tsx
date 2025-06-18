"use client"

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple line chart";

const chartData = [
  { month: "Enero", previous: 4, current: 2 },
  { month: "Febrero", previous: 8, current: 4 },
  { month: "Marzo", previous: 5, current: 6 },
  { month: "Abril", previous: 4, current: 3 },
  { month: "Mayo", previous: 6, current: 8 },
  { month: "Junio", previous: 4, current: 5 },
  { month: "Julio", previous: 2, current: 6 },
  { month: "Agosto", previous: 1, current: 3 },
  { month: "Septiembre", previous: 0, current: 4 },
  { month: "Octubre", previous: 3, current: 2 },
  { month: "Noviembre", previous: 5, current: 0 },
  { month: "Diciembre", previous: 8, current: 6 },
];

const chartConfig = {
  previous: {
    label: "2024",
    color: "var(--chart-1)",
  },
  current: {
    label: "2025",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const MultiLineChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Publicaciones</CardTitle>
        <CardDescription>Comparativa del 2024 al 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="current"
              type="monotone"
              stroke="var(--color-current)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="previous"
              type="monotone"
              stroke="var(--color-previous)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Tendencia al alza del 8.5% este año. <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Mostrando el total de publicaciones de los últimos 12 meses.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MultiLineChart;
