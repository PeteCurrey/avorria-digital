import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface Payment {
  id: string;
  invoice_id: string;
  amount: number;
  payment_method: string | null;
  transaction_id: string | null;
  paid_at: string;
  notes: string | null;
  metadata: Json;
  created_at: string;
}

export interface CreatePaymentData {
  invoice_id: string;
  amount: number;
  payment_method?: string;
  transaction_id?: string;
  paid_at?: string;
  notes?: string;
  metadata?: Json;
}

// Fetch payments for an invoice
export function useInvoicePayments(invoiceId: string | undefined) {
  return useQuery({
    queryKey: ["payments", invoiceId],
    queryFn: async () => {
      if (!invoiceId) return [];

      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("invoice_id", invoiceId)
        .order("paid_at", { ascending: false });

      if (error) throw error;
      return data as Payment[];
    },
    enabled: !!invoiceId,
  });
}

// Admin: Fetch all payments
export function useAllPayments() {
  return useQuery({
    queryKey: ["payments", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          invoice:invoices(invoice_number, client:clients(name))
        `)
        .order("paid_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

// Create payment and update invoice status
export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentData: CreatePaymentData) => {
      // Create payment
      const { data: payment, error: paymentError } = await supabase
        .from("payments")
        .insert(paymentData)
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Check if invoice is fully paid
      const { data: invoice } = await supabase
        .from("invoices")
        .select("amount")
        .eq("id", paymentData.invoice_id)
        .single();

      const { data: allPayments } = await supabase
        .from("payments")
        .select("amount")
        .eq("invoice_id", paymentData.invoice_id);

      const totalPaid = allPayments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

      if (invoice && totalPaid >= Number(invoice.amount)) {
        // Mark invoice as paid
        await supabase
          .from("invoices")
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", paymentData.invoice_id);
      }

      return payment;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Payment recorded successfully");
    },
    onError: (error) => {
      toast.error("Failed to record payment: " + error.message);
    },
  });
}

// Update payment
export function useUpdatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreatePaymentData>;
    }) => {
      const { data, error } = await supabase
        .from("payments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success("Payment updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update payment: " + error.message);
    },
  });
}
