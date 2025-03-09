"use client";

import { useId, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CustomTooltipContent } from "@/components/charts-extra";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const todayData = [
  { month: "Jan", value: 20040 },
  { month: "Feb", value: 42004 },
  { month: "Mar", value: 350000 },
  { month: "Apr", value: 28000 },
  { month: "May", value: 130000 },
  { month: "Jun", value: 19000 },
  { month: "Jul", value: 170000 },
  { month: "Aug", value: 19000 },
  { month: "Sep", value: 160000 },
  { month: "Oct", value: 190000 },
  { month: "Nov", value: 2200 },
  { month: "Dec", value: 300993 },
];

const last7DaysData = [
  { month: "Jan", value: 280000 },
  { month: "Feb", value: 420000 },
  { month: "Mar", value: 350000 },
  { month: "Apr", value: 280000 },
  { month: "May", value: 130000 },
  { month: "Jun", value: 190000 },
  { month: "Jul", value: 170000 },
  { month: "Aug", value: 190000 },
  { month: "Sep", value: 160000 },
  { month: "Oct", value: 190000 },
  { month: "Nov", value: 220000 },
  { month: "Dec", value: 300993 },
];

const last30DaysData = [
  { month: "Jan", value: 320000 },
  { month: "Feb", value: 410000 },
  { month: "Mar", value: 480000 },
  { month: "Apr", value: 510000 },
  { month: "May", value: 490000 },
  { month: "Jun", value: 540000 },
  { month: "Jul", value: 510000 },
  { month: "Aug", value: 200010 },
  { month: "Sep", value: 123340 },
  { month: "Oct", value: 304855 },
  { month: "Nov", value: 300424 },
  { month: "Dec", value: 700000 },
];

const chartConfig = {
  value: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const id = useId();
  const [selectedPeriod, setSelectedPeriod] = useState("last7days");

  const getChartData = () => {
    switch (selectedPeriod) {
      case "today":
        return todayData;
      case "last7days":
        return last7DaysData;
      case "last30days":
        return last30DaysData;
      default:
        return last7DaysData;
    }
  };

  const chartData = getChartData();

  const getDisplayValue = () => {
    switch (selectedPeriod) {
      case "today":
        return "₦120,000.00";
      case "last7days":
        return "₦490,000.00";
      case "last30days":
        return "₦124,590,000.00";
      default:
        return "₦0.00";
    }
  };

  return (
    <Card className="gap-4 bg-[#FAFAFA]">
      <CardHeader className="hidden md:flex md:pb-2">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-5">
            <div className="text-sm text-muted-foreground">
              Showing data for
            </div>
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              className="hidden md:block"
            />
          </div>
          <div className="hidden md:flex md:space-x-2">
            <Button
              variant={selectedPeriod === "today" ? "default" : "outline"}
              className={cn(
                selectedPeriod === "today" &&
                  "!bg-[#00C6FB0F]/20 text-black hover:!bg-[#00C6FB0F]/20",
              )}
              size="sm"
              onClick={() => setSelectedPeriod("today")}
            >
              Today
            </Button>
            <Button
              variant={selectedPeriod === "last7days" ? "default" : "outline"}
              className={cn(
                selectedPeriod === "last7days" &&
                  "!bg-[#00C6FB0F]/20 text-black hover:!bg-[#00C6FB0F]/20",
              )}
              size="sm"
              onClick={() => setSelectedPeriod("last7days")}
              data-testid="last7days-button"
            >
              Last 7 days
            </Button>
            <Button
              variant={selectedPeriod === "last30days" ? "default" : "outline"}
              className={cn(
                selectedPeriod === "last30days" &&
                  "!bg-[#00C6FB0F]/20 text-black hover:!bg-[#00C6FB0F]/20",
              )}
              size="sm"
              onClick={() => setSelectedPeriod("last30days")}
            >
              Last 30 days
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <Card className="space-y-5 rounded-md bg-white px-4 py-8 md:border md:p-8">
          <div className="">
            <div className="flex items-center justify-between space-y-0.5 md:block">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-muted-foreground">Revenue</p>
                <Badge className="pointer-events-none hidden border-none bg-transparent text-[#424242] md:block">
                  <span className="mr-1.5 text-emerald-500">+0.00% </span> vs
                  <span data-testid="vs-period">Last 7 days</span>
                </Badge>
              </div>
              <PeriodSelector
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
                className="md:hidden"
              />
              <div className="hidden items-center gap-2 md:flex">
                <div className="text-2xl font-semibold text-[#424242]">
                  {getDisplayValue()}
                </div>
                <p className="text-sm">in total value</p>
              </div>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[hsl(var(--chart-1))]/15"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              maxBarSize={20}
              margin={{ left: -12, right: 12, top: 12 }}
            >
              <defs>
                <linearGradient
                  id={`${id}-gradient`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                  <stop offset="100%" stopColor="var(--chart-2)" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#EDEDF2" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={12}
                stroke="#EDEDF2"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  value === 0 ? "$0" : `$${(value / 1000).toFixed(0)}K`
                }
              />
              <ChartTooltip
                content={
                  <CustomTooltipContent
                    colorMap={{
                      value: "hsl(var(--chart-1))",
                    }}
                    labelMap={{
                      value: "Revenue",
                    }}
                    dataKeys={["value"]}
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                }
              />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ChartContainer>
        </Card>
      </CardContent>
    </Card>
  );
}

interface PeriodSelectorProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  className?: string;
}

export function PeriodSelector({
  selectedPeriod,
  setSelectedPeriod,
  className,
}: PeriodSelectorProps) {
  return (
    <div className={cn("", className)}>
      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <SelectTrigger
          className="w-[140px] rounded-full md:rounded-md"
          data-testid="period-selector"
        >
          <SelectValue>
            {selectedPeriod === "today" && "Today"}
            {selectedPeriod === "last7days" && "Last 7 days"}
            {selectedPeriod === "last30days" && "Last 30 days"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today" data-testid="today-option">
            Today
          </SelectItem>
          <SelectItem value="last7days" data-testid="last7days-option">
            Last 7 days
          </SelectItem>
          <SelectItem value="last30days" data-testid="last30days-option">
            Last 30 days
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
