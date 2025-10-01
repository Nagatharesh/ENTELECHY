"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Bot, PlusCircle } from "lucide-react";
import { Patient, dummyDoctors, dummyHospitals } from "@/lib/dummy-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Appointments = Patient["appointments"];

const getDoctorName = (doctorId: string) => {
  return dummyDoctors.find(d => d.doctorId === doctorId)?.name || "Unknown Doctor";
}

const getHospitalName = (hospitalId: string) => {
  return dummyHospitals.find(h => h.hospitalId === hospitalId)?.name || "Unknown Hospital";
}

export function Appointments({ patient }: { patient: Patient }) {
  const sortedAppointments = [...patient.appointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // AI-powered suggestion
  const suggestedDoctor = dummyDoctors.find(d => d.specialty === "Cardiologist");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card className="glassmorphism glowing-shadow h-full">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {sortedAppointments.length > 0 ? sortedAppointments.map((appt) => (
                        <div
                        key={appt.appointmentId}
                        className={cn(
                            "p-4 rounded-lg flex items-start gap-4 transition-all duration-300",
                            appt.urgent ? "bg-destructive/10 border-l-4 border-destructive" : "bg-card/50"
                        )}
                        >
                        <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
                            <Calendar className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold text-white text-lg">{getDoctorName(appt.doctorId)}</p>
                            <p className="text-sm text-muted-foreground">{getHospitalName(appt.hospitalId)}</p>
                            <div className="flex items-center gap-2 text-sm text-primary mt-2">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                        {appt.urgent && <Badge variant="destructive">Urgent</Badge>}
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center py-8">No upcoming appointments.</p>
                    )}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot className="w-6 h-6"/> AI Suggestion</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-muted-foreground">Based on your recent vitals, we recommend a consultation with a cardiologist.</p>
                   <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                       <p className="font-bold text-white">{suggestedDoctor?.name}</p>
                       <p className="text-xs text-muted-foreground">{suggestedDoctor?.specialty}</p>
                       <Button size="sm" className="w-full mt-3 glowing-shadow-interactive"><PlusCircle className="mr-2"/>Book Now</Button>
                   </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
