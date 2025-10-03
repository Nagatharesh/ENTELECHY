
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { onlinePrescriptionData } from '@/lib/dummy-data';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Bot, Pencil, Loader2, Send, CheckCircle, AlertTriangle, FileText, Pill, Download, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function OnlinePrescriptionHub() {
    const { toast } = useToast();
    const [step, setStep] = useState(0); // 0: input, 1: finalize, 2: signed
    const [symptoms, setSymptoms] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);
    
    const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
    const [finalizedMeds, setFinalizedMeds] = useState<any[]>([]);
    
    const [isSigning, setIsSigning] = useState(false);

    const handleSuggest = () => {
        if (!symptoms.trim()) {
            toast({ variant: 'destructive', title: 'Symptoms missing', description: 'Please enter patient symptoms.' });
            return;
        }
        setIsSuggesting(true);
        setTimeout(() => {
            const suggestions: any[] = [];
            const lowerSymptoms = symptoms.toLowerCase();
            onlinePrescriptionData.aiHints.mappings.forEach(mapping => {
                if (mapping.symptomKeywords.some(kw => lowerSymptoms.includes(kw))) {
                    mapping.suggest.forEach(medId => {
                        const med = onlinePrescriptionData.medicines.find(m => m.medId === medId);
                        const existing = suggestions.find(s => s.medId === medId);
                        if (med && !existing) {
                            suggestions.push({
                                ...med,
                                rationale: "Symptom match - demo suggestion"
                            });
                        }
                    });
                }
            });
            setAiSuggestions(suggestions);
            setFinalizedMeds(suggestions.map(s => ({ ...s, days: 5, frequencyPerDay: 3, tabletsPerDose: 1 }))); // Pre-populate
            setIsSuggesting(false);
            setStep(1);
        }, 1500);
    };

    const handleSign = () => {
        setIsSigning(true);
        setTimeout(() => {
            setIsSigning(false);
            setStep(2);
            toast({ title: "Prescription Signed & Sent!", description: "Notifications have been sent to the patient and pharmacy." });
        }, 2000);
    };
    
    const reset = () => {
        setStep(0);
        setSymptoms('');
        setAiSuggestions([]);
        setFinalizedMeds([]);
        setIsSigning(false);
    }

    const totalCost = useMemo(() => {
        return finalizedMeds.reduce((acc, med) => {
            if (med.form === 'Syrup') {
                 const bottles = Math.ceil((med.days * med.frequencyPerDay * 10) / 100);
                 return acc + (bottles * med.pricePerUnit);
            }
            const totalTablets = (med.tabletsPerDose || 1) * (med.frequencyPerDay || 1) * (med.days || 1);
            return acc + (totalTablets * med.pricePerUnit);
        }, 0);
    }, [finalizedMeds]);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-gradient-glow text-2xl">Online Prescription (AI Assist) - Demo</CardTitle>
                         {step > 0 && <Button variant="outline" onClick={reset}><X className="mr-2"/>New Prescription</Button>}
                    </div>
                    <CardDescription>Enter symptoms, get AI suggestions, and issue a signed digital prescription.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SymptomInput symptoms={symptoms} setSymptoms={setSymptoms} onSuggest={handleSuggest} isLoading={isSuggesting} />
                            </motion.div>
                        )}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <FinalizeView 
                                    symptoms={symptoms} 
                                    aiSuggestions={aiSuggestions} 
                                    finalizedMeds={finalizedMeds} 
                                    setFinalizedMeds={setFinalizedMeds} 
                                    totalCost={totalCost}
                                    onSign={handleSign}
                                    isSigning={isSigning}
                                />
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <SignedView 
                                    prescription={onlinePrescriptionData.samplePrescription}
                                    finalizedMeds={finalizedMeds}
                                    totalCost={totalCost}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}

const SymptomInput = ({ symptoms, setSymptoms, onSuggest, isLoading }) => (
    <div className="space-y-4">
        <h3 className="font-semibold text-lg text-white">1. Enter Patient Symptoms</h3>
        <Textarea 
            placeholder="e.g., Patient reports fever and cough for 2 days with mild chest discomfort..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
            className="text-base"
        />
        <Button onClick={onSuggest} disabled={isLoading} className="w-full glowing-shadow-interactive">
            {isLoading ? <Loader2 className="animate-spin mr-2"/> : <Bot className="mr-2" />}
            {isLoading ? 'Analyzing Symptoms...' : 'Get AI Suggestions'}
        </Button>
    </div>
);

