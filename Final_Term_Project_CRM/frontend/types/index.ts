export type User = {
  id: string;
  name: string;
  email: string;
};

export type CustomerStatus = "Lead" | "Active" | "Inactive";

export type Customer = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: CustomerStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerPayload = Omit<Customer, "_id" | "createdAt" | "updatedAt">;

export type InvoicePayload = {
  customer: string;
  serviceTitle: string;
  serviceDescription: string;
  quantity: number;
  unitPrice: number;
  summary: string;
};
