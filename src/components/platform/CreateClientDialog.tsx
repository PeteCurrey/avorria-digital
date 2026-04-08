'use client';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { useCreateClient } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";

const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  industry: z.string().max(100, "Industry must be less than 100 characters").optional(),
  monthly_value: z.string().max(50, "Monthly value must be less than 50 characters").optional(),
  status: z.string().default("onboarding"),
  owner_name: z.string().max(100, "Owner name must be less than 100 characters").optional(),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

const AVAILABLE_SERVICES = ["SEO", "Paid Media", "Web Design", "Analytics", "Content", "Email"];

interface CreateClientDialogProps {
  trigger?: React.ReactNode;
}

export function CreateClientDialog({ trigger }: CreateClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const createClient = useCreateClient();

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      industry: "",
      monthly_value: "",
      status: "onboarding",
      owner_name: "",
      notes: "",
    },
  });

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const onSubmit = async (data: ClientFormData) => {
    try {
      await createClient.mutateAsync({
        name: data.name,
        industry: data.industry || undefined,
        services: selectedServices,
        monthly_value: data.monthly_value || undefined,
        status: data.status,
        owner_name: data.owner_name || undefined,
        notes: data.notes || undefined,
      });
      
      toast({
        title: "Client created",
        description: `${data.name} has been added to your portfolio.`,
      });
      
      setOpen(false);
      form.reset();
      setSelectedServices([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create client. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client in your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Acme Corporation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. B2B SaaS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Services</FormLabel>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SERVICES.map((service) => (
                  <Badge
                    key={service}
                    variant={selectedServices.includes(service) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleService(service)}
                  >
                    {service}
                    {selectedServices.includes(service) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="monthly_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Value</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. £5k-8k" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Owner</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alex Morgan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional notes about this client..."
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createClient.isPending}>
                {createClient.isPending ? "Creating..." : "Create Client"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

