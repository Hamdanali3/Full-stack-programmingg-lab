import api from "@/lib/api";
import type { CustomerPayload } from "@/types";

export const customerService = {
  list: (params?: { search?: string; status?: string }) =>
    api.get("/customers", { params }).then((res) => res.data),
  get: (id: string) => api.get(`/customers/${id}`).then((res) => res.data),
  create: (payload: CustomerPayload) => api.post("/customers", payload).then((res) => res.data),
  update: (id: string, payload: CustomerPayload) =>
    api.put(`/customers/${id}`, payload).then((res) => res.data),
  remove: (id: string) => api.delete(`/customers/${id}`).then((res) => res.data)
};
