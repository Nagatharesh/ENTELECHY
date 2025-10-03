
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Search, FileText } from 'lucide-react';
import { DnaPatient } from '@/lib/dummy-data';

export const ResearchPanel = ({ patient }: { patient: DnaPatient }) => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: `Ask me anything about ${patient.name}'s genetic profile or related research.` }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'ai', text: `Based on worldwide genetic data, patients with ${patient.geneticRisk.markers[0].gene} mutations show a 75% positive response to the suggested ${patient.medication.aiSuggestion.split(' ')[0]} trial.` }]);
    }, 1500);
  };

  return (
    <Card className="glassmorphism glowing-shadow h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-gradient-glow flex items-center gap-2"><Bot /> ASI Research Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <ScrollArea className="flex-grow h-64 pr-4 -mr-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.from === 'ai' ? '' : 'justify-end'}`}>
                {msg.from === 'ai' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                <div className={`p-3 rounded-lg max-w-xs ${msg.from === 'ai' ? 'bg-background/50' : 'bg-primary/20 text-white'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="relative">
          <Input 
            placeholder="Test hypothesis, e.g., 'Effect of X on gene Y'"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            className="pr-12"
          />
          <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend}><Send /></Button>
        </div>
        <div className="space-y-2">
            <h4 className="font-semibold text-white">Recommended Reading</h4>
            <div className="text-sm text-muted-foreground p-3 bg-background/50 rounded-lg flex items-start gap-2 hover:bg-primary/10 cursor-pointer">
                <FileText className="w-5 h-5 text-secondary flex-shrink-0 mt-1"/>
                <div>
                    <p className="font-bold text-white">"Advances in {patient.condition} treatment with new biologics"</p>
                    <p className="text-xs">Journal of Modern Medicine, 2024</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
