
"use client";

import React, { useState, useMemo, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, UserCheck, PhoneCall, MessageSquare, AlertTriangle, Pill, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '../ui/progress';

const dummyPatients = [
    { patient_id: 'P001', name: 'Sanjay Sharma', age: 45, condition: 'Hypertension', adherence: 92, lastDose: '08:00 AM', contact_info: 'sanjay@email.com', assigned_doctor_id: 'D001', timeline: ['taken', 'taken', 'taken', 'taken', 'taken', 'taken', 'taken'] },
    { patient_id: 'P002', name: 'Priya Verma', age: 32, condition: 'Diabetes', adherence: 85, lastDose: '07:30 AM', contact_info: 'priya@email.com', assigned_doctor_id: 'D001', timeline: ['taken', 'taken', 'late', 'taken', 'taken', 'taken', 'late'] },
    { patient_id: 'P003', name: 'Rohit Kumar', age: 60, condition: 'Heart Disease', adherence: 70, lastDose: '08:15 AM', contact_info: 'rohit@email.com', assigned_doctor_id: 'D002', timeline: ['taken', 'missed', 'missed', 'taken', 'taken', 'missed', 'taken'] },
    { patient_id: 'P004', name: 'Ananya Singh', age: 28, condition: 'Thyroid', adherence: 100, lastDose: '08:05 AM', contact_info: 'ananya@email.com', assigned_doctor_id: 'D002', timeline: ['taken', 'taken', 'taken', 'taken', 'taken', 'taken', 'taken'] },
    { patient_id: 'P005', name: 'Vikram Joshi', age: 50, condition: 'Cholesterol', adherence: 78, lastDose: '07:45 AM', contact_info: 'vikram@email.com', assigned_doctor_id: 'D003', timeline: ['taken', 'taken', 'taken', 'missed', 'late', 'taken', 'taken'] }
];

const dummyAlerts = [
    { alert_id: 'A001', patient_id: 'P003', alert_type: 'missed dose', risk_percentage: 25, timestamp_alerted: '2025-10-03 08:30', message: 'Rohit Kumar missed 3 doses → risk of hospitalization 25%.' },
    { alert_id: 'A002', patient_id: 'P002', alert_type: 'high risk', risk_percentage: 15, timestamp_alerted: '2025-10-03 08:50', message: 'Patient Priya Verma missed 2 doses this week. Risk of hyperglycemia 15%. Suggest follow-up call.' }
];

export function GuardianRxHub() {
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
    };
    
    const handleCloseDetail = () => {
        setSelectedPatient(null);
    }

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">GuardianRx – Living Medicine Guardian</CardTitle>
                    <CardDescription>Real-time patient medication adherence and AI-driven risk prediction.</CardDescription>
                </CardHeader>
            </Card>

            <AnimatePresence>
            {selectedPatient && (
                <motion.div
                    key="detail-view"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                >
                    <PatientDetailView patient={selectedPatient} onClose={handleCloseDetail} />
                </motion.div>
            )}
            </AnimatePresence>
            
            <motion.div 
                key="grid-view"
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
                {dummyPatients.map(patient => (
                    <PatientPillCard key={patient.patient_id} patient={patient} onSelect={handlePatientClick} isSelected={selectedPatient?.patient_id === patient.patient_id} />
                ))}
            </motion.div>

            <AiAlertsPanel />
        </div>
    );
}

const PatientPillCard = ({ patient, onSelect, isSelected }) => {
    const adherenceColor = patient.adherence > 90 ? 'hsl(var(--secondary))' : patient.adherence > 80 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
    return (
        <motion.div layoutId={`patient-card-${patient.patient_id}`} onClick={() => onSelect(patient)} >
            <Card className={cn("glassmorphism text-center p-4 cursor-pointer hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2", isSelected ? 'border-2 border-primary shadow-primary/40 shadow-2xl' : '')}>
                <div className="relative w-24 h-24 mx-auto mb-4">
                     <Pill className="w-24 h-24 text-primary/30" />
                     <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white" style={{textShadow: `0 0 10px ${adherenceColor}`}}>
                        {patient.adherence}%
                    </div>
                </div>
                <CardTitle className="text-white text-lg">{patient.name}</CardTitle>
                <CardDescription>{patient.condition}</CardDescription>
            </Card>
        </motion.div>
    );
};

const PatientDetailView = ({ patient, onClose }) => {
    const adherenceColor = patient.adherence > 90 ? 'hsl(var(--secondary))' : patient.adherence > 80 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
    const alert = dummyAlerts.find(a => a.patient_id === patient.patient_id);
    return (
        <Card className="glassmorphism glowing-shadow grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            <div className="lg:col-span-1">
                <motion.div layoutId={`patient-card-${patient.patient_id}`}>
                    <h2 className="text-2xl font-bold text-gradient-glow">{patient.name}</h2>
                    <p className="text-muted-foreground">{patient.age} years old &bull; {patient.condition}</p>
                </motion.div>

                <div className="mt-6 space-y-4">
                     <h3 className="text-lg font-semibold text-white">Overall Adherence</h3>
                     <div className="flex items-center gap-4">
                        <Progress value={patient.adherence} indicatorColor={adherenceColor} className="h-4"/>
                        <span className="text-xl font-bold text-white">{patient.adherence}%</span>
                     </div>
                </div>
                
                 <div className="mt-6 space-y-2">
                    <h3 className="text-lg font-semibold text-white">Actions</h3>
                    <Button variant="outline" className="w-full justify-start"><MessageSquare/> Send Reminder</Button>
                    <Button variant="outline" className="w-full justify-start"><PhoneCall/> Call Patient</Button>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
                 <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">7-Day Timeline</h3>
                    <Button variant="ghost" size="icon" onClick={onClose}><X/></Button>
                 </div>
                <div className="flex justify-between gap-1">
                    {patient.timeline.map((status, index) => {
                        let bgColor = 'bg-green-500/20';
                        if(status === 'late') bgColor = 'bg-yellow-500/20';
                        if(status === 'missed') bgColor = 'bg-red-500/20';
                        return <div key={index} className={cn("h-16 flex-1 rounded-md glassmorphism p-2", bgColor)} title={`Day ${index+1}: ${status}`}></div>
                    })}
                </div>
                
                 {alert && (
                    <Alert variant={alert.risk_percentage > 20 ? 'destructive' : 'default'} className="glowing-shadow">
                        <Bot className="h-4 w-4" />
                        <AlertTitle>AI Insight</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )}
                 <div className="text-center p-4 mt-4 glassmorphism text-sm">
                    <p className="text-muted-foreground">
                        <AlertTriangle className="inline w-4 h-4 mr-2" />
                        Digital Twin simulation not available in GuardianLite. This is a simplified tracking view.
                    </p>
                </div>
            </div>
        </Card>
    )
}

const AiAlertsPanel = () => (
    <Card className="glassmorphism glowing-shadow">
        <CardHeader>
            <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot />AI Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {dummyAlerts.map(alert => (
                <Alert key={alert.alert_id} variant={alert.risk_percentage > 20 ? 'destructive' : 'default'}>
                    <AlertTitle>{dummyPatients.find(p=>p.patient_id === alert.patient_id)?.name}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            ))}
        </CardContent>
    </Card>
);
