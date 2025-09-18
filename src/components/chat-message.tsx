"use client";

import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { parseAgentResponse } from "@/lib/message-parser";
import { DoctorList } from "./doctor-list";
import { BookingConfirmationDisplay } from "./booking-confirmation";

interface Message {
  role: "user" | "agent";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const parsedContent = parseAgentResponse(message.content);

  const renderContent = () => {
    if (isUser) {
      return <p className="text-sm break-words">{message.content}</p>;
    }

    switch (parsedContent.type) {
      case "doctor_list":
        return <DoctorList doctors={parsedContent.data as any[]} />;
      case "booking_confirmation":
        return <BookingConfirmationDisplay confirmation={parsedContent.data as any} />;
      case "text":
      default:
        return <p className="text-sm break-words">{message.content}</p>;
    }
  };

  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Bot className="h-6 w-6 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "p-3 rounded-lg max-w-[70%] shadow-md", // Added shadow-md here
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-muted-foreground rounded-bl-none",
          parsedContent.type !== "text" && "p-0 bg-transparent shadow-none border-none" // Remove padding/background for structured components
        )}
      >
        {renderContent()}
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <User className="h-6 w-6 text-primary" /> {/* Changed user icon color to primary */}
        </div>
      )}
    </div>
  );
};