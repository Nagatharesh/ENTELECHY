
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, ClipboardList } from 'lucide-react';

const checklistItems = [
    { id: 'fuel', label: 'Fuel Level Above 50%' },
    { id: 'oxygen', label: 'Oxygen Cylinder Full' },
    { id: 'tires', label: 'Tire Pressure Checked' },
    { id: 'siren', label: 'Siren and Lights Functional' },
    { id: 'medkit', label: 'Medical Kit Stocked' },
    { id: 'comms', label: 'Communication System Online' }
];

export function PreTripChecklist({ onComplete }) {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    
    const handleCheck = (itemId: string, isChecked: boolean) => {
        if (isChecked) {
            setCheckedItems(prev => [...prev, itemId]);
        } else {
            setCheckedItems(prev => prev.filter(id => id !== itemId));
        }
    };
    
    const allChecked = checkedItems.length === checklistItems.length;

    return (
        <Card className="glassmorphism">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><ClipboardList/>Pre-Trip Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {checklistItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-2 p-2 rounded-md bg-background/30">
                        <Checkbox 
                            id={item.id} 
                            onCheckedChange={(checked) => handleCheck(item.id, !!checked)}
                            checked={checkedItems.includes(item.id)}
                        />
                        <Label htmlFor={item.id} className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {item.label}
                        </Label>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                 <Button className="w-full glowing-shadow-interactive" disabled={!allChecked} onClick={onComplete}>
                    <Check className="mr-2"/> Mark as Complete & Go Online
                </Button>
            </CardFooter>
        </Card>
    );
}
