
"use client";

import { useState } from 'react';
import { Doctor, dummyDoctors, dummyCommunication } from '@/lib/dummy-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Paperclip, Send, Video, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function DoctorCommunication({ doctor }: { doctor: Doctor }) {
    const [selectedChat, setSelectedChat] = useState(dummyCommunication[0]);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() === '') return;
        // Mock sending message
        const newMessage = {
            sender: doctor.name,
            text: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        // This would update state in a real app
        console.log("Sending message:", newMessage);
        setMessage('');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
            <Card className="lg:col-span-1 glassmorphism glowing-shadow h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="text-gradient-glow">Conversations</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-0 overflow-y-auto">
                    <ScrollArea className="h-full">
                        {dummyCommunication.map((chat) => (
                            <div 
                                key={chat.id}
                                className={cn(
                                    "p-4 flex items-center gap-4 cursor-pointer border-b border-border/50 hover:bg-primary/10 transition-colors",
                                    selectedChat.id === chat.id && "bg-primary/20"
                                )}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <Avatar className="h-12 w-12 border-2 border-primary/50">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.with.doctorId}`} alt={chat.with.name} />
                                    <AvatarFallback>{chat.with.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-white truncate">{chat.with.name}</p>
                                        <p className="text-xs text-muted-foreground">{chat.lastMessage.timestamp}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage.text}</p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="lg:col-span-2 glassmorphism glowing-shadow h-full flex flex-col">
                {selectedChat ? (
                    <>
                        <CardHeader className="flex-row items-center justify-between border-b border-border/50 p-4">
                             <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10 border-2 border-secondary/50">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedChat.with.doctorId}`} alt={selectedChat.with.name} />
                                    <AvatarFallback>{selectedChat.with.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg text-white">{selectedChat.with.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{selectedChat.with.specialty}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="glowing-shadow-interactive"><Phone /></Button>
                                <Button variant="ghost" size="icon" className="glowing-shadow-interactive animate-ripple"><Video /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-4 overflow-y-auto space-y-4">
                            <div className="p-3 rounded-lg glassmorphism flex items-start gap-3">
                                <Bot className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-sm font-bold text-gradient-glow">AI Case Summary</p>
                                    <p className="text-sm text-muted-foreground">Patient ID P-102345 (Ananya Sharma) shows recurring mild asthma. Last encounter on 2024-03-01 with Dr. Neha Kapoor. Spirometry indicated a mild obstructive pattern. Consider environmental triggers. Seeking your opinion on potential allergic crossover.</p>
                                </div>
                            </div>
                            {selectedChat.messages.map((msg, index) => (
                                <div key={index} className={cn("flex gap-3", msg.sender === doctor.name ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "p-3 rounded-lg max-w-sm",
                                        msg.sender === doctor.name ? "bg-primary/20 text-white" : "glassmorphism"
                                    )}>
                                        <p>{msg.text}</p>
                                        <p className="text-xs text-right text-muted-foreground mt-1">{msg.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <div className="p-4 border-t border-border/50">
                            <div className="relative">
                                <Input 
                                    placeholder="Type your message..." 
                                    className="pr-24"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                    <Button variant="ghost" size="icon"><Paperclip /></Button>
                                    <Button size="sm" className="glowing-shadow-interactive" onClick={handleSendMessage}><Send /></Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Select a conversation to start chatting