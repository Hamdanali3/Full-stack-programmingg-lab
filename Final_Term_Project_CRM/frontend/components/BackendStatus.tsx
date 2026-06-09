"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

export default function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    const healthUrl = `${API_BASE_URL.replace(/\/api\/?$/, "")}/api/health`;

    axios
      .get(healthUrl, { timeout: 4000 })
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);

  if (status === "online") {
    return null;
  }

  return (
    <div
      className={`mb-5 rounded-md border px-4 py-3 text-sm ${
        status === "checking" ? "border-line bg-slate-50 text-slate-600" : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {status === "checking"
        ? "Checking backend connection..."
        : `Backend is not reachable at ${API_BASE_URL}. Start backend with npm run dev and make sure MongoDB is running.`}
    </div>
  );
}
