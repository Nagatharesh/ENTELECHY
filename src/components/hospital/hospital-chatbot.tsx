
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

const EMOJIS = {
  WELCOME: '🏥✨',
  SUCCESS: '✅📊',
  ERROR: '⚠️💡',
  INSIGHT: '🧠💡',
  STATUS: '📊',
  STAFF: '🧑‍⚕️',
  ALERTS: '🚨',
  PREDICT: '🔮',
};

const QUICK_REPLIES = {
    MAIN_MENU: [
        { text: `${EMOJIS.STATUS} Facility Status`, action: 'flow_status' },
        { text: `${EMOJIS.STAFF} Staff Alerts`, action: 'flow_staff' },
        { text: `${EMOJIS.ALERTS} Incident Reports`, action: 'flow_incidents' },
        { text: `${EMOJIS.PREDICT} Predictive Analytics`, action: 'flow_predict' },
    ],
    STATUS_OPTIONS: [
        { text: 'Bed Occupancy', action: 'status_beds' },
        { text: 'Oxygen Levels', action: 'status_oxygen' },
        { text: 'Back to menu', action: 'main_menu' },
    ],
    STAFF_OPTIONS: [
        { text: 'High Stress Staff', action: 'staff_stress' },
        { text: 'Upcoming Shift Changes', action: 'staff_shifts' },
        { text: 'Back to menu', action: 'main_menu' },
    ],
    INCIDENT_OPTIONS: [
        { text: 'Show Active Alerts', action: 'incidents_active' },
        { text: 'Log a New Incident', action: 'incidents_log' },
        { text: 'Back to menu', action: 'main_menu' },
    ],
    PREDICT_OPTIONS: [
        { text: 'Patient Load Forecast', action: 'predict_load' },
        { text: 'Equipment Failure Risk', action: 'predict_equipment' },
        { text: 'Back to menu', action: 'main_menu' },
    ]
};

