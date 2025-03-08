"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const DynamicRevenueChart = dynamic(
  () => import("@/components/revenue-chart").then((mod) => mod.RevenueChart),
  {
    loading: () => (
      <Skeleton className="h-[400px] w-full rounded-lg md:h-[500px]" />
    ),
    ssr: false,
  },
);

export { DynamicRevenueChart };
