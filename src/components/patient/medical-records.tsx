
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, TestTube, Pill, Microscope } from "lucide-react";
import { Patient, dummyDoctors, dummyMedicines } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

type MedicalRecord = Patient["medicalRecords"][0];
type Prescription = Patient["prescriptions"][0];
type RadiologyReport = Patient["radiologyReports"][0];

const RecordIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case "consultation": return <FileText className="w-5 h-5 text-primary" />;
        case "lab test": return <TestTube className="w-5 h-5 text-secondary" />;
        case "prescription": return <Pill className="w-5 h-5 text-tertiary" />;
        case "procedure":
        case "surgery": return <Microscope className="w-5 h-5 text-accent" />;
        case "radiology":
        case "ultrasound":
        case "x-ray":
        case "mri": return <Microscope className="w-5 h-5 text-yellow-400" />;
        default: return <FileText className="w-5 h-5 text-primary" />;
    }
}

const getDoctorName = (doctorId: string) => {
  return dummyDoctors.find(d => d.doctorId === doctorId)?.name || "Unknown Doctor";
}

const getMedicineDetails = (medicineId: string) => {
    return dummyMedicines.find(m => m.medicineId === medicineId);
}

export function MedicalRecords({ patient }: { patient: Patient }) {
  const allRecords = [
    ...patient.medicalRecords,
    ...patient.prescriptions.map(p => ({ ...p, type: 'Prescription', details: `Prescription from ${getDoctorName(p.doctorId)}` })),
    ...patient.radiologyReports.map(r => ({ ...r, type: 'Radiology', details: r.summary }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="glassmorphism glowing-shadow h-full">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Medical History</CardTitle>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="relative pl-6">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                
                {allRecords.map((record, index) => (
                <div key={index} className="mb-8 relative">
                    <div className="absolute left-8 -translate-x-1/2 mt-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background z-10 animate-pulse"></div>
                    <div className="ml-8">
                        <div className="flex items-center gap-3">
                            <RecordIcon type={record.type} />
                            <p className="text-sm font-semibold text-white">{record.type}</p>
                            <span className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{record.details}</p>
                        <p className="text-xs mt-1 text-muted-foreground/50">
                            with {getDoctorName((record as any).doctorId || 'DOC-001')}
                        </p>
                        
                        {(record.type === 'Prescription' && (record as any).medicines) && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="px-0 h-auto text-primary">View Prescription</Button>
                                </DialogTrigger>
                                <DialogContent className="glassmorphism">
                                    <DialogHeader>
                                        <DialogTitle className="text-gradient-glow">Prescription Details</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        {(record as any).medicines.map((med: any, i: number) => {
                                            const medDetails = getMedicineDetails(med.medicineId);
                                            return (
                                                <div key={i} className="p-2 rounded-md bg-card/50">
                                                    <p className="font-bold text-white">{medDetails?.name}</p>
                                                    <p className="text-sm text-muted-foreground">{medDetails?.composition}</p>
                                                    <p className="text-xs text-muted-foreground/80">Dosage: {med.dosage}</p>
                                                    <div className="flex justify-between text-xs mt-2">
                                                        <span>Govt Cost: ₹{medDetails?.costGovt}</span>
                                                        <span>Private Cost: ₹{medDetails?.costPrivate}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}

                        {(record.type === 'Radiology' && (record as RadiologyReport).imageUrl) && (
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" className="px-0 h-auto text-primary">View Report</Button>
                                </DialogTrigger>
                                <DialogContent className="glassmorphism">
                                    <DialogHeader>
                                        <DialogTitle className="text-gradient-glow">Radiology Report</DialogTitle>
                                    </DialogHeader>
                                    <div className="relative w-full aspect-video rounded-md overflow-hidden mt-4">
                                         <Image src={(record as RadiologyReport).imageUrl} alt="Radiology Scan" fill objectFit="contain" />
                                    </div>
                                    <p className="mt-4 text-white"><strong>AI Summary: </strong>{(record as RadiologyReport).summary}</p>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
                ))}
            </div>
            </ScrollArea>
        </CardContent>
    </Card>
  );
}
