
"use client";

import { Suspense } from 'react';
import { AmbulanceDashboard } from '@/app/ambulance/components/ambulance-dashboard';


export default function AmbulanceDashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><p className="text-lg text-gradient-glow animate-pulse">Loading AI Ambulance Command Center...</p></div>}>
      <AmbulanceDashboard />
    </Suspense>
  );
}
