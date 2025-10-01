"use client";

import { Patient } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { VitalsChart } from "./vitals-chart";
import { PredictionCharts } from "./prediction-charts";
import { HealthSnapshot } from "./health-snapshot";

export function VitalsAndPredictions({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-6">
      <HealthSnapshot vitals={patient.vitals} />
      <Card className="glassmorphism p-4 md:p-6 glowing-shadow">
          <VitalsChart vitals={patient.vitals} predictions={patient.predictions.vitalsNext7Days} />
      </Card>
      <PredictionCharts predictions={patient.predictions} />
    </div>
  );
}
