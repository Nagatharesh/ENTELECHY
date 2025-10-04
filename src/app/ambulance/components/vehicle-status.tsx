
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fuel, Droplets, ShieldCheck, Wrench, Bot, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const getStatusConfig = (value: number) => {
    if (value > 75) return { color: "text-green-400", label: "Optimal" };
    if (value > 40) return { color: "text-yellow-400", label: "Good" };
    if (value > 20) return { color: "text-orange-400", label: "Low" };
    return { color: "text-destructive", label: "Critical" };
};

const getEngineStatusConfig = (status: string) => {
    if (status === "Healthy") return { color: "text-green-400", label: "Healthy" };
    return { color: "text-yellow-400", label: "Check Soon" };
};

const getKitStatusConfig = (isStocked: boolean) => {
    if (isStocked) return { color: "text-green-400", label: "Stocked" };
    return { color: "text-destructive", label: "Needs Refill" };
};

export function VehicleStatus({ ambulance, readinessScore }) {
    const fuelStatus = getStatusConfig(ambulance.fuelLevel);
    const oxygenStatus = getStatusConfig(ambulance.oxygenLevel);
    const engineStatus = getEngineStatusConfig("Healthy"); // Assuming healthy for demo
    const kitStatus = getKitStatusConfig(ambulance.facilities.emergencyKit);

    const isReady = readinessScore > 70;

    return (
        <Card className="glassmorphism glowing-shadow">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Gauge/>Vehicle Diagnostics</CardTitle>
                <CardDescription>Live status of all critical systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
                <StatusItem 
                    icon={Fuel} 
                    label="Fuel Level" 
                    value={`${ambulance.fuelLevel}%`}
                    statusConfig={fuelStatus}
                />
                <StatusItem 
                    icon={Droplets} 
                    label="Oxygen Supply" 
                    value={`${ambulance.oxygenLevel}%`}
                    statusConfig={oxygenStatus}
                />
                <StatusItem 
                    icon={Wrench} 
                    label="Engine Status" 
                    value={engineStatus.label}
                    statusConfig={engineStatus}
                    isBadge
                />
                 <StatusItem 
                    icon={ShieldCheck} 
                    label="Medical Kit" 
                    value={kitStatus.label}
                    statusConfig={kitStatus}
                    isBadge
                />

                <div className={cn(
                    "p-3 rounded-lg text-center font-bold text-lg border",
                    isReady ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-destructive/10 text-destructive border-destructive/30"
                )}>
                    <Bot className="inline-block w-5 h-5 mr-2"/>
                    AI Readiness: {readinessScore.toFixed(0)}%
                </div>
            </CardContent>
        </Card>
    );
}

const StatusItem = ({ icon: Icon, label, value, statusConfig, isBadge = false }) => (
    <div className="flex items-center gap-4">
        <div className={cn("p-2 rounded-full", isBadge ? 'bg-background/30' : statusConfig.color.replace('text-', 'bg-') + '/10')}>
            <Icon className={cn("w-6 h-6", statusConfig.color)} />
        </div>
        <div className="flex-grow">
            <p className="font-medium text-white">{label}</p>
        </div>
        <div className={cn("font-semibold text-lg", statusConfig.color)}>{value}</div>
    </div>
);
