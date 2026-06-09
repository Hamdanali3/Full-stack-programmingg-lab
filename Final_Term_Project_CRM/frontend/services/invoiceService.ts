import api from "@/lib/api";
import type { InvoicePayload } from "@/types";

export const invoiceService = {
  create: (payload: InvoicePayload) => api.post("/invoices", payload).then((res) => res.data),
  list: () => api.get("/invoices").then((res) => res.data)
};
