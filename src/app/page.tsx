"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start w-full max-w-3xl">
        <ChatInterface />
      </main>
      <MadeWithDyad />
    </div>
  );
}