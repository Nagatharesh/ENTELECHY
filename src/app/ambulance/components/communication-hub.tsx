
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Hospital, Shield, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickMessages = [
    { text: "En-route to patient", icon: Shield },
    { text: "Patient onboard, vitals stable", icon: Bot },
    { text: "Approaching hospital", icon: Hospital },
    { text: "Requesting medical direction", icon: Bot }
];

export function CommunicationHub() {
    const { toast } = useToast();

    const handleSend = (message: string) => {
        toast({
            title: "Message Sent",
            description: `Sent to dispatch: "${message}"`,
        });
    };

    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Send /> Communication Hub
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {quickMessages.map((msg, index) => (
                    <Button 
                        key={index}
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleSend(msg.text)}
                    >
                        <msg.icon className="mr-2 h-4 w-4 text-primary" /> {msg.text}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
}
