"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ChatMessage } from "./chat-message"; // Import the updated ChatMessage

interface Message {
  role: "user" | "agent";
  content: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: "Hello! I'm your Medical Assistant Agent. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const backendUrl = "https://167aliraza-medical-assistant.hf.space/chat";

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const agentResponse: Message = { role: "agent", content: data.response || data.error || "An unexpected error occurred." };
      setMessages((prevMessages) => [...prevMessages, agentResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "agent", content: "I'm sorry, I couldn't process your request. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-3xl h-[80vh] flex flex-col shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground p-4 border-b">
        <CardTitle className="text-xl font-semibold">Medical Assistant Agent</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start items-center space-x-2">
                <Bot className="h-6 w-6 text-accent-foreground" />
                <div className="bg-muted p-3 rounded-lg max-w-[70%] animate-pulse">
                  <div className="h-4 bg-muted-foreground rounded w-24"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-background flex items-center space-x-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSendMessage();
            }
          }}
          disabled={loading}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} disabled={loading} className="shrink-0">
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span className="sr-only">Send message</span>
        </Button>
      </CardFooter>
    </Card>
  );
};