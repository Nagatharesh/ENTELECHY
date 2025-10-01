
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, QrCode, ClipboardList, Download } from "lucide-react";
import { Patient } from "@/lib/dummy-data";

export function QuickActions({ patient, onAmbulanceClick }: { patient: Patient, onAmbulanceClick: () => void }) {
  
  const handleDownload = () => {
    // In a real app, this would trigger an API call to a backend service
    // that generates and returns a PDF, JSON, or TXT file.
    // For this prototype, we can simulate a JSON download.
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(patient, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `medical_records_${patient.patientId}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <Card className="glassmorphism glowing-shadow">
      <CardHeader>
        <CardTitle className="text-gradient-glow">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button onClick={onAmbulanceClick} variant="destructive" className="h-24 flex flex-col gap-2 glowing-shadow-interactive transition-transform hover:scale-105">
          <Ambulance className="w-8 h-8 animate-[pulse_1.5s_ease-in-out_infinite]" />
          <span>Request Ambulance</span>
        </Button>
        <a href={`tel:${patient.emergencyContact.phone}`} className="w-full h-full">
            <Button variant="secondary" className="h-24 w-full flex flex-col gap-2 glowing-shadow-interactive transition-transform hover:scale-105">
                <Phone className="w-8 h-8" />
                <span>Call Emergency</span>
            </Button>
        </a>
        <Button variant="outline" className="h-24 flex flex-col gap-2 glowing-shadow-interactive transition-transform hover:scale-105" onClick={handleDownload}>
          <Download className="w-8 h-8" />
          <span>Download Records</span>
        </Button>
        <Button variant="outline" className="h-24 flex flex-col gap-2 glowing-shadow-interactive transition-transform hover:scale-105">
          <ClipboardList className="w-8 h-8" />
          <span>Prescriptions</span>
        </Button>
      </CardContent>
    </Card>
  );
}
