import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, CalendarDays, Stethoscope } from "lucide-react";
import { Doctor } from "@/lib/message-parser";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const isBooked = doctor.isBooked.toLowerCase() === "true";

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{doctor.name}</CardTitle>
        <Badge variant={isBooked ? "destructive" : "default"}>
          {isBooked ? "Booked" : "Available"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-primary" />
          <span>{doctor.specialty}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{doctor.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <span>{doctor.contact}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span>{doctor.availability}</span>
        </div>
        {isBooked && doctor.bookedBy && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Booked by: {doctor.bookedBy}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};