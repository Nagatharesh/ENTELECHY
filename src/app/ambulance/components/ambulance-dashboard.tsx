
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { dummyAmbulances } from '@/lib/dummy-data';
import { Button } from '@/components/ui/button';
import { LogOut, Siren } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const chartConfig = {
  value: { label: "Value" },
} satisfies ChartConfig;

// Minimalist chart for readiness
const ReadinessChart = ({ readinessScore }) => (
    <Card className="glassmorphism w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Vehicle Readiness</CardTitle>
        </CardHeader>
        <CardContent className="h-[150px] w-full flex items-center justify-center">
            <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ name: 'Readiness', value: readinessScore }]}>
                        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--primary)/0.1)' }} />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
);

// Minimalist chart for oxygen level
const OxygenChart = ({ oxygenLevel }) => (
    <Card className="glassmorphism w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-gradient-glow">Live Oxygen Level</CardTitle>
        </CardHeader>
        <CardContent className="h-[150px] w-full flex items-center justify-center">
             <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ name: 'Oxygen', value: oxygenLevel }]}>
                        <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} stroke="hsl(var(--foreground))" fontSize={12} />
                        <Tooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--secondary)/0.1)' }} />
                        <Bar dataKey="value" fill="hsl(var(--secondary))" radius={4} barSize={60} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </CardContent>
    </Card>
);


export function AmbulanceDashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const ambulanceId = searchParams.get('id');

    const [ambulance, setAmbulance] = useState<any>(null);
    const [oxygenLevel, setOxygenLevel] = useState(0);

    useEffect(() => {
        const foundAmbulance = dummyAmbulances.find(a => a.id === ambulanceId);
        setAmbulance(foundAmbulance);
        if (foundAmbulance) {
            setOxygenLevel(foundAmbulance.oxygenLevel);
        }
    }, [ambulanceId]);

    // Simulate real-time oxygen level changes
    useEffect(() => {
        const interval = setInterval(() => {
            setOxygenLevel(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 2)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (!ambulance) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h2 className="text-2xl font-bold text-destructive mb-4">Ambulance Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">The ambulance ID provided does not exist. Please login again.</p>
                <Button asChild>
                  <Link href="/login?role=ambulance">Return to Login</Link>
                </Button>
            </div>
        );
    }
    
    // Simplified readiness score
    const readinessScore = ((ambulance.fuelLevel / 100) * 0.5 + (oxygenLevel / 100) * 0.5) * 100;

    return (
        <div className="min-h-screen bg-background text-white p-4 space-y-6 flex flex-col">
            <header className="flex justify-between items-center">
                 <Link href="/home">
                    <Logo />
                 </Link>
                <div className='text-center'>
                    <h1 className="text-2xl font-bold text-gradient-glow">{ambulance.driver_name} - {ambulance.vehicle_no}</h1>
                    <p className="text-muted-foreground">AI Ambulance Command Center</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Button variant="destructive" className="glowing-shadow-interactive"><Siren className="mr-2"/>PANIC</Button>
                    <Button variant="outline" onClick={() => router.push('/login?role=ambulance')}><LogOut className="mr-2"/>Logout</Button>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center gap-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <OxygenChart oxygenLevel={oxygenLevel} />
                    <ReadinessChart readinessScore={readinessScore} />
                </div>
                
                <Button asChild size="lg" className="h-16 text-xl glowing-shadow-interactive">
                    <Link href="https://aistudio.google.com/apps/drive/113XiIrtijHWDzNtIbu7-1molDMWEoYhA?fullscreenApplet=true&showPreview=true&showAssistant=true" target="_blank" rel="noopener noreferrer">
                        RapidAid
                    </Link>
                </Button>
            </main>
        </div>
    );
}
