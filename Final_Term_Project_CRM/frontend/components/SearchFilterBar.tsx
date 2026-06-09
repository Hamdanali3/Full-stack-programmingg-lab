import type { CustomerStatus } from "@/types";

export default function SearchFilterBar({
  search,
  setSearch,
  status,
  setStatus
}: {
  search: string;
  setSearch: (value: string) => void;
  status: "" | CustomerStatus;
  setStatus: (value: "" | CustomerStatus) => void;
}) {
  return (
    <div className="panel mb-4 grid gap-3 p-4 md:grid-cols-[1fr_220px]">
      <input
        className="field"
        placeholder="Search customers by name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <select className="field" value={status} onChange={(event) => setStatus(event.target.value as "" | CustomerStatus)}>
        <option value="">All statuses</option>
        <option value="Lead">Lead</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}
