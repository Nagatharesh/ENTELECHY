
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DnaPatient, dummyDnaPatients } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X, Search, Bot, FileText, User, BarChart, GitBranch, Pill, Hospital, Dna, ExternalLink } from 'lucide-react';
import { BarChart as RechartsBarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { ResearchPanel } from './research-panel';
import Link from 'next/link';

const ChartTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 glassmorphism text-sm">
          <p className="label text-white">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export function GeneticsHub() {
    const [patientId, setPatientId] = useState('');
    const [foundPatient, setFoundPatient] = useState<DnaPatient | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = () => {
        if (!patientId) return;
        setIsLoading(true);
        setTimeout(() => {
            const patient = dummyDnaPatients[patientId.toUpperCase() as keyof typeof dummyDnaPatients];
            setFoundPatient(patient || null);
            setIsLoading(false);
        }, 1500);
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                     <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-gradient-glow text-2xl flex items-center gap-2"><Dna />GuardianRx – DNA Analysis</CardTitle>
                            <CardDescription>Enter a Patient ID to fetch their complete genetic record and AI-driven analytics.</CardDescription>
                        </div>
                        <Button asChild>
                           <Link href="https://gxjr7jwn-3000.inc1.devtunnels.ms/" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Genetics
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Enter Patient ID (e.g., P1001)"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="text-lg"
                        />
                        <Button onClick={handleSearch} disabled={isLoading} className="glowing-shadow-interactive">
                            {isLoading ? 'Searching...' : <><Search className="mr-2"/>Fetch Patient</>}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <AnimatePresence>
                {foundPatient && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <PatientDetailPanel patient={foundPatient} />
                    </motion.div>
                )}
            </AnimatePresence>

            {!foundPatient && !isLoading && (
                 <div className="text-center py-16 text-muted-foreground">
                    <p>Enter a patient ID above to begin.</p>
                    <p className="text-xs">Test IDs: P1001, P1002, P1003, P1004, P1005</p>
                </div>
            )}
        </div>
    );
}

const PatientDetailPanel = ({ patient }: { patient: DnaPatient }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <PatientInfoCard patient={patient} />
                <GeneticMarkersCard markers={patient.geneticRisk.markers} />
                <AnalyticsCard graphs={patient.graphs} />
            </div>
            <div className="space-y-6">
                <AiInsightsCard insights={patient.advanced} />
                <ResearchPanel patient={patient} />
            </div>
        </div>
    );
};

const PatientInfoCard = ({ patient }: { patient: DnaPatient }) => (
    <Card className="glassmorphism">
        <CardHeader className="flex flex-row items-center gap-6">
             <Image src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} width={80} height={80} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
            <div>
                <CardTitle className="text-3xl text-gradient-glow">{patient.name}</CardTitle>
                <CardDescription>{patient.id} &bull; {patient.age} years old {patient.gender}</CardDescription>
                 <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="secondary">Condition: {patient.condition}</Badge>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="font-semibold text-white">Family History:</p>
            <p className="text-muted-foreground">{patient.geneticRisk.familyHistory.join(', ')}</p>
        </CardContent>
    </Card>
);

const GeneticMarkersCard = ({ markers }: { markers: DnaPatient['geneticRisk']['markers'] }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle className="text-xl text-gradient-glow flex items-center gap-2"><FileText />Key Genetic Markers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {markers.map((marker, index) => (
                 <div key={index} className="p-3 rounded-md bg-background/50 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-white">{marker.gene}</p>
                    </div>
                    <Badge variant={marker.risk === 'High' ? 'destructive' : marker.risk === 'Moderate' ? 'default' : 'secondary'}>{marker.risk} Risk</Badge>
                 </div>
            ))}
        </CardContent>
    </Card>
);

const AnalyticsCard = ({ graphs }: { graphs: any }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle className="text-xl text-gradient-glow flex items-center gap-2"><BarChart />Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
             {graphs.trendData && <TrendChart title="Biomarker Trend" data={graphs.trendData} />}
             {graphs.diseaseDistribution && (
                <div>
                     <h4 className="font-semibold text-white mb-2">Disease Distribution</h4>
                     <div className="h-40">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={graphs.diseaseDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="hsl(var(--primary))">
                                     {graphs.diseaseDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"][index % 3]} />
                                     ))}
                                </Pie>
                                <Tooltip content={<ChartTooltipContent />} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
             )}
            {graphs.riskProgression && <TrendChart title="Risk Progression Over Time" data={graphs.riskProgression} />}
        </CardContent>
    </Card>
);

const TrendChart = ({ title, data }: { title: string, data: any[] }) => (
    <div>
        <h4 className="font-semibold text-white mb-2">{title}</h4>
        <div className="h-40">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)"/>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))"/>
                    <YAxis stroke="hsl(var(--muted-foreground))"/>
                    <Tooltip content={<ChartTooltipContent />} wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}/>
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);


const AiInsightsCard = ({ insights }: { insights: any }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle className="text-xl text-gradient-glow flex items-center gap-2"><Bot />AI Insights Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <InsightSection title="Predicted Diseases" content={insights.predictedDiseases.join(', ')} icon={Brain} />
            <InsightSection title="Preventive Measures" content={insights.preventiveMeasures.join(', ')} icon={Shield} />
        </CardContent>
    </Card>
);

const InsightSection = ({ title, content, icon: Icon }: { title: string, content: string, icon: React.ElementType }) => (
    <div>
        <h4 className="font-semibold text-white flex items-center gap-2 mb-1"><Icon className="w-4 h-4 text-primary"/>{title}</h4>
        <p className="text-sm text-muted-foreground pl-6">{content}</p>
    </div>
);
