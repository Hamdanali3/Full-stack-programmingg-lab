"use client";

import { FormEvent, useState } from "react";
import AuthCard from "@/components/AuthCard";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Login to your dashboard" footer="register">
      <form className="space-y-4" onSubmit={onSubmit}>
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
            required
          />
        </div>
        <button className="btn-primary w-full" disabled={submitting} type="submit">
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthCard>
  );
}
