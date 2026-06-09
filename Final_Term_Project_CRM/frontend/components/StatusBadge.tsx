import type { CustomerStatus } from "@/types";

const styles: Record<CustomerStatus, string> = {
  Lead: "bg-amber-100 text-amber-800",
  Active: "bg-emerald-100 text-emerald-800",
  Inactive: "bg-slate-200 text-slate-700"
};

export default function StatusBadge({ status }: { status: CustomerStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