const FinalizeView = ({ symptoms, aiSuggestions, finalizedMeds, setFinalizedMeds, totalCost, onSign, isSigning }) => (
    <div className="space-y-6">
        <div>
            <h3 className="font-semibold text-lg text-white">Patient Symptoms</h3>
            <p className="text-muted-foreground italic p-3 bg-background/50 rounded-md">"{symptoms}"</p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-white flex items-center gap-2 mb-2"><Bot className="text-primary"/>AI Suggestions</h3>
            <div className="flex flex-wrap gap-2">
                {aiSuggestions.map(med => (
                    <Badge key={med.medId} variant="secondary" className="p-2">{med.name} <span className="text-muted-foreground ml-2">({med.rationale})</span></Badge>
                ))}
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">2. Finalize Prescription</h3>
            {finalizedMeds.map((med, index) => (
                <MedicineEditor key={med.medId} medicine={med} index={index} setFinalizedMeds={setFinalizedMeds}/>
            ))}
            {/* Add search to add more meds here */}
        </div>

        <div className="flex justify-between items-center p-4 glassmorphism rounded-lg">
            <h3 className="font-bold text-xl text-white">Total Estimated Cost:</h3>
            <p className="font-bold text-2xl text-gradient-glow">₹{totalCost.toFixed(2)}</p>
        </div>

        <div>
            <h3 className="font-semibold text-lg text-white">3. E-Sign & Send</h3>
            <p className="text-sm text-muted-foreground mb-4">Signing will lock the prescription and send notifications to the patient and pharmacy.</p>
            <Button onClick={onSign} disabled={isSigning} className="w-full glowing-shadow-interactive h-12 text-lg">
                {isSigning ? <Loader2 className="animate-spin mr-2"/> : <Pencil className="mr-2" />}
                {isSigning ? 'Signing & Sending...' : 'Sign & Send Prescription'}
            </Button>
        </div>
    </div>
);


const MedicineEditor = ({ medicine, index, setFinalizedMeds }) => {
    const handleUpdate = (field, value) => {
        setFinalizedMeds(prev => {
            const newMeds = [...prev];
            newMeds[index] = { ...newMeds[index], [field]: value };
            return newMeds;
        });
    };

    const isSyrup = medicine.form === 'Syrup';
    
    return (
        <Card className="glassmorphism p-3">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-white">{medicine.name} <span className="text-sm text-muted-foreground">{medicine.strength}</span></p>
                <Button variant="ghost" size="icon" onClick={() => setFinalizedMeds(p => p.filter((_, i) => i !== index))}><X className="w-4 h-4 text-destructive"/></Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                <Input placeholder="Dose" defaultValue={isSyrup ? '10 ml' : '1'} onChange={(e) => handleUpdate(isSyrup ? 'dose' : 'tabletsPerDose', isSyrup ? e.target.value : parseInt(e.target.value))}/>
                <Input placeholder="Frequency/Day" type="number" defaultValue={medicine.frequencyPerDay} onChange={(e) => handleUpdate('frequencyPerDay', parseInt(e.target.value))}/>
                <Input placeholder="Days" type="number" defaultValue={medicine.days} onChange={(e) => handleUpdate('days', parseInt(e.target.value))}/>
                <div className="p-2 bg-background/50 rounded-md text-center">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-bold text-white">
                        {isSyrup ? `${Math.ceil((medicine.days * medicine.frequencyPerDay * 10) / 100)} bottles` : `${(medicine.tabletsPerDose || 1) * (medicine.frequencyPerDay || 1) * (medicine.days || 1)} tabs`}
                    </p>
                </div>
            </div>
        </Card>
    );
};

const SignedView = ({ prescription, finalizedMeds, totalCost }) => (
    <div className="space-y-6">
        <div className="p-6 text-center bg-green-500/10 border-2 border-dashed border-green-500/30 rounded-lg">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse"/>
            <h3 className="text-2xl font-bold text-gradient-glow">Prescription Signed & Sent</h3>
            <p className="text-muted-foreground">ID: {prescription.prescriptionId}</p>
        </div>

        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-xl text-white">Final Prescription</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="space-y-1 mb-4">
                    {finalizedMeds.map((med) => (
                        <div key={med.medId} className="grid grid-cols-4 gap-x-2 p-2 rounded bg-background/30">
                           <span className="font-semibold col-span-2 text-white">{med.name} {med.strength}</span>
                           <span>{med.tabletsPerDose || med.dose} / dose</span>
                           <span>{med.frequencyPerDay}x daily for {med.days} days</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center">
                     <p className="font-bold text-xl text-gradient-glow">Total: ₹{totalCost.toFixed(2)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={prescription.eSignature.signatureImageUrl} alt="Doctor Signature" className="h-8 bg-white p-1 rounded-sm"/>
                    <p className="text-sm text-muted-foreground">Signed at {new Date(prescription.eSignature.signedAt!).toLocaleString()}</p>
                </div>
                <Button variant="outline" className="glowing-shadow-interactive" disabled={prescription.uiHints.disableDownload}>
                    <Download className="mr-2"/> Download PDF
                </Button>
            </CardFooter>
        </Card>

        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-xl text-white">Delivery & Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <p>Patient Notification (SMS)</p>
                    <Badge className={cn("text-white", prescription.delivery.deliveryStatus === 'sent' ? 'bg-green-500' : 'bg-yellow-500')}>{prescription.delivery.deliveryStatus}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-background/30 rounded-lg">
                    <p>Pharmacy Push (FCM)</p>
                    <Badge className={cn("text-white", prescription.notificationsLog[1].status === 'sent' ? 'bg-green-500' : 'bg-yellow-500')}>{prescription.notificationsLog[1].status}</Badge>
                </div>
            </CardContent>
        </Card>
    </div>
);
