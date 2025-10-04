
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Map, Bot, Route, AlertCircle, CheckCircle, User, Star, TrendingUp, HelpCircle, Phone, WifiOff, XCircle, Car, Ambulance, Heart, Droplet, Wind } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


const DriverInfoCard = ({ driver }) => {
    if (!driver) return null;
    return (
        <Card className="glassmorphism p-4">
            <CardHeader className="p-0 mb-4 flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Driver Profile</CardTitle>
                <Button size="sm" variant="outline" asChild><a href={`tel:${driver.contact}`}><Phone/></a></Button>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                <StatBar icon={User} label="Name" value={driver.name} />
                <StatBar icon={TrendingUp} label="Experience" value={`${driver.experience} years`} />
                <StatBar icon={Car} label="Completed Rides" value={driver.completedRides} />
                <StatBar icon={Star} label="Rating" value={`${driver.rating}/5`} isRating />
            </CardContent>
        </Card>
    );
};

const PatientVitalsCard = ({ vitals }) => {
    return (
        <Card className="glassmorphism p-4">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-white text-lg">Live Patient Vitals</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
                 <StatBar icon={Heart} label="Heart Rate" value={`${vitals.hr} bpm`} />
                 <StatBar icon={Droplet} label="Blood Pressure" value={`${vitals.bp}`} />
                 <StatBar icon={Wind} label="SpO2" value={`${vitals.spo2}%`} />
            </CardContent>
        </Card>
    );
};


const StatBar = ({ icon: Icon, label, value, isRating=false }) => (
    <div>
        <div className="flex justify-between items-center text-sm mb-1">
            <p className="text-muted-foreground flex items-center gap-2"><Icon className="w-4 h-4" />{label}</p>
            {isRating ? (
                <div className="flex items-center gap-1 font-bold text-yellow-400">
                    <Star className="w-4 h-4 fill-current"/>{value}
                </div>
            ) : (
                <p className="font-semibold text-white">{value}</p>
            )}
        </div>
    </div>
);


export function LiveNavigation({ dispatch, onComplete }) {
    const [eta, setEta] = useState(dispatch.etaToPatient);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalDuration = dispatch.etaToPatient * 60; // in seconds
        let elapsedTime = 0;

        const interval = setInterval(() => {
            setEta(prev => Math.max(0, prev - (1/60)));
            
            elapsedTime++;
            const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
            setProgress(newProgress);
            
            if(newProgress >= 100){
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch.etaToPatient]);

    const formatTime = (minutes: number) => {
        const mins = Math.floor(minutes);
        const secs = Math.round((minutes - mins) * 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-gradient-glow text-2xl">Live Navigation & Patient Monitoring</CardTitle>
                <CardDescription>Navigating to: <span className="text-white font-bold">{dispatch.destination}</span> for patient <span className="text-white font-bold">{dispatch.patientName}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-96 bg-background/50 rounded-lg overflow-hidden border border-primary/20 perspective-1000">
                     <div className="absolute inset-0 bg-grid-primary/[0.1]"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    <div className="absolute top-4 left-4 glassmorphism p-2 rounded-lg z-10">
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="text-2xl font-bold text-white">{formatTime(eta)}</p>
                    </div>

                     <div className="absolute top-4 right-4 glassmorphism p-2 rounded-lg z-10 text-right">
                        <p className="text-sm text-muted-foreground">AI Suggestion</p>
                        <p className="text-md font-bold text-primary">Traffic moderate, stay on route</p>
                    </div>


                    <div className="absolute bottom-4 left-4 right-4 z-10">
                        <Progress value={progress} />
                    </div>

                    <div 
                        className="absolute inset-0 flex items-center justify-center transform-style-3d"
                        style={{ transform: 'rotateX(75deg) scale(1.5)'}}
                    >
                       <div className="relative w-96 h-96">
                            {/* Road lines */}
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute h-16 w-1 bg-primary/30 rounded-full"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transformOrigin: 'top center',
                                        animation: `road-line-anim ${2 - i * 0.3}s linear infinite`,
                                    }}
                                />
                            ))}

                            {/* Destination */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-dashed border-destructive flex items-center justify-center">
                                 <div className="w-3 h-3 bg-destructive rounded-full animate-ping"/>
                            </div>

                             {/* Ambulance */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                <Ambulance className="w-8 h-8 text-primary" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}}/>
                            </div>
                       </div>
                    </div>


                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-primary font-bold bg-background/50 px-4 py-1 rounded-full text-sm z-10">
                        Live 3D Tracking Simulation
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <DriverInfoCard driver={dispatch.driver} />
                    <PatientVitalsCard vitals={dispatch.patientVitals} />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full glowing-shadow-interactive" onClick={onComplete}>
                    <CheckCircle className="mr-2" /> Mark Trip as Complete
                </Button>
            </CardFooter>
            <style jsx>{`
                @keyframes road-line-anim {
                    from {
                        transform: translateX(-50%) translateY(-50%) scaleY(0) scaleX(0.5);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(-50%) translateY(-50%) scaleY(15) scaleX(1);
                        opacity: 0;
                    }
                }
            `}</style>
        </Card>
    );
}
