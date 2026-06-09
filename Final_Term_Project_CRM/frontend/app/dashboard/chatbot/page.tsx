"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatbotPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Type help to see available CRM commands." }
  ]);

  const respond = (command: string) => {
    const normalized = command.trim().toLowerCase();
    const responses: Record<string, string> = {
      help: "I can help you view customers, add customers, open invoices, and check customer statuses.",
      "show customers": "Opening the customer list for you.",
      "add customer": "Redirecting you to the Add Customer page.",
      "open invoice": "Opening the Invoice Generation module.",
      "customer status": "Customer statuses are Lead, Active, and Inactive.",
      logout: "Please use the logout button in the dashboard sidebar."
    };

    if (normalized === "show customers") router.push("/dashboard/customers");
    if (normalized === "add customer") router.push("/dashboard/customers/add");
    if (normalized === "open invoice") router.push("/dashboard/invoices");

    return responses[normalized] || "Sorry, I can only respond to predefined CRM commands. Type help to see available commands.";
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };
    const botMessage: Message = { from: "bot", text: respond(input) };
    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      <PageHeader title="Rule-Based Chatbot" subtitle="Use predefined commands only. No external AI API is used." />
      <section className="panel mx-auto max-w-3xl overflow-hidden">
        <div className="h-[460px] space-y-3 overflow-y-auto bg-slate-50 p-4">
          {messages.map((message, index) => (
            <div className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`} key={`${message.from}-${index}`}>
              <p
                className={`max-w-[82%] rounded-lg px-4 py-3 text-sm ${
                  message.from === "user" ? "bg-brand text-white" : "border border-line bg-white text-slate-700"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <form className="flex gap-3 border-t border-line p-4" onSubmit={submit}>
          <input
            className="field"
            placeholder="Type: help, show customers, add customer, open invoice, customer status, logout"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="btn-primary" type="submit">
            Send
          </button>
        </form>
      </section>
    </>
  );
}