export function HospitalChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ author: 'bot' | 'user'; text: string; quickReplies?: any[] }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [conversationState, setConversationState] = useState('main_menu');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    author: 'bot',
                    text: `${EMOJIS.WELCOME} Hello! This is the Administrative ASI. How can I assist with hospital operations today?`,
                    quickReplies: QUICK_REPLIES.MAIN_MENU,
                }
            ]);
        }
    }, [isOpen, messages]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            setTimeout(() => {
                 const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
                if(viewport) viewport.scrollTop = viewport.scrollHeight;
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = (text: string) => {
        const messageText = text.trim();
        if (!messageText) return;

        const userMessage = { author: 'user' as const, text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        setTimeout(() => {
            const botResponse = getBotResponse(messageText, conversationState);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
        }, 1000);
    };

    const handleQuickReply = (action: string, text: string) => {
        const userMessage = { author: 'user' as const, text: text };
        setMessages(prev => [...prev, userMessage]);
        
        setTimeout(() => {
            const botResponse = getBotResponse(action, conversationState);
            setMessages(prev => [...prev, botResponse.response]);
            setConversationState(botResponse.nextState || 'main_menu');
        }, 1000);
    }

    const getBotResponse = (userInput: string, state: string): { response: { author: 'bot', text: string, quickReplies?: any[] }, nextState?: string } => {
        const lowerInput = userInput.toLowerCase();
        
        if (lowerInput.startsWith('flow_')) {
            switch(lowerInput) {
                case 'flow_status':
                    return { response: { author: 'bot', text: `${EMOJIS.STATUS} Which facility metric do you need?`, quickReplies: QUICK_REPLIES.STATUS_OPTIONS }, nextState: 'status' };
                case 'flow_staff':
                    return { response: { author: 'bot', text: `${EMOJIS.STAFF} Accessing staff data. What do you need?`, quickReplies: QUICK_REPLIES.STAFF_OPTIONS }, nextState: 'staff' };
                case 'flow_incidents':
                    return { response: { author: 'bot', text: `${EMOJIS.ALERTS} Incident command. Choose an option.`, quickReplies: QUICK_REPLIES.INCIDENT_OPTIONS }, nextState: 'incidents' };
                case 'flow_predict':
                    return { response: { author: 'bot', text: `${EMOJIS.PREDICT} AI analytics module. What forecast are you interested in?`, quickReplies: QUICK_REPLIES.PREDICT_OPTIONS }, nextState: 'predict' };
            }
        }
        
        if(lowerInput === 'main_menu') {
            return {
                response: { author: 'bot', text: "Is there anything else I can help with?", quickReplies: QUICK_REPLIES.MAIN_MENU, },
                nextState: 'main_menu'
            };
        }


        switch (state) {
            case 'status':
                if (lowerInput.includes('beds')) {
                    return { response: { author: 'bot', text: `${EMOJIS.STATUS} Bed occupancy is currently at 85%. 45 ICU beds are occupied out of 50.`, quickReplies: QUICK_REPLIES.STATUS_OPTIONS }, nextState: 'status' };
                }
                if (lowerInput.includes('oxygen')) {
                    return { response: { author: 'bot', text: `${EMOJIS.STATUS} Main oxygen supply is at 70%. AI predicts a need for refill in the next 8 hours.`, quickReplies: QUICK_REPLIES.STATUS_OPTIONS }, nextState: 'status' };
                }
                break;
            
            case 'staff':
                 if (lowerInput.includes('stress')) {
                    return { response: { author: 'bot', text: `${EMOJIS.STAFF} Dr. A Kumar and Nurse Rajesh Kumar are showing high stress levels. Recommending immediate rest.`, quickReplies: QUICK_REPLIES.STAFF_OPTIONS }, nextState: 'staff' };
                }
                 if (lowerInput.includes('shifts')) {
                    return { response: { author: 'bot', text: `Shift change in 2 hours. Dr. Carter will replace Dr. Johnson in the ER.`, quickReplies: QUICK_REPLIES.STAFF_OPTIONS }, nextState: 'staff' };
                 }
                break;
            
            case 'incidents':
                if (lowerInput.includes('active')) {
                    return { response: { author: 'bot', text: `${EMOJIS.ALERTS} Critical: Smoke detector in Ward B. Warning: Unauthorized access at Main Entrance.`, quickReplies: QUICK_REPLIES.INCIDENT_OPTIONS }, nextState: 'incidents' };
                }
                if (lowerInput.includes('log')) {
                    return { response: { author: 'bot', text: "To log a new incident, please describe it briefly.", }, nextState: 'logging_incident' };
                }
                break;
            case 'logging_incident':
                return { response: { author: 'bot', text: `${EMOJIS.SUCCESS} Incident logged: "${userInput}". The relevant department has been notified.`, quickReplies: QUICK_REPLIES.INCIDENT_OPTIONS }, nextState: 'incidents' };

            case 'predict':
                if (lowerInput.includes('load')) {
                    return { response: { author: 'bot', text: `${EMOJIS.PREDICT} AI predicts a 15% increase in patient load next week due to seasonal changes.`, quickReplies: QUICK_REPLIES.PREDICT_OPTIONS }, nextState: 'predict' };
                }
                 if (lowerInput.includes('equipment')) {
                    return { response: { author: 'bot', text: `${EMOJIS.PREDICT} MRI coil #3 is at 80% wear and has a 75% chance of failure in the next 60-90 days.`, quickReplies: QUICK_REPLIES.PREDICT_OPTIONS }, nextState: 'predict' };
                }
                break;
        }

        // Default fallback
        return {
            response: {
                author: 'bot',
                text: `${EMOJIS.ERROR} I'm sorry, I can only provide information on Facility Status, Staff Alerts, Incidents, and Predictions.`,
                quickReplies: QUICK_REPLIES.MAIN_MENU,
            },
            nextState: 'main_menu'
        };
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-5 z-50"
                    >
                        <Card className="w-96 h-[60vh] flex flex-col glassmorphism glowing-shadow">
                            <CardHeader className="flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bot className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-gradient-glow">Administrative ASI</CardTitle>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X/></Button>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-hidden p-3">
                                <ScrollArea className="h-full" ref={scrollAreaRef}>
                                    <div className="space-y-4 pr-4">
                                        {messages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-end gap-2", msg.author === 'user' ? 'justify-end' : 'justify-start')}>
                                                {msg.author === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                                                <div className={cn("max-w-xs rounded-2xl p-3 text-sm", msg.author === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'glassmorphism rounded-bl-none')}>
                                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                                     {msg.author === 'bot' && msg.quickReplies && (
                                                        <div className="flex flex-wrap gap-2 mt-3">
                                                            {msg.quickReplies.map(qr => (
                                                                <Button key={qr.action} size="sm" variant="outline" className="text-xs h-auto py-1 px-2" onClick={() => handleQuickReply(qr.action, qr.text)}>
                                                                    {qr.text}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                {msg.author === 'user' && <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <div className="p-3 border-t border-border/50">
                                <div className="relative">
                                    <Input
                                        placeholder="Ask ASI..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                    />
                                    <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleSendMessage(inputValue)}>
                                        <Send />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-5 right-5 z-50"
            >
                <Button 
                    size="icon" 
                    className="w-16 h-16 rounded-full glowing-shadow-interactive" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8 animate-pulse" />}
                </Button>
            </motion.div>
        </>
    );
}
