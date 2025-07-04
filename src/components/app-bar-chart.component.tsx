"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  { month: "Enero", clients: 186, sales: 80 },
  { month: "Febrero", clients: 150, sales: 30 },
  { month: "Marzo", clients: 237, sales: 120 },
  { month: "Abril", clients: 240, sales: 150 },
  { month: "Mayo", clients: 209, sales: 130 },
  { month: "Junio", clients: 220, sales: 90 },
];

const chartConfig = {
  clients: {
    label: "Clientes",
    color: "var(--chart-1)",
  },
  sales: {
    label: "Ventas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const ChartBarMultiple = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-semibold text-primary-foreground">Ganancias Totales</h2>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="clients" fill="var(--color-clients)" radius={4} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Tendencia a la alta por 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Mostrando el total de ventas de los últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
};

export default ChartBarMultiple