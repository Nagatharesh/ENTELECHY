"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, TestTube, Pill, Microscope, Upload, Bot } from "lucide-react";
import { Patient, dummyDoctors, dummyMedicines } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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
    ...patient.prescriptions.map(p => ({ ...p, type: 'Prescription' })),
    ...patient.radiologyReports.map(r => ({ ...r, type: 'Radiology', details: r.summary }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{title: string, content: string} | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      toast({
        title: "AI Analysis in Progress",
        description: "Your scan is being analyzed by SUPREME ASI...",
      });
      // Simulate AI analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        const isSkin = file.type.includes('image');
        setAnalysisResult({
          title: isSkin ? "AI Skin Analysis Complete" : "AI Radiology Analysis Complete",
          content: isSkin 
            ? "Condition detected: Mild Eczema. Recommendation: Apply moisturizer daily. Suggested dermatologist: Dr. SkinGood. "
            : "Findings: No acute abnormalities detected. Minor degenerative changes noted in the lumbar spine. Recommendation: Follow up with an orthopedic specialist. Suggested specialist: Dr. Alok Gupta."
        });
        toast({
          title: "Analysis Complete!",
          description: "The AI-generated summary is available.",
        });
      }, 3000);
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
                                    <span className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString('en-GB')}</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{record.details}</p>
                                <p className="text-xs mt-1 text-muted-foreground/50">
                                    with {getDoctorName((record as MedicalRecord).doctorId || (record as Prescription).doctorId || 'DOC-001')}
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
                                                 <Image src={(record as RadiologyReport).imageUrl} alt="Radiology Scan" layout="fill" objectFit="contain" />
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
        </div>
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">AI Scan Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary/50 rounded-lg text-center bg-primary/5">
                        <Upload className="w-12 h-12 text-primary/70 mb-4" />
                        <h3 className="text-white font-semibold">Upload Scan or Photo</h3>
                        <p className="text-xs text-muted-foreground mb-4">Drag & drop or click to upload</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept="image/*,application/dicom" />
                        <Button variant="secondary" size="sm" className="pointer-events-none">Choose File</Button>
                    </div>

                    {(isAnalyzing || analysisResult) && (
                        <div className="mt-6">
                            {isAnalyzing && (
                                <div className="flex items-center gap-4 text-white">
                                    <Bot className="w-8 h-8 text-primary animate-spin"/>
                                    <p>SUPREME ASI is analyzing your scan...</p>
                                </div>
                            )}
                            {analysisResult && (
                                <Card className="bg-background/50">
                                    <CardHeader>
                                        <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot className="w-5 h-5"/> {analysisResult.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{analysisResult.content}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
