import React from "react";
import { DoctorCard } from "./doctor-card";
import { Doctor } from "@/lib/message-parser";

interface DoctorListProps {
  doctors: Doctor[];
}

export const DoctorList = ({ doctors }: DoctorListProps) => {
  if (!doctors || doctors.length === 0) {
    return <p className="text-sm text-muted-foreground">No doctors found for this specialty.</p>;
  }

  return (
    <div className="grid gap-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};