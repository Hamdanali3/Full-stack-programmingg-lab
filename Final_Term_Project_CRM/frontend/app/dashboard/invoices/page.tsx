"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";
import { getApiError } from "@/lib/api";
import { customerService } from "@/services/customerService";
import { invoiceService } from "@/services/invoiceService";
import type { Customer } from "@/types";

export default function InvoicesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(1000);
  const [summary, setSummary] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now()}`);

  useEffect(() => {
    customerService
      .list()
      .then((data) => {
        setCustomers(data.customers);
        setCustomerId(data.customers[0]?._id || "");
      })
      .catch((error) => toast.error(getApiError(error)));
  }, []);

  const selectedCustomer = useMemo(() => customers.find((customer) => customer._id === customerId), [customerId, customers]);
  const total = quantity * unitPrice;

  const downloadPdf = (numberToUse = invoiceNumber) => {
    if (!selectedCustomer) {
      toast.error("Select a customer first");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Customer Relationship Management System", 14, 18);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${numberToUse}`, 14, 32);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);
    doc.text(`Customer: ${selectedCustomer.fullName}`, 14, 54);
    doc.text(`Email: ${selectedCustomer.email}`, 14, 62);
    doc.text(`Phone: ${selectedCustomer.phone}`, 14, 70);
    doc.text(`Company: ${selectedCustomer.company}`, 14, 78);
    doc.text(`Service: ${serviceTitle}`, 14, 96);
    doc.text(`Description: ${serviceDescription || "N/A"}`, 14, 104);
    doc.text(`Quantity: ${quantity}`, 14, 118);
    doc.text(`Unit Price: ${unitPrice}`, 14, 126);
    doc.text(`Total Amount: ${total}`, 14, 138);
    doc.text(`Summary: ${summary || "N/A"}`, 14, 154);
    doc.text("Prepared by: HAMDAN ALI", 14, 180);
    doc.save(`${numberToUse}.pdf`);
    toast.success("Invoice PDF downloaded");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await invoiceService.create({
        customer: customerId,
        serviceTitle,
        serviceDescription,
        quantity,
        unitPrice,
        summary
      });
      setInvoiceNumber(data.invoice.invoiceNumber);
      toast.success("Invoice generated");
      downloadPdf(data.invoice.invoiceNumber);
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <>
      <PageHeader title="Invoice Generation" subtitle="Create customer invoices, preview totals, and download PDF files." />
      <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <form className="panel grid gap-4 p-5" onSubmit={submit}>
          <div>
            <label className="label">Customer</label>
            <select className="field" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.fullName} - {customer.company}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Service title</label>
            <input className="field" value={serviceTitle} onChange={(e) => setServiceTitle(e.target.value)} required />
          </div>
          <div>
            <label className="label">Service description</label>
            <textarea className="field min-h-24" value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Quantity</label>
              <input className="field" min={1} type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div>
              <label className="label">Unit price</label>
              <input className="field" min={0} type="number" value={unitPrice} onChange={(e) => setUnitPrice(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="label">Summary</label>
            <textarea className="field min-h-24" value={summary} onChange={(e) => setSummary(e.target.value)} />
          </div>
          <button className="btn-primary" type="submit">
            Generate and Download PDF
          </button>
        </form>

        <aside className="panel p-5">
          <p className="text-sm font-bold uppercase text-brand">Invoice Preview</p>
          <h3 className="mt-2 text-xl font-bold">{invoiceNumber}</h3>
          <div className="mt-5 space-y-3 text-sm">
            <p>
              <span className="font-semibold">Customer:</span> {selectedCustomer?.fullName || "Select customer"}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {selectedCustomer?.email || "-"}
            </p>
            <p>
              <span className="font-semibold">Service:</span> {serviceTitle || "-"}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {quantity}
            </p>
            <p>
              <span className="font-semibold">Unit price:</span> {unitPrice}
            </p>
            <p className="border-t border-line pt-3 text-lg font-bold">Total: {total}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
