
"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Clock, Coffee, Send, BrainCircuit, BarChart, Bot, Search, Users, Stethoscope, Briefcase, AlertCircle, Eye, Calendar, MessageSquare, ChevronDown, ChevronUp, CheckCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';


// --- Enriched Dummy Data ---
const dummyPeopleData = {
    patients: [
        { id: 'P001', name: 'Anitha', age: 45, ward: 'Room 302', doctor: 'Dr. Rajesh', status: 'Stable', oxygen: 97, details: 'Recovering from minor surgery. Vitals stable.' },
        { id: 'P002', name: 'Karthik', age: 63, ward: 'ICU-2', doctor: 'Dr. Meena', status: 'Critical', oxygen: 85, details: 'Post-cardiac arrest. On ventilator support. Requires constant monitoring.' },
        { id: 'P003', name: 'Suresh', age: 55, ward: 'Ward A', doctor: 'Dr. Rajesh', status: 'Under Observation', oxygen: 94, details: 'Admitted with high fever. Awaiting blood culture results.' },
    ],
    doctors: [
        { id: 'D001', name: 'Dr. Rajesh', department: 'Cardiology', hours: '9AM–5PM', contact: '9876543210', availability: 'Available', patients: ['Suresh', 'Anitha'] },
        { id: 'D002', name: 'Dr. Meena', department: 'Neurology', hours: '10AM–6PM', contact: '9876501234', availability: 'Busy', patients: ['Karthik'] },
        { id: 'D003', name: 'Dr. Kumar', department: 'Pediatrics', hours: '8AM–4PM', contact: '9876501235', availability: 'Available', patients: [] },
    ],
    staff: [
        { id: 'S001', name: 'Priya', role: 'Nurse', shift: 'Night', department: 'ICU', contact: '9876003211', status: 'On Duty', assigned_patients: ['Karthik'] },
        { id: 'S002', name: 'John', role: 'Cleaner', shift: 'Morning', department: 'Ward-A', contact: '9876012234', status: 'Off Duty', assigned_patients: [] },
        { id: 'S003', name: 'Maria', role: 'Technician', shift: 'Afternoon', department: 'Radiology', contact: '9876012235', status: 'On Duty', assigned_patients: [] },
    ]
};

// --- Main Component ---
export function StaffManagement({ hospitalData }) {
    const [selectedDetail, setSelectedDetail] = useState<{type: 'patient' | 'doctor' | 'staff', data: any} | null>(null);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism glowing-shadow">
                <CardHeader>
                    <CardTitle className="text-gradient-glow text-2xl">People Management Hub</CardTitle>
                    <CardDescription>A real-time dashboard for monitoring patients, doctors, and staff.</CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="patients" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="patients"><Users className="mr-2"/>Patients</TabsTrigger>
                    <TabsTrigger value="doctors"><Stethoscope className="mr-2"/>Doctors</TabsTrigger>
                    <TabsTrigger value="staff"><Briefcase className="mr-2"/>Staff</TabsTrigger>
                </TabsList>
                <TabsContent value="patients">
                    <PatientsSection onRowClick={(patient) => setSelectedDetail({ type: 'patient', data: patient })} />
                </TabsContent>
                <TabsContent value="doctors">
                    <DoctorsSection onRowClick={(doctor) => setSelectedDetail({ type: 'doctor', data: doctor })} />
                </TabsContent>
                <TabsContent value="staff">
                    <StaffSection onRowClick={(staff) => setSelectedDetail({ type: 'staff', data: staff })} />
                </TabsContent>
            </Tabs>
            
            <DetailDialog
                isOpen={!!selectedDetail}
                onClose={() => setSelectedDetail(null)}
                details={selectedDetail}
            />
        </div>
    );
}

