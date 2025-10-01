
"use client";

import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { addDays, format } from "date-fns";
import { Patient } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

type Predictions = Patient["predictions"];

export function PredictionCharts({ predictions }: { predictions: Predictions }) {
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  
  const adherenceData = next7Days.map((date, i) => ({
    date: format(date, "MMM d"),
    "Adherence": predictions.medicationAdherence[i] * 100,
  }));

  const appointmentData = next7Days.map((date, i) => ({
    date: format(date, "MMM d"),
    "Probability": predictions.appointmentProbability[i] * 100,
  }));
  
  const totalAppointmentProbability = Math.round((predictions.appointmentProbability.reduce((a,b) => a+b, 0) / predictions.appointmentProbability.length) * 100);

  const chartConfig = {
    Adherence: {
      label: "Adherence",
      color: "hsl(var(--chart-4))",
    },
    Probability: {
      label: "Probability",
      color: "hsl(var(--chart-5))",
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-lg">Medication Adherence (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                        <Tooltip
                            content={<ChartTooltipContent indicator="dot" />}
                            cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                        />
                        <defs>
                          <linearGradient id="adherenceBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <Bar dataKey="Adherence" fill="url(#adherenceBar)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-lg">Appointment Probability (7-Day Avg)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px] w-full flex items-center justify-center">
              <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square h-full"
              >
                  <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                          data={[{ name: "Probability", value: totalAppointmentProbability, fill: "hsl(var(--chart-5))" }]}
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="70%"
                          outerRadius="100%"
                          barSize={20}
                      >
                          <Tooltip
                            content={<ChartTooltipContent hideLabel nameKey="name" />}
                            cursor={false}
                          />
                           <defs>
                            <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                              <stop offset="0%" stopColor="hsl(var(--chart-5))" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="hsl(var(--chart-5))" stopOpacity="0.3" />
                            </radialGradient>
                          </defs>
                          <RadialBar 
                            dataKey="value"
                            background={{ fill: "hsl(var(--muted) / 0.5)" }}
                            fill="url(#radialGradient)"
                          />
                           <text
                              x="50%"
                              y="50%"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-white text-4xl font-bold"
                            >
                              {totalAppointmentProbability.toFixed(0)}%
                            </text>
                            <text
                              x="50%"
                              y="65%"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-muted-foreground text-sm"
                            >
                              Avg. Likelihood
                            </text>
                      </RadialBarChart>
                  </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
        </Card>
    </div>
  );
}
