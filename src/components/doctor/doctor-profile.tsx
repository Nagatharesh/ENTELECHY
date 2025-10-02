
"use client";

import { Doctor } from "@/lib/dummy-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Star, TrendingUp, UserCheck, BarChart, User, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar as RechartsBar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function DoctorProfile({ doctor }: { doctor: Doctor }) {

    const chartData = [
        { name: 'Patient Volume', value: doctor.stats.patientVolume },
        { name: 'Surgeries', value: doctor.stats.surgeriesPerformed },
        { name: 'Consultations', value: doctor.stats.consultations },
    ];
    
    const feedbackData = [
        { name: '5★', value: doctor.stats.feedback.star5 },
        { name: '4★', value: doctor.stats.feedback.star4 },
        { name: '3★', value: doctor.stats.feedback.star3 },
        { name: '2★', value: doctor.stats.feedback.star2 },
        { name: '1★', value: doctor.stats.feedback.star1 },
    ];


    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="flex flex-col md:flex-row items-center gap-6">
                    <Image 
                        src={`https://i.pravatar.cc/150?u=${doctor.doctorId}`} 
                        alt={doctor.name} 
                        width={120} 
                        height={120} 
                        className="rounded-full border-4 border-primary/50 glowing-shadow"
                    />
                    <div className="text-center md:text-left">
                        <CardTitle className="text-4xl font-bold text-gradient-glow">{doctor.name}</CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">{doctor.specialty}</CardDescription>
                        <div className="flex gap-2 mt-2 justify-center md:justify-start">
                            {doctor.qualifications.map(q => <Badge key={q} variant="secondary">{q}</Badge>)}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                        <InfoCard icon={Briefcase} label="Experience" value={`${doctor.experience} years`} />
                        <InfoCard icon={UserCheck} label="Operations" value={doctor.stats.surgeriesPerformed.toString()} />
                        <InfoCard icon={TrendingUp} label="Success Rate" value={`${doctor.stats.successRate}%`} />
                        <InfoCard icon={Star} label="Avg. Rating" value={doctor.rating.toString()} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 glassmorphism glowing-shadow">
                     <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><BarChart/>Activity Overview (Last Year)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                         <ChartContainer config={{}} className="w-full h-full">
                            <ResponsiveContainer>
                                <RechartsBarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" axisLine={false} tickLine={false} width={100} />
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                    <defs>
                                        <linearGradient id="activityBar" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.4}/>
                                        </linearGradient>
                                    </defs>
                                    <RechartsBar dataKey="value" fill="url(#activityBar)" radius={[0, 4, 4, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="glassmorphism glowing-shadow">
                     <CardHeader>
                        <CardTitle className="text-gradient-glow flex items-center gap-2"><Users/>Patient Feedback</CardTitle>
                    </CardHeader>
                     <CardContent className="h-[300px]">
                         <ChartContainer config={{}} className="w-full h-full">
                            <ResponsiveContainer>
                                <RechartsBarChart data={feedbackData}>
                                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)"/>
                                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis hide/>
                                    <Tooltip
                                        content={<ChartTooltipContent indicator="dot" />}
                                        cursor={{ fill: 'hsl(var(--primary)/0.1)' }}
                                        wrapperStyle={{ backgroundColor: 'hsl(var(--background)/0.8)', backdropFilter: 'blur(5px)', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                                    />
                                     <defs>
                                        <linearGradient id="feedbackBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
                                        </linearGradient>
                                    </defs>
                                    <RechartsBar dataKey="value" fill="url(#feedbackBar)" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
            
             <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow flex items-center gap-2"><Award/>Certificates & Achievements</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctor.certificates.map((cert, index) => (
                        <div key={index} className="glassmorphism p-4 rounded-lg transform transition-transform hover:scale-105 hover:shadow-primary/30">
                            <CheckCircle className="w-6 h-6 text-secondary mb-2" />
                            <p className="font-semibold text-white">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.institution} - {cert.year}</p>
                        </div>
                    ))}
                </CardContent>
             </Card>

        </div>
    );
}

const InfoCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex items-center gap-4 p-4 rounded-lg glassmorphism">
        <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-white">{