
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export function BrainAidHub() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">BrainAid</CardTitle>
                    <CardDescription>Access advanced brain mapping and analysis tools.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8">
                    <p className="mb-6 text-muted-foreground">Click the button below to launch the brain mapping interface.</p>
                    <Button size="lg" className="glowing-shadow-interactive" asChild>
                        <Link href="https://aistudio.google.com/apps/drive/1nqKw_9_0GyYd8alPB-HvoFW_KyyvKsos?fullscreenApplet=true&showPreview=true&showAssistant=true" target="_blank" rel="noopener noreferrer">
                            <BrainCircuit className="mr-2 h-5 w-5"/>
                            Brain Mapping
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
