'use client';
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateCampaign } from "@/hooks/useCampaigns";
import { useClients } from "@/hooks/useClients";
import { toast } from "@/hooks/use-toast";

const campaignSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(150, "Name must be less than 150 characters"),
  client_id: z.string().optional(),
  channel: z.string().min(1, "Channel is required"),
  objective: z.string().max(200, "Objective must be less than 200 characters").optional(),
  status: z.string().default("planned"),
  budget: z.string().optional(),
  next_review: z.date().optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

const CHANNELS = ["Google Ads", "Meta Ads", "LinkedIn Ads", "SEO", "Email", "Content", "Display"];
const OBJECTIVES = ["Lead generation", "Awareness", "Retargeting", "Conversion", "Traffic", "Engagement"];

interface CreateCampaignDialogProps {
  trigger?: React.ReactNode;
  defaultClientId?: string;
}

export function CreateCampaignDialog({ trigger, defaultClientId }: CreateCampaignDialogProps) {
  const [open, setOpen] = useState(false);
  const createCampaign = useCreateCampaign();
  const { data: clients } = useClients();

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      client_id: defaultClientId || "",
      channel: "",
      objective: "",
      status: "planned",
      budget: "",
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    try {
      const selectedClient = clients?.find(c => c.id === data.client_id);
      
      await createCampaign.mutateAsync({
        name: data.name,
        client_id: data.client_id || undefined,
        client_name: selectedClient?.name || undefined,
        channel: data.channel,
        objective: data.objective || undefined,
        status: data.status,
        budget: data.budget ? parseFloat(data.budget) : undefined,
        next_review: data.next_review ? format(data.next_review, 'yyyy-MM-dd') : undefined,
      });
      
      toast({
        title: "Campaign created",
        description: `${data.name} has been created successfully.`,
      });
      
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
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
            Add Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Add a new campaign to track performance.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Q1 Brand Awareness" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                      {(!clients || clients.length === 0) && (
                        <SelectItem value="none" disabled>
                          No clients available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CHANNELS.map((channel) => (
                        <SelectItem key={channel} value={channel}>
                          {channel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objective</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OBJECTIVES.map((objective) => (
                        <SelectItem key={objective} value={objective}>
                          {objective}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (Â£)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g. 5000" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="next_review"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Next Review Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createCampaign.isPending}>
                {createCampaign.isPending ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


