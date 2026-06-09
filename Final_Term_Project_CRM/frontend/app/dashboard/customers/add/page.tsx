"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomerForm from "@/components/CustomerForm";
import PageHeader from "@/components/PageHeader";
import { getApiError } from "@/lib/api";
import { customerService } from "@/services/customerService";
import type { CustomerPayload } from "@/types";

export default function AddCustomerPage() {
  const router = useRouter();

  const submit = async (payload: CustomerPayload) => {
    try {
      await customerService.create(payload);
      toast.success("Customer added");
      router.push("/dashboard/customers");
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <PageHeader title="Add Customer" subtitle="Create a new customer record for the CRM database." />
      <CustomerForm onSubmit={submit} submitLabel="Add Customer" />
    </>
  );
}
