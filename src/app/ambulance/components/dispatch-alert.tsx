
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Clock, Siren, Check, X, FileText, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DispatchAlert({ dispatch, onAccept, onDecline, isReady }) {
    if (!dispatch) {
        return (
            <Card className="glassmorphism h-full flex flex-col items-center justify-center text-center glowing-shadow perspective-1000">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Awaiting Dispatch</CardTitle>
                    <CardDescription>{isReady ? "Ready and scanning for emergency requests..." : "Complete pre-trip checklist to go online."}</CardDescription>
                </CardHeader>
                <CardContent className="relative w-80 h-80 flex items-center justify-center transform-style-3d" style={{ transform: 'rotateX(60deg) scale(1.1)' }}>
                     <div className="absolute inset-0 radar-container"/>
                     <div className="absolute inset-0 radar-sweep"/>
                     <div className="radar-marker-center"/>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glassmorphism glowing-shadow border-primary shadow-primary/30">
            <CardHeader>
                <CardTitle className="text-primary text-3xl flex items-center gap-3"><Siren className="animate-pulse"/> New Emergency Dispatch!</CardTitle>
                <CardDescription>A new dispatch request requires your attention.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <InfoRow icon={User} label="Patient" value={`${dispatch.patientName}, ${dispatch.patientAge} ${dispatch.patientGender}`} />
                    <InfoRow icon={MapPin} label="Pickup Location" value={dispatch.pickupLocation} />
                    <InfoRow icon={Clock} label="ETA to Patient" value={`~${dispatch.etaToPatient} mins`} />
                    <InfoRow icon={HeartPulse} label="Reported Condition" value={dispatch.condition} />
                </div>
                <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg border border-border/50">
                    <p className="flex items-center gap-2 font-bold text-white"><FileText className="w-4 h-4 text-primary"/> Dispatch Notes</p> 
                    <p className="mt-1">{dispatch.notes}</p>
                </div>
            </CardContent>
            <CardFooter className="flex gap-4">
                <Button variant="destructive" className="flex-1" onClick={() => onDecline(dispatch.id)}><X className="mr-2"/>Decline</Button>
                <Button className="flex-1 glowing-shadow-interactive" onClick={() => onAccept(dispatch.id)} disabled={!isReady}>
                    <Check className="mr-2"/>Accept Dispatch
                </Button>
            </CardFooter>
        </Card>
    );
}

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 p-3 bg-background/30 rounded-lg">
        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold text-white text-md">{value}</p>
        </div>
    </div>
);
