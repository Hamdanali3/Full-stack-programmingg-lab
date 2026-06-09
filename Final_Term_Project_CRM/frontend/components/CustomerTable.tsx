"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { Customer } from "@/types";
import StatusBadge from "@/components/StatusBadge";

export default function CustomerTable({
  customers,
  onDelete
}: {
  customers: Customer[];
  onDelete: (customer: Customer) => void;
}) {
  if (!customers.length) {
    return <div className="panel p-8 text-center text-sm text-slate-600">No customers match the current search or filter.</div>;
  }

  return (
    <div className="panel overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{customer.fullName}</p>
                  <p className="text-slate-500">{customer.email}</p>
                </td>
                <td className="px-4 py-3">{customer.company}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={customer.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link className="btn-secondary px-3" href={`/dashboard/customers/${customer._id}/edit`}>
                      <Pencil size={16} />
                    </Link>
                    <button className="btn-danger px-3" onClick={() => onDelete(customer)} type="button">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 p-3 md:hidden">
        {customers.map((customer) => (
          <article className="rounded-md border border-line p-4" key={customer._id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{customer.fullName}</h3>
                <p className="text-sm text-slate-500">{customer.company}</p>
              </div>
              <StatusBadge status={customer.status} />
            </div>
            <p className="mt-3 text-sm text-slate-600">{customer.email}</p>
            <p className="text-sm text-slate-600">{customer.phone}</p>
            <div className="mt-4 flex gap-2">
              <Link className="btn-secondary flex-1" href={`/dashboard/customers/${customer._id}/edit`}>
                Edit
              </Link>
              <button className="btn-danger flex-1" onClick={() => onDelete(customer)} type="button">
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
