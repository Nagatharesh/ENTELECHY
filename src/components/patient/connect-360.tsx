"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import connect360Data from "@/lib/connect-360-data.json";

// In a real app, this data would be fetched from Firestore.
// For this prototype, we'll use the local JSON file.
const buttons = connect360Data.buttons;

export function Connect360() {
    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Connect 360</CardTitle>
                    <CardDescription>
                        Your gateway to India's public health ecosystem. Access key government portals and services directly from here.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buttons.map((button) => (
                    <Card key={button.id} className="glassmorphism flex flex-col hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">{button.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{button.primary_use}</p>
                        </CardContent>
                        <div className="p-4 pt-0">
                            <Button asChild className="w-full glowing-shadow-interactive">
                                <Link href={button.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Visit Portal
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
