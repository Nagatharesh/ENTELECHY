
"use client";

import { Patient } from "@/lib/dummy-data";
import { Card, CardContent } from "@/components/ui/card";
import { HealthSnapshot } from "./health-snapshot";
import { VitalsAndPredictionsCharts } from "./charts/vitals-and-predictions-charts";

export function VitalsAndPredictions({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-6">
      <HealthSnapshot vitals={patient.vitals} />
      <VitalsAndPredictionsCharts vitals={patient.vitals} predictions={patient.predictions} />
    </div>
  );
}
