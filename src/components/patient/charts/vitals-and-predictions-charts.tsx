
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  RadialBar,
  RadialBarChart
} from "recharts";
import { addDays, format } from "date-fns";
import { Patient } from "@/lib/dummy-data";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type VitalsAndPredictionsProps = {
  vitals: Patient["vitals"];
  predictions: Patient["predictions"];
};

export function VitalsAndPredictionsCharts({ vitals, predictions }: VitalsAndPredictionsProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6));
  
  const chartData = last7Days.map((date, i) => {
    const systolic = parseInt(vitals.bloodPressure[i]?.split('/')[0] || '0');
    const diastolic = parseInt(vitals.bloodPressure[i]?.split('/')[1] || '0');
    const predSystolic = parseInt(predictions.vitalsNext7Days.bloodPressure[i]?.split('/')[0] || '0');
    
    return {
      date: format(date, "MMM d"),
      "Heart Rate": vitals.heartRate[i],
      "Blood Sugar": vitals.bloodSugar[i],
      "Systolic BP": systolic,
      "Predicted Heart Rate": predictions.vitalsNext7Days.heartRate[i],
      "Predicted Systolic BP": predSystolic
    };
  });
  
  const adherenceData = last7Days.map((date, i) => ({
    date: format(date, "MMM d"),
    "Adherence": predictions.medicationAdherence[i] * 100,
  }));

  const totalAppointmentProbability = Math.round((predictions.appointmentProbability.reduce((a,b) => a+b, 0) / predictions.appointmentProbability.length) * 100);


  const chartConfig = {
    "Heart Rate": { label: "Heart Rate", color: "hsl(var(--chart-1))" },
    "Predicted Heart Rate": { label: "Predicted HR", color: "hsl(var(--chart-1))" },
    "Systolic BP": { label: "Systolic BP", color: "hsl(var(--chart-2))" },
    "Predicted Systolic BP": { label: "Predicted BP", color: "hsl(var(--chart-2))" },
    "Blood Sugar": { label: "Blood Sugar", color: "hsl(var(--chart-3))" },
    "Adherence": { label: "Adherence", color: "hsl(var(--chart-4))" },
    "Probability": { label: "Probability", color: "hsl(var(--chart-5))" },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
          <CardHeader>
            <CardTitle className="text-gradient-glow text-lg">Vitals Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip
                              content={<ChartTooltipContent indicator="dot" />}
                              cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1.5, strokeDasharray: "3 3" }}
                              wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                          />
                          <Legend />
                          <defs>
                              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                                  <stop offset="100%" stopColor="hsl(var(--chart-2))" />
                              </linearGradient>
                              <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0">
                                  <stop offset="0%" stopColor="hsl(var(--chart-2))" />
                                  <stop offset="100%" stopColor="hsl(var(--chart-3))" />
                              </linearGradient>
                          </defs>
                          <Line yAxisId="left" type="monotone" dataKey="Heart Rate" stroke="url(#grad1)" strokeWidth={2.5} dot={{ r: 4, style: { fill: 'hsl(var(--chart-1))'} }} activeDot={{ r: 8, className: 'glowing-shadow' }} />
                          <Line yAxisId="left" type="monotone" dataKey="Predicted Heart Rate" stroke="hsl(var(--chart-1))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                          <Line yAxisId="right" type="monotone" dataKey="Systolic BP" stroke="url(#grad2)" strokeWidth={2.5} dot={{ r: 4, style: { fill: 'hsl(var(--chart-2))'} }} activeDot={{ r: 8, className: 'glowing-shadow' }} />
                          <Line yAxisId="right" type="monotone" dataKey="Predicted Systolic BP" stroke="hsl(var(--chart-2))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                  </ResponsiveContainer>
              </ChartContainer>
          </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-lg">Medication Adherence (Next 7 Days)</CardTitle>
                <CardDescription>AI prediction of patient's adherence to prescribed medication.</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" tickLine={false} axisLine={false}/>
                        <Tooltip
                            content={<ChartTooltipContent indicator="dot" />}
                            cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                        />
                        <defs>
                          <linearGradient id="adherenceBar" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
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
                <CardTitle className="text-gradient-glow text-lg">Appointment Forecast</CardTitle>
                <CardDescription>7-day average likelihood of requiring an appointment.</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] w-full flex items-center justify-center">
              <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square h-full"
              >
                  <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                          data={[{ name: "Probability", value: totalAppointmentProbability, fill: "url(#radialGradient)" }]}
                          startAngle={90}
                          endAngle={-270}
                          innerRadius="70%"
                          outerRadius="110%"
                          barSize={20}
                      >
                          <Tooltip
                            content={<ChartTooltipContent hideLabel nameKey="name" />}
                            cursor={false}
                            wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                          />
                           <defs>
                            <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                              <stop offset="0%" stopColor="hsl(var(--chart-5))" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                            </radialGradient>
                          </defs>
                          <RadialBar 
                            dataKey="value"
                            background={{ fill: "hsl(var(--muted) / 0.3)" }}
                          />
                           <text
                              x="50%"
                              y="50%"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-white text-4xl font-bold text-gradient-glow"
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
    </div>
  );
}
