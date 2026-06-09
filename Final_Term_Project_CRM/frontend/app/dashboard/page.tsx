"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bot, FileText, Plus, Users } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";
import { getApiError } from "@/lib/api";
import { customerService } from "@/services/customerService";
import type { Customer } from "@/types";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerService
      .list()
      .then((data) => setCustomers(data.customers))
      .catch((error) => toast.error(getApiError(error)))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(
    () => [
      { label: "Total customers", value: customers.length, color: "bg-slate-900" },
      { label: "Active customers", value: customers.filter((item) => item.status === "Active").length, color: "bg-brand" },
      { label: "Lead customers", value: customers.filter((item) => item.status === "Lead").length, color: "bg-amber-600" },
      { label: "Inactive customers", value: customers.filter((item) => item.status === "Inactive").length, color: "bg-slate-500" }
    ],
    [customers]
  );

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor customers, statuses, invoices, and CRM navigation from one place."
        actions={
          <Link className="btn-primary" href="/dashboard/customers/add">
            <Plus size={16} />
            Add Customer
          </Link>
        }
      />

      {loading ? (
        <LoadingSpinner label="Loading dashboard" />
      ) : (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article className="panel p-5" key={stat.label}>
                <span className={`mb-4 block h-1 w-12 rounded-full ${stat.color}`} />
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-ink">{stat.value}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Link className="panel p-5 transition hover:border-brand" href="/dashboard/customers">
              <Users className="text-brand" />
              <h3 className="mt-4 font-bold">Customer Management</h3>
              <p className="mt-2 text-sm text-slate-600">View, search, filter, add, edit, and delete customer records.</p>
            </Link>
            <Link className="panel p-5 transition hover:border-brand" href="/dashboard/invoices">
              <FileText className="text-brand" />
              <h3 className="mt-4 font-bold">Invoice Generation</h3>
              <p className="mt-2 text-sm text-slate-600">Generate customer invoices and download them as PDF files.</p>
            </Link>
            <Link className="panel p-5 transition hover:border-brand" href="/dashboard/chatbot">
              <Bot className="text-brand" />
              <h3 className="mt-4 font-bold">Rule-Based Chatbot</h3>
              <p className="mt-2 text-sm text-slate-600">Use predefined CRM commands for quick navigation help.</p>
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
