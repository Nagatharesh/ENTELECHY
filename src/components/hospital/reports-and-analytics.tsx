
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, DollarSign, BedDouble, Clock, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StatCard = ({ icon: Icon, title, value, unit='' }) => (
    <Card className="glassmorphism p-6 flex items-center gap-6 transform transition-transform hover:-translate-y-2">
        <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
            <p className="text-3xl font-bold text-gradient-glow">{value.toLocaleString()}<span className="text-lg text-muted-foreground ml-1">{unit}</span></p>
            <p className="text-sm text-muted-foreground">{title}</p>
        </div>
    </Card>
);

export function ReportsAndAnalytics({ hospitalData }) {
    const { analytics } = hospitalData;
    const [departmentFilter, setDepartmentFilter] = useState('All');

    const filteredDepartments = departmentFilter === 'All' 
        ? analytics.departmentAnalytics 
        : analytics.departmentAnalytics.filter(d => d.department === departmentFilter);
    
    const allDepartments = ['All', ...analytics.departmentAnalytics.map(d => d.department)];

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">Reports &amp; Analytics Dashboard</CardTitle>
                    <CardDescription>A comprehensive overview of hospital performance metrics.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Total Admissions" value={analytics.totalAdmissions} />
                <StatCard icon={DollarSign} title="Total Revenue" value={analytics.revenue.reduce((acc, curr) => acc + curr.amount, 0) / 100000} unit="Lakhs" />
                <StatCard icon={BedDouble} title="Bed Occupancy" value={`${analytics.bedOccupancyRate}%`} />
                <StatCard icon={Clock} title="Avg. Stay" value={analytics.avgStayDays} unit="days" />
            </div>

            <Card className="glassmorphism glowing-shadow">
                <CardHeader className="flex-row justify-between items-center">
                    <div>
                        <CardTitle className="text-white">Department-wise Performance</CardTitle>
                        <CardDescription>Filter by department to see detailed metrics.</CardDescription>
                    </div>
                     <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {allDepartments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Department</TableHead>
                                <TableHead className="text-right">Patients</TableHead>
                                <TableHead className="text-right">Revenue (Lakhs)</TableHead>
                                <TableHead className="text-right">Satisfaction</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDepartments.map(dept => (
                                <TableRow key={dept.department}>
                                    <TableCell className="font-medium text-white">{dept.department}</TableCell>
                                    <TableCell className="text-right font-mono">{dept.patients.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-mono">₹{(dept.revenue / 100000).toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-mono flex justify-end items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        {dept.satisfaction}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
