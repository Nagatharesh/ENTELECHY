
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, CheckCircle } from "lucide-react";
import Link from "next/link";
import umangData from "@/lib/umang-data.json";

export function UmangHub() {
    const servicesButton = umangData.umang.buttons.find(b => b.id === "state_gov_services");
    const howToUse = umangData.umang.buttons.find(b => b.id === "how_to_use")?.content;

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">UMANG Services</CardTitle>
                    <CardDescription>
                        Unified Mobile Application for New-age Governance. Your single point of access to major government services.
                    </CardDescription>
                </CardHeader>
            </Card>

            {servicesButton && (
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="text-white text-xl">{servicesButton.name}</CardTitle>
                        <CardDescription>{servicesButton.primary_use}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full glowing-shadow-interactive">
                            <Link href={servicesButton.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit UMANG Portal
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            {howToUse && (
                <Card className="glassmorphism">
                    <CardHeader>
                        <CardTitle className="text-white text-xl">How to Use UMANG Health Services</CardTitle>
                        <CardDescription>A step-by-step guide to accessing key healthcare features on the UMANG platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {howToUse.map((step) => (
                                <AccordionItem key={step.step} value={`item-${step.step}`}>
                                    <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline">
                                        <div className="flex items-center gap-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">{step.step}</span>
                                            {step.title}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-12 space-y-4 pt-2">
                                        <p className="text-muted-foreground">{step.description}</p>
                                        {step.action && <p className="font-semibold text-white bg-background/50 p-2 rounded-md">{step.action}</p>}

                                        {step.services && (
                                            <div className="space-y-3">
                                                {step.services.map((service) => (
                                                    <div key={service.service} className="p-3 border border-border/50 rounded-lg">
                                                        <p className="font-bold text-secondary">{service.service}</p>
                                                        <p className="text-sm text-muted-foreground italic my-1">"{service.what_it_does}"</p>
                                                        <p className="text-sm text-white flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-1 shrink-0" /> {service.action}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
