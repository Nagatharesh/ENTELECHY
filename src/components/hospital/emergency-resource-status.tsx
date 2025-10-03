
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BedDouble, User, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const triageConfig = {
    Critical: { color: 'bg-red-500 border-red-400', shadow: 'shadow-red-500/50' },
    Moderate: { color: 'bg-orange-500 border-orange-400', shadow: 'shadow-orange-500/50' },
    Minor: { color: 'bg-yellow-500 border-yellow-400', shadow: 'shadow-yellow-500/50' },
    Stable: { color: 'bg-green-500 border-green-400', shadow: 'shadow-green-500/50' },
    available: { color: 'bg-gray-500 border-gray-400', shadow: 'shadow-gray-500/50' },
    'in-use': { color: 'bg-blue-500 border-blue-400', shadow: 'shadow-blue-500/50' },
};

const Bed = ({ bed }) => {
    const config = triageConfig[bed.triage] || triageConfig[bed.status];

    const content = (
        <div className={cn("w-full h-full rounded flex items-center justify-center transition-all duration-300", config.color)}>
            <BedDouble className="w-6 h-6 text-white/80" />
        </div>
    );

    if (bed.status === 'available') {
        return <div className="w-12 h-20 rounded bg-green-500/10 border-2 border-dashed border-green-500/50 flex items-center justify-center"><BedDouble className="w-6 h-6 text-green-500/70" /></div>
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={cn("w-12 h-20 rounded border-2 cursor-pointer transform hover:scale-110", config.color, config.shadow)}>
                        {content}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="glassmorphism">
                    <p className="font-bold">{bed.bedId}</p>
                    <p><span className="font-semibold">Patient:</span> {bed.patient || 'N/A'}</p>
                    <p><span className="font-semibold">Status:</span> {bed.status}</p>
                    {bed.occupiedSince && <p><span className="font-semibold">Occupied:</span> {formatDistanceToNow(new Date(bed.occupiedSince), { addSuffix: true })}</p>}
                    <p><span className="font-semibold">Triage:</span> <span className={cn(config.color, 'p-1 rounded-sm')}>{bed.triage}</span></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export function EmergencyResourceStatus({ hospitalData }) {
    const { beds } = hospitalData.hospitalInfo;
    const wings = [...new Set(beds.map(b => b.wing))];

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Emergency Resource Status</CardTitle>
                    <CardDescription>Live 3D view of all patient beds, trauma rooms, and OR availability.</CardDescription>
                </CardHeader>
            </Card>

            <div className="p-8 glassmorphism rounded-lg perspective-1000">
                {wings.map(wing => (
                    <div key={wing} className="mb-8">
                        <h3 className="text-xl font-bold text-white mb-4">{wing} Wing</h3>
                        <div className="grid grid-cols-10 gap-6 transform-style-3d" style={{transform: 'rotateX(45deg)'}}>
                            {beds.filter(b => b.wing === wing).map(bed => (
                                <Bed key={bed.bedId} bed={bed} />
                            ))}
                        </div>
                    </div>
                ))}
                 <div className="mt-8 flex justify-center gap-4 text-sm">
                    {Object.entries(triageConfig).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className={cn("w-4 h-4 rounded-sm", value.color)}></div>
                            <span className="capitalize text-muted-foreground">{key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
