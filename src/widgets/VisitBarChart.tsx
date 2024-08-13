"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { getVisits } from "@/shared/api/visit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Дата",
    color: "#e2a836",
  },
} satisfies ChartConfig;
const daysValues = [5, 10, 15, 20, 25, 30];
export function VisitBarChart() {
  const [selectedDays, setSelectedDays] = useState(daysValues[0]);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["visitChart"],
    queryFn: async () => {
      const data = await getVisits(selectedDays);
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [selectedDays]);
  const t = useTranslations("admin.main");

  return (
    <Card className="w-[600px] min-h-[500px] h-auto ">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="flex h-40 justify-center items-center">
            <Loader2 className="animate-spin w-10 h-10 align-middle" />
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => {
                      return `${t("tooltip")} - ${value}`;
                    }}
                    indicator="dashed"
                  />
                }
              />
              <Bar dataKey="vizit" fill="var(--color-desktop)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
        <CardFooter className="flex flex-col gap-4 ">
          <span className="text-slate-500">{t("footer.btns")}</span>
          <div className="flex  gap-3 items-center">
            {daysValues.map((day) => (
              <button
                onClick={() => setSelectedDays(day)}
                className={clsx(
                  "min-w-4 px-2 py-1 bg-white border  rounded-md",
                  selectedDays == day && "bg-gray-950 font-bold text-white",
                )}
                key={day}
              >
                {day}{" "}
              </button>
            ))}
            <span className="text-slate-500">{t("footer.day")}</span>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
