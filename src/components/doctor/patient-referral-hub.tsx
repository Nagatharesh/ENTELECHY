
"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { dummyReferralPatients, ReferralPatient } from '@/lib/dummy-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Zap, Activity, Heart, Brain, Shield, Info, X, Search, Bot, FileText, User, BarChart, GitBranch, Pill, Hospital } from 'lucide-react';
import { BarChart as RechartsBarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

export function PatientReferralHub() {
    const [patientId, setPatientId] = useState('');
    const [foundPatient, setFoundPatient] = useState<ReferralPatient | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = () => {
        if (!patientId) return;
        setIsLoading(true);
        setTimeout(() => {
            const patient = dummyReferralPatients[patientId.toUpperCase() as keyof typeof dummyReferralPatients];
            setFoundPatient(patient || null);
            setIsLoading(false);
        }, 1500);
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Patient ID Referral Hub</CardTitle>
                    <CardDescription>Enter a Patient ID to fetch their complete medical record and AI-driven analytics.</CardDescription>
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

const PatientDetailPanel = ({ patient }: { patient: ReferralPatient }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <PatientInfoCard patient={patient} />
                <MedicalHistoryCard records={patient.records} />
                <AnalyticsCard graphs={patient.graphs} />
            </div>
            <div className="space-y-6">
                <AiInsightsCard insights={patient.aiInsights} />
            </div>
        </div>
    );
};

const PatientInfoCard = ({ patient }: { patient: ReferralPatient }) => (
    <Card className="glassmorphism">
        <CardHeader className="flex flex-row items-center gap-6">
             <Image src={`https://i.pravatar.cc/150?u=${patient.id}`} alt={patient.name} width={80} height={80} className="rounded-full border-4 border-primary/50 glowing-shadow"/>
            <div>
                <CardTitle className="text-3xl text-gradient-glow">{patient.name}</CardTitle>
                <CardDescription>{patient.id} &bull; {patient.age} years old {patient.gender}</CardDescription>
                 <div className="flex gap-2 mt-2 flex-wrap">
                    <Badge variant="secondary">Blood: {patient.bloodGroup}</Badge>
                    <Badge variant="destructive">Allergies: {patient.allergies.join(', ')}</Badge>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <p className="font-semibold text-white">Chronic Conditions:</p>
            <p className="text-muted-foreground">{patient.chronicConditions.join(', ')}</p>
            <p className="font-semibold text-white mt-2">Doctors Visited:</p>
            <p className="text-muted-foreground">{patient.doctorsVisited.join(', ')}</p>
        </CardContent>
    </Card>
);

const MedicalHistoryCard = ({ records }: { records: any[] }) => (
    <Card className="glassmorphism">
        <CardHeader>
            <CardTitle className="text-xl text-gradient-glow flex items-center gap-2"><FileText />Medical Records Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {records.map((record, index) => (
                 <div key={index} className="p-3 rounded-md bg-background/50 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-white">{record.type}: {record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.result || `Consultation with ${record.doctor}`}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(record.date).toLocaleDateString()}</p>
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
             {graphs.hba1cTrend && <TrendChart title="HbA1c Trend" data={graphs.hba1cTrend} />}
             {graphs.bpTrend && <p>BP Trend: {graphs.bpTrend.map(d => `${d.name}: ${d.value}`).join(' | ')}</p>}
             {graphs.antibodySpikes && <TrendChart title="Antibody Spikes" data={graphs.antibodySpikes} />}
             {graphs.cognitiveDecline && <TrendChart title="Cognitive Decline" data={graphs.cognitiveDecline} />}
             {graphs.mutationProbability && (
                <div>
                    <h4 className="font-semibold text-white">Mutation Probability</h4>
                    <div className="flex gap-4">
                        {Object.entries(graphs.mutationProbability).map(([key, value]) => (
                             <div key={key} className="text-center">
                                <p className="text-2xl font-bold text-primary">{value as number}%</p>
                                <p className="text-xs text-muted-foreground">{key}</p>
                             </div>
                        ))}
                    </div>
                </div>
             )}
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
            <InsightSection title="Risk Analysis" content={insights.risk} icon={Shield} />
            <InsightSection title="Treatment Suggestion" content={insights.treatment} icon={Pill} />
            <InsightSection title="Prevention Plan" content={insights.prevention} icon={GitBranch} />
             <div className="pt-4 border-t border-border/50">
                <Input placeholder="Ask AI... (e.g., 'show similar cases')" />
            </div>
        </CardContent>
    </Card>
);

const InsightSection = ({ title, content, icon: Icon }: { title: string, content: string, icon: React.ElementType }) => (
    <div>
        <h4 className="font-semibold text-white flex items-center gap-2 mb-1"><Icon className="w-4 h-4"/>{title}</h4>
        <p className="text-sm text-muted-foreground pl-6">{content}</p>
    </div>
);
