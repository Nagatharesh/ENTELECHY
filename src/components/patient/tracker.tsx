
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/lib/dummy-data";

// In a real app, you would import firebase and firestore functions
// For now, we will simulate the firestore write.
// import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
// import { db } from "@/firebase";

export function Tracker({ patient }: { patient: Patient }) {
    const { toast } = useToast();

    const handlePress = () => {
        // Log the event to Firestore (simulated)
        console.log("TRACKER button pressed. Logging to Firestore (simulated)...");
        const clickData = {
            clickId: `click_${Date.now()}`,
            userId: patient.patientId,
            timestamp: new Date().toISOString() // In a real app: serverTimestamp()
        };
        console.log("Firestore Data:", clickData);
        
        // Simulate a successful write to Firestore
        toast({
            title: "Tracker Activated",
            description: "Your location is being shared for emergency assistance.",
        });

        // Open the external link
        window.open("https://www.figma.com/make/crWjCRxmwACXI47D1nwCGj/Forest-Emergency-Radar-App?node-id=0-1&p=f&t=eFCUXSXFSb4z09lx-0&fullscreen=1", "_blank", "noopener,noreferrer");
    };

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Activity className="w-10 h-10 text-primary" />
                        <CardTitle className="text-gradient-glow text-4xl font-orbitron">Tracker</CardTitle>
                    </div>
                </CardHeader>
                <div className="h-[40vh] flex items-center justify-center p-8">
                    <div className="relative group">
                         <div 
                            className="absolute -inset-1 bg-gradient-to-r from-secondary to-accent rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-glow-pulse"
                            style={{ animationDuration: '3s' }}
                        />
                        <Button 
                            onClick={handlePress}
                            className="relative w-48 h-48 rounded-full text-2xl font-bold text-white bg-gradient-to-br from-primary/80 to-secondary/80 border-2 border-primary/50 shadow-2xl shadow-primary/40 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-primary/80 group-active:scale-100"
                        >
                             <div className="absolute inset-0 rounded-full animate-ripple" style={{animationDuration: '1.5s'}} />
                            Scan and Get Help
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
