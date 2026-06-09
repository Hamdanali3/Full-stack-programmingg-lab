"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import CustomerTable from "@/components/CustomerTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";
import SearchFilterBar from "@/components/SearchFilterBar";
import { getApiError } from "@/lib/api";
import { customerService } from "@/services/customerService";
import type { Customer, CustomerStatus } from "@/types";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | CustomerStatus>("");
  const [loading, setLoading] = useState(true);

  const loadCustomers = useCallback(() => {
    setLoading(true);
    customerService
      .list({ search, status })
      .then((data) => setCustomers(data.customers))
      .catch((error) => toast.error(getApiError(error)))
      .finally(() => setLoading(false));
  }, [search, status]);

  useEffect(() => {
    const timer = window.setTimeout(loadCustomers, 250);
    return () => window.clearTimeout(timer);
  }, [loadCustomers]);

  const deleteCustomer = async (customer: Customer) => {
    const confirmed = window.confirm(`Delete ${customer.fullName}? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await customerService.remove(customer._id);
      toast.success("Customer deleted");
      loadCustomers();
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Manage customer records with search, status filtering, and CRUD actions."
        actions={
          <Link className="btn-primary" href="/dashboard/customers/add">
            <Plus size={16} />
            Add Customer
          </Link>
        }
      />
      <SearchFilterBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
      {loading ? <LoadingSpinner label="Loading customers" /> : <CustomerTable customers={customers} onDelete={deleteCustomer} />}
    </>
  );
}
