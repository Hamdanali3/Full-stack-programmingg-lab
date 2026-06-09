"use client";

import { FormEvent, useState } from "react";
import AuthCard from "@/components/AuthCard";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await register(name, email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Create your CRM account" footer="login">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <input className="field" id="name" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input className="field" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="field"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <button className="btn-primary w-full" disabled={submitting} type="submit">
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </AuthCard>
  );
}
