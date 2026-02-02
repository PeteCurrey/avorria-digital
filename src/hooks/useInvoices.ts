import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Invoice {
  id: string;
  client_id: string;
  project_id: string | null;
  user_id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  paid_at: string | null;
  line_items: InvoiceLineItem[];
  notes: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  client?: {
    name: string;
  };
  project?: {
    name: string;
  } | null;
}

export interface CreateInvoiceData {
  client_id: string;
  project_id?: string;
  user_id: string;
  invoice_number: string;
  amount: number;
  currency?: string;
  status?: InvoiceStatus;
  issue_date?: string;
  due_date: string;
  line_items: Json;
  notes?: string;
}

// Admin: Fetch all invoices
export function useAllInvoices() {
  return useQuery({
    queryKey: ["invoices", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          client:clients(name),
          project:client_projects(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(d => ({
        ...d,
        line_items: (d.line_items || []) as unknown as InvoiceLineItem[],
      })) as Invoice[];
    },
  });
}

// Client: Fetch their own invoices
export function useMyInvoices() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoices", "my", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          client:clients(name),
          project:client_projects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).map(d => ({
        ...d,
        line_items: (d.line_items || []) as unknown as InvoiceLineItem[],
      })) as Invoice[];
    },
    enabled: !!user?.id,
  });
}

// Fetch single invoice
export function useInvoice(invoiceId: string | undefined) {
  return useQuery({
    queryKey: ["invoices", invoiceId],
    queryFn: async () => {
      if (!invoiceId) return null;

      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          client:clients(name),
          project:client_projects(name)
        `)
        .eq("id", invoiceId)
        .single();

      if (error) throw error;
      return {
        ...data,
        line_items: (data.line_items || []) as unknown as InvoiceLineItem[],
      } as Invoice;
    },
    enabled: !!invoiceId,
  });
}

// Create invoice
export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceData: CreateInvoiceData) => {
      const { data, error } = await supabase
        .from("invoices")
        .insert(invoiceData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create invoice: " + error.message);
    },
  });
}

// Update invoice
export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateInvoiceData>;
    }) => {
      const { data, error } = await supabase
        .from("invoices")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update invoice: " + error.message);
    },
  });
}

// Delete invoice
export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete invoice: " + error.message);
    },
  });
}

// Invoice stats
export function useInvoiceStats() {
  return useQuery({
    queryKey: ["invoices", "stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("invoices").select("*");

      if (error) throw error;

      const stats = {
        total: data.length,
        totalValue: data.reduce((sum, inv) => sum + Number(inv.amount), 0),
        paid: data.filter((inv) => inv.status === "paid").length,
        paidValue: data
          .filter((inv) => inv.status === "paid")
          .reduce((sum, inv) => sum + Number(inv.amount), 0),
        outstanding: data.filter((inv) => inv.status === "sent").length,
        outstandingValue: data
          .filter((inv) => inv.status === "sent")
          .reduce((sum, inv) => sum + Number(inv.amount), 0),
        overdue: data.filter((inv) => inv.status === "overdue").length,
        overdueValue: data
          .filter((inv) => inv.status === "overdue")
          .reduce((sum, inv) => sum + Number(inv.amount), 0),
      };

      return stats;
    },
  });
}

// Generate invoice number
export function generateInvoiceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AVR-${year}${month}-${random}`;
}
