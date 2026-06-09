"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomerForm from "@/components/CustomerForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageHeader from "@/components/PageHeader";
import { getApiError } from "@/lib/api";
import { customerService } from "@/services/customerService";
import type { Customer, CustomerPayload } from "@/types";

export default function EditCustomerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customerService
      .get(params.id)
      .then((data) => setCustomer(data.customer))
      .catch((error) => toast.error(getApiError(error)))
      .finally(() => setLoading(false));
  }, [params.id]);

  const submit = async (payload: CustomerPayload) => {
    try {
      await customerService.update(params.id, payload);
      toast.success("Customer updated");
      router.push("/dashboard/customers");
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <PageHeader title="Edit Customer" subtitle="Update customer details and status information." />
      {loading ? <LoadingSpinner label="Loading customer" /> : customer ? <CustomerForm initialCustomer={customer} onSubmit={submit} submitLabel="Update Customer" /> : null}
    </>
  );
}