// --- Detail Dialog ---
function DetailDialog({ isOpen, onClose, details }) {
    if (!details) return null;
    
    let title = '', description = '', content = null;
    
    switch(details.type) {
        case 'patient':
            title = `Patient: ${details.data.name}`;
            description = `ID: ${details.data.id} - ${details.data.age}, ${details.data.ward}`;
            content = (
                <div className="space-y-4">
                    <p><strong>Health Status:</strong> {details.data.status}</p>
                    <p><strong>Oxygen Level:</strong> {details.data.oxygen}%</p>
                    <p><strong>Assigned Doctor:</strong> {details.data.doctor}</p>
                    <p><strong>Details:</strong> {details.data.details}</p>
                </div>
            );
            break;
        case 'doctor':
            title = `Doctor: ${details.data.name}`;
            description = `ID: ${details.data.id} - ${details.data.department}`;
            content = (
                 <div className="space-y-4">
                    <p><strong>Availability:</strong> {details.data.availability}</p>
                    <p><strong>Duty Hours:</strong> {details.data.hours}</p>
                    <p><strong>Contact:</strong> {details.data.contact}</p>
                    <p><strong>Assigned Patients:</strong> {details.data.patients.join(', ')}</p>
                </div>
            );
            break;
        case 'staff':
            title = `Staff: ${details.data.name}`;
            description = `ID: ${details.data.id} - ${details.data.role}, ${details.data.department}`;
            content = (
                <div className="space-y-4">
                    <p><strong>Shift:</strong> {details.data.shift}</p>
                    <p><strong>Status:</strong> {details.data.status}</p>
                    <p><strong>Contact:</strong> {details.data.contact}</p>
                    <p><strong>Assigned To:</strong> {details.data.assigned_patients.join(', ') || 'General Duty'}</p>
                </div>
            );
            break;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-gradient-glow text-2xl">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="py-4 text-white">
                    {content}
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// --- Patients Section ---
function PatientsSection({ onRowClick }) {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredPatients = useMemo(() => {
        return dummyPeopleData.patients.filter(p => 
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            p.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const getStatusConfig = (status) => {
        switch(status) {
            case 'Stable': return { color: 'bg-green-500/20 text-green-400', icon: CheckCircle };
            case 'Under Observation': return { color: 'bg-yellow-500/20 text-yellow-400', icon: Eye };
            case 'Critical': return { color: 'bg-red-500/20 text-red-500', icon: AlertCircle };
            default: return { color: 'bg-gray-500/20 text-gray-400', icon: User };
        }
    };

    return (
        <Card className="glassmorphism">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Live Patient Overview</CardTitle>
                    <div className="w-1/3 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search by name or ID..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Ward/Room</TableHead>
                            <TableHead>Doctor Assigned</TableHead>
                            <TableHead>Health Status</TableHead>
                            <TableHead>Oxygen Level</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPatients.map(patient => {
                            const statusConfig = getStatusConfig(patient.status);
                            return (
                                <TableRow key={patient.id} onClick={() => onRowClick(patient)} className="cursor-pointer">
                                    <TableCell className="font-mono">{patient.id}</TableCell>
                                    <TableCell className="font-semibold text-white">{patient.name}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.ward}</TableCell>
                                    <TableCell>{patient.doctor}</TableCell>
                                    <TableCell><Badge className={statusConfig.color}><statusConfig.icon className="w-3 h-3 mr-1"/>{patient.status}</Badge></TableCell>
                                    <TableCell>{patient.oxygen}%</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// --- Doctors Section ---
function DoctorsSection({ onRowClick }) {
    const [filter, setFilter] = useState({ department: 'All', availability: 'All' });
    const filteredDoctors = useMemo(() => {
        return dummyPeopleData.doctors.filter(d => 
            (filter.department === 'All' || d.department === filter.department) &&
            (filter.availability === 'All' || d.availability === filter.availability)
        );
    }, [filter]);
    const allDepartments = ['All', ...new Set(dummyPeopleData.doctors.map(d => d.department))];

    return (
        <Card className="glassmorphism">
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <CardTitle>Doctors on Duty</CardTitle>
                    <div className="flex gap-2">
                         <Select value={filter.department} onValueChange={(v) => setFilter(f => ({...f, department: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>{allDepartments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                         <Select value={filter.availability} onValueChange={(v) => setFilter(f => ({...f, availability: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Availability" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Busy">Busy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Doctor ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Duty Hours</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Availability</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDoctors.map(doctor => (
                            <TableRow key={doctor.id} onClick={() => onRowClick(doctor)} className="cursor-pointer">
                                <TableCell className="font-mono">{doctor.id}</TableCell>
                                <TableCell className="font-semibold text-white">{doctor.name}</TableCell>
                                <TableCell>{doctor.department}</TableCell>
                                <TableCell>{doctor.hours}</TableCell>
                                <TableCell><div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {doctor.contact}</div></TableCell>
                                <TableCell><Badge className={cn(doctor.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500')}>{doctor.availability}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

// --- Staff Section ---
function StaffSection({ onRowClick }) {
     const [filter, setFilter] = useState({ department: 'All', shift: 'All' });
    const filteredStaff = useMemo(() => {
        return dummyPeopleData.staff.filter(s => 
            (filter.department === 'All' || s.department === filter.department) &&
            (filter.shift === 'All' || s.shift === filter.shift)
        );
    }, [filter]);
    const allDepartments = ['All', ...new Set(dummyPeopleData.staff.map(s => s.department))];
    const allShifts = ['All', 'Morning', 'Afternoon', 'Night'];

    const getShiftColor = (shift) => {
        switch(shift) {
            case 'Morning': return 'bg-yellow-500/20 text-yellow-400';
            case 'Afternoon': return 'bg-blue-500/20 text-blue-400';
            case 'Night': return 'bg-purple-500/20 text-purple-400';
            default: return 'bg-gray-500/20';
        }
    };

    return (
        <Card className="glassmorphism">
            <CardHeader>
                 <div className="flex justify-between items-center">
                    <CardTitle>General Staff</CardTitle>
                    <div className="flex gap-2">
                         <Select value={filter.department} onValueChange={(v) => setFilter(f => ({...f, department: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
                            <SelectContent>{allDepartments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                        </Select>
                         <Select value={filter.shift} onValueChange={(v) => setFilter(f => ({...f, shift: v}))}>
                            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Shift" /></SelectTrigger>
                            <SelectContent>{allShifts.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Staff ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Shift</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStaff.map(staff => (
                            <TableRow key={staff.id} onClick={() => onRowClick(staff)} className="cursor-pointer">
                                <TableCell className="font-mono">{staff.id}</TableCell>
                                <TableCell className="font-semibold text-white">{staff.name}</TableCell>
                                <TableCell>{staff.role}</TableCell>
                                <TableCell><Badge className={getShiftColor(staff.shift)}>{staff.shift}</Badge></TableCell>
                                <TableCell>{staff.department}</TableCell>
                                <TableCell><div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {staff.contact}</div></TableCell>
                                <TableCell><Badge className={cn(staff.status === 'On Duty' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500')}>{staff.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

    
