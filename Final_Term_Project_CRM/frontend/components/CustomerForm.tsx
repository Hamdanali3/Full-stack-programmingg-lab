"use client";

import { FormEvent, useState } from "react";
import type { Customer, CustomerPayload, CustomerStatus } from "@/types";

const emptyCustomer: CustomerPayload = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  status: "Lead",
  notes: ""
};

export default function CustomerForm({
  initialCustomer,
  onSubmit,
  submitLabel
}: {
  initialCustomer?: Customer;
  onSubmit: (payload: CustomerPayload) => Promise<void>;
  submitLabel: string;
}) {
  const [form, setForm] = useState<CustomerPayload>(
    initialCustomer
      ? {
          fullName: initialCustomer.fullName,
          email: initialCustomer.email,
          phone: initialCustomer.phone,
          company: initialCustomer.company,
          address: initialCustomer.address,
          status: initialCustomer.status,
          notes: initialCustomer.notes || ""
        }
      : emptyCustomer
  );
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof CustomerPayload, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="panel grid gap-4 p-5 md:grid-cols-2" onSubmit={submit}>
      <div>
        <label className="label">Full name</label>
        <input className="field" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required minLength={2} />
      </div>
      <div>
        <label className="label">Email</label>
        <input className="field" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
      </div>
      <div>
        <label className="label">Phone</label>
        <input className="field" value={form.phone} onChange={(e) => update("phone", e.target.value)} required minLength={7} />
      </div>
      <div>
        <label className="label">Company</label>
        <input className="field" value={form.company} onChange={(e) => update("company", e.target.value)} required />
      </div>
      <div>
        <label className="label">Status</label>
        <select className="field" value={form.status} onChange={(e) => update("status", e.target.value as CustomerStatus)}>
          <option value="Lead">Lead</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="label">Address</label>
        <input className="field" value={form.address} onChange={(e) => update("address", e.target.value)} required />
      </div>
      <div className="md:col-span-2">
        <label className="label">Notes</label>
        <textarea className="field min-h-28" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
      </div>
      <div className="md:col-span-2">
        <button className="btn-primary" disabled={submitting} type="submit">
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
