import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { BookingConfirmation } from "@/lib/message-parser";
import { DoctorCard } from "./doctor-card";

interface BookingConfirmationProps {
  confirmation: BookingConfirmation;
}

export const BookingConfirmationDisplay = ({ confirmation }: BookingConfirmationProps) => {
  const isSuccess = confirmation.status === "success";
  const Icon = isSuccess ? CheckCircle : XCircle;
  const iconColorClass = isSuccess ? "text-green-500" : "text-red-500";

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <Icon className={`h-6 w-6 ${iconColorClass}`} />
        <CardTitle className="text-lg font-semibold">
          {isSuccess ? "Appointment Confirmed!" : "Booking Failed"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{confirmation.message}</p>
        {confirmation.doctor_info && (
          <div className="pt-2 border-t mt-3">
            <h4 className="font-medium text-foreground mb-2">Doctor Details:</h4>
            <DoctorCard doctor={confirmation.doctor_info} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};