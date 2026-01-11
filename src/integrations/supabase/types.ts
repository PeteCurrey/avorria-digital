export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string
          handoff_completed: boolean | null
          handoff_requested: boolean | null
          id: string
          lead_id: string | null
          messages: Json | null
          sentiment: string | null
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          handoff_completed?: boolean | null
          handoff_requested?: boolean | null
          id?: string
          lead_id?: string | null
          messages?: Json | null
          sentiment?: string | null
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          handoff_completed?: boolean | null
          handoff_requested?: boolean | null
          id?: string
          lead_id?: string | null
          messages?: Json | null
          sentiment?: string | null
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_conversations_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_generated_content: {
        Row: {
          ai_prompt: string | null
          auto_generated: boolean | null
          content: string
          content_type: string
          created_at: string
          created_by: string | null
          hashtags: string[] | null
          id: string
          media_urls: string[] | null
          metadata: Json | null
          platform: string | null
          published_at: string | null
          recipe_id: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scheduled_for: string | null
          status: string
          target_audience: string | null
          title: string | null
          tone: string | null
          updated_at: string
        }
        Insert: {
          ai_prompt?: string | null
          auto_generated?: boolean | null
          content: string
          content_type: string
          created_at?: string
          created_by?: string | null
          hashtags?: string[] | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          platform?: string | null
          published_at?: string | null
          recipe_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: string
          target_audience?: string | null
          title?: string | null
          tone?: string | null
          updated_at?: string
        }
        Update: {
          ai_prompt?: string | null
          auto_generated?: boolean | null
          content?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          hashtags?: string[] | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          platform?: string | null
          published_at?: string | null
          recipe_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          status?: string
          target_audience?: string | null
          title?: string | null
          tone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generated_content_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "content_recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          client_id: string | null
          client_name: string | null
          created_at: string
          description: string | null
          id: string
          is_resolved: boolean | null
          resolved_at: string | null
          severity: string
          type: string
        }
        Insert: {
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_resolved?: boolean | null
          resolved_at?: string | null
          severity?: string
          type: string
        }
        Update: {
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_resolved?: boolean | null
          resolved_at?: string | null
          severity?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_snapshots: {
        Row: {
          avg_session_duration: string | null
          bounce_rate: number | null
          conversions: Json | null
          created_at: string
          id: string
          page_views: number | null
          snapshot_date: string
          top_pages: Json | null
          unique_visitors: number | null
          website_id: string | null
        }
        Insert: {
          avg_session_duration?: string | null
          bounce_rate?: number | null
          conversions?: Json | null
          created_at?: string
          id?: string
          page_views?: number | null
          snapshot_date: string
          top_pages?: Json | null
          unique_visitors?: number | null
          website_id?: string | null
        }
        Update: {
          avg_session_duration?: string | null
          bounce_rate?: number | null
          conversions?: Json | null
          created_at?: string
          id?: string
          page_views?: number | null
          snapshot_date?: string
          top_pages?: Json | null
          unique_visitors?: number | null
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_snapshots_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "client_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number | null
          channel: string
          client_id: string | null
          client_name: string | null
          created_at: string
          id: string
          name: string
          next_review: string | null
          objective: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          channel: string
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
          name: string
          next_review?: string | null
          objective?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          channel?: string
          client_id?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
          name?: string
          next_review?: string | null
          objective?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          after_media: string | null
          approach: Json
          before_after_pairs: Json | null
          before_media: string | null
          client: string
          created_at: string
          gallery_media: Json
          headline: string
          hero_media_poster: string | null
          hero_media_src: string
          hero_media_type: string
          id: string
          is_featured: boolean
          is_published: boolean
          kpi_badges: Json
          outcome: string
          outcomes: Json
          pdf_content: Json | null
          problem: string
          quote: Json | null
          related_slugs: string[] | null
          sector: string
          services: string[]
          slug: string
          subheadline: string
          timeframe: string
          title: string
          updated_at: string
          year: number
        }
        Insert: {
          after_media?: string | null
          approach?: Json
          before_after_pairs?: Json | null
          before_media?: string | null
          client: string
          created_at?: string
          gallery_media?: Json
          headline: string
          hero_media_poster?: string | null
          hero_media_src: string
          hero_media_type?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          kpi_badges?: Json
          outcome: string
          outcomes?: Json
          pdf_content?: Json | null
          problem: string
          quote?: Json | null
          related_slugs?: string[] | null
          sector: string
          services?: string[]
          slug: string
          subheadline: string
          timeframe: string
          title: string
          updated_at?: string
          year: number
        }
        Update: {
          after_media?: string | null
          approach?: Json
          before_after_pairs?: Json | null
          before_media?: string | null
          client?: string
          created_at?: string
          gallery_media?: Json
          headline?: string
          hero_media_poster?: string | null
          hero_media_src?: string
          hero_media_type?: string
          id?: string
          is_featured?: boolean
          is_published?: boolean
          kpi_badges?: Json
          outcome?: string
          outcomes?: Json
          pdf_content?: Json | null
          problem?: string
          quote?: Json | null
          related_slugs?: string[] | null
          sector?: string
          services?: string[]
          slug?: string
          subheadline?: string
          timeframe?: string
          title?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      client_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          title: string
          user_id: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          title: string
          user_id: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      client_websites: {
        Row: {
          created_at: string
          google_analytics_property_id: string | null
          google_search_console_property: string | null
          id: string
          is_primary: boolean
          name: string
          updated_at: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          google_analytics_property_id?: string | null
          google_search_console_property?: string | null
          id?: string
          is_primary?: boolean
          name: string
          updated_at?: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          google_analytics_property_id?: string | null
          google_search_console_property?: string | null
          id?: string
          is_primary?: boolean
          name?: string
          updated_at?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          id: string
          industry: string | null
          monthly_value: string | null
          name: string
          notes: string | null
          owner_id: string | null
          owner_name: string | null
          services: string[] | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          industry?: string | null
          monthly_value?: string | null
          name: string
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          industry?: string | null
          monthly_value?: string | null
          name?: string
          notes?: string | null
          owner_id?: string | null
          owner_name?: string | null
          services?: string[] | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_analyses: {
        Row: {
          company_name: string | null
          competitor_url: string
          created_at: string
          id: string
          marketing_tactics: Json | null
          opportunities: Json | null
          positioning: string | null
          raw_response: Json | null
          strengths: Json | null
          threat_level: string | null
          updated_at: string
          user_id: string
          weaknesses: Json | null
          website_id: string
        }
        Insert: {
          company_name?: string | null
          competitor_url: string
          created_at?: string
          id?: string
          marketing_tactics?: Json | null
          opportunities?: Json | null
          positioning?: string | null
          raw_response?: Json | null
          strengths?: Json | null
          threat_level?: string | null
          updated_at?: string
          user_id: string
          weaknesses?: Json | null
          website_id: string
        }
        Update: {
          company_name?: string | null
          competitor_url?: string
          created_at?: string
          id?: string
          marketing_tactics?: Json | null
          opportunities?: Json | null
          positioning?: string | null
          raw_response?: Json | null
          strengths?: Json | null
          threat_level?: string | null
          updated_at?: string
          user_id?: string
          weaknesses?: Json | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitor_analyses_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "client_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      content_calendar: {
        Row: {
          author_id: string | null
          author_name: string | null
          content_type: string
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          notes: string | null
          priority: string | null
          published_date: string | null
          scheduled_date: string | null
          slug: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          priority?: string | null
          published_date?: string | null
          scheduled_date?: string | null
          slug?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          priority?: string | null
          published_date?: string | null
          scheduled_date?: string | null
          slug?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_recipes: {
        Row: {
          content_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          last_run_at: string | null
          name: string
          next_run_at: string | null
          platform: string | null
          posts_per_run: number | null
          tone: string | null
          topics: Json | null
          updated_at: string | null
        }
        Insert: {
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name: string
          next_run_at?: string | null
          platform?: string | null
          posts_per_run?: number | null
          tone?: string | null
          topics?: Json | null
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          last_run_at?: string | null
          name?: string
          next_run_at?: string | null
          platform?: string | null
          posts_per_run?: number | null
          tone?: string | null
          topics?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_reports: {
        Row: {
          data: Json | null
          file_url: string | null
          generated_at: string
          id: string
          period_end: string | null
          period_start: string | null
          report_type: string
          scheduled_report_id: string | null
          sent_to: string[] | null
        }
        Insert: {
          data?: Json | null
          file_url?: string | null
          generated_at?: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          report_type: string
          scheduled_report_id?: string | null
          sent_to?: string[] | null
        }
        Update: {
          data?: Json | null
          file_url?: string | null
          generated_at?: string
          id?: string
          period_end?: string | null
          period_start?: string | null
          report_type?: string
          scheduled_report_id?: string | null
          sent_to?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_reports_scheduled_report_id_fkey"
            columns: ["scheduled_report_id"]
            isOneToOne: false
            referencedRelation: "scheduled_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      keyword_tracking: {
        Row: {
          created_at: string
          current_position: number | null
          difficulty: number | null
          id: string
          intent: string | null
          keyword: string
          previous_position: number | null
          search_volume: number | null
          tracked_at: string
          updated_at: string
          user_id: string
          website_id: string
        }
        Insert: {
          created_at?: string
          current_position?: number | null
          difficulty?: number | null
          id?: string
          intent?: string | null
          keyword: string
          previous_position?: number | null
          search_volume?: number | null
          tracked_at?: string
          updated_at?: string
          user_id: string
          website_id: string
        }
        Update: {
          created_at?: string
          current_position?: number | null
          difficulty?: number | null
          id?: string
          intent?: string | null
          keyword?: string
          previous_position?: number | null
          search_volume?: number | null
          tracked_at?: string
          updated_at?: string
          user_id?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "keyword_tracking_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "client_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          metadata: Json | null
          name: string
          notes: string | null
          phone: string | null
          source: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          preferences: Json | null
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          preferences?: Json | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          preferences?: Json | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      newsletters: {
        Row: {
          click_count: number | null
          content_html: string | null
          content_json: Json | null
          created_at: string
          created_by: string | null
          id: string
          open_count: number | null
          preview_text: string | null
          recipient_count: number | null
          scheduled_for: string | null
          sent_at: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          click_count?: number | null
          content_html?: string | null
          content_json?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          open_count?: number | null
          preview_text?: string | null
          recipient_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          click_count?: number | null
          content_html?: string | null
          content_json?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          open_count?: number | null
          preview_text?: string | null
          recipient_count?: number | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          accepted_at: string | null
          content: Json | null
          created_at: string
          id: string
          lead_id: string | null
          pricing: Json | null
          sent_at: string | null
          services: Json | null
          status: Database["public"]["Enums"]["proposal_status"]
          title: string
          updated_at: string
          user_id: string
          valid_until: string | null
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          content?: Json | null
          created_at?: string
          id?: string
          lead_id?: string | null
          pricing?: Json | null
          sent_at?: string | null
          services?: Json | null
          status?: Database["public"]["Enums"]["proposal_status"]
          title: string
          updated_at?: string
          user_id: string
          valid_until?: string | null
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          content?: Json | null
          created_at?: string
          id?: string
          lead_id?: string | null
          pricing?: Json | null
          sent_at?: string | null
          services?: Json | null
          status?: Database["public"]["Enums"]["proposal_status"]
          title?: string
          updated_at?: string
          user_id?: string
          valid_until?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_reports: {
        Row: {
          config: Json | null
          created_at: string
          id: string
          is_active: boolean | null
          last_sent_at: string | null
          name: string
          next_scheduled_at: string | null
          recipients: string[]
          report_type: string
          schedule: string
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          name: string
          next_scheduled_at?: string | null
          recipients: string[]
          report_type?: string
          schedule?: string
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          last_sent_at?: string | null
          name?: string
          next_scheduled_at?: string | null
          recipients?: string[]
          report_type?: string
          schedule?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_integrations: {
        Row: {
          config: Json | null
          created_at: string
          id: string
          integration_type: string
          is_active: boolean | null
          last_sync_at: string | null
          updated_at: string
        }
        Insert: {
          config?: Json | null
          created_at?: string
          id?: string
          integration_type: string
          is_active?: boolean | null
          last_sync_at?: string | null
          updated_at?: string
        }
        Update: {
          config?: Json | null
          created_at?: string
          id?: string
          integration_type?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_landing_pages: {
        Row: {
          created_at: string | null
          created_by: string | null
          faq_list: Json | null
          hero_headline: string
          hero_subheadline: string
          id: string
          industry_slug: string | null
          is_featured: boolean | null
          is_published: boolean | null
          key_metrics: Json | null
          location_slug: string | null
          meta_description: string
          meta_title: string
          page_type: string
          pricing_snapshot: string | null
          primary_cta: string
          problem_bullets: Json | null
          process_steps: Json | null
          related_articles: Json | null
          related_case_studies: Json | null
          secondary_cta: string
          service_slug: string
          slug: string
          solution_bullets: Json | null
          target_keyword: string
          testimonial_author: string | null
          testimonial_company: string | null
          testimonial_quote: string | null
          testimonial_role: string | null
          title: string
          updated_at: string | null
          working_with_you: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          faq_list?: Json | null
          hero_headline: string
          hero_subheadline: string
          id?: string
          industry_slug?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          key_metrics?: Json | null
          location_slug?: string | null
          meta_description: string
          meta_title: string
          page_type?: string
          pricing_snapshot?: string | null
          primary_cta?: string
          problem_bullets?: Json | null
          process_steps?: Json | null
          related_articles?: Json | null
          related_case_studies?: Json | null
          secondary_cta?: string
          service_slug: string
          slug: string
          solution_bullets?: Json | null
          target_keyword: string
          testimonial_author?: string | null
          testimonial_company?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          title: string
          updated_at?: string | null
          working_with_you?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          faq_list?: Json | null
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          industry_slug?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          key_metrics?: Json | null
          location_slug?: string | null
          meta_description?: string
          meta_title?: string
          page_type?: string
          pricing_snapshot?: string | null
          primary_cta?: string
          problem_bullets?: Json | null
          process_steps?: Json | null
          related_articles?: Json | null
          related_case_studies?: Json | null
          secondary_cta?: string
          service_slug?: string
          slug?: string
          solution_bullets?: Json | null
          target_keyword?: string
          testimonial_author?: string | null
          testimonial_company?: string | null
          testimonial_quote?: string | null
          testimonial_role?: string | null
          title?: string
          updated_at?: string | null
          working_with_you?: string | null
        }
        Relationships: []
      }
      seo_rankings: {
        Row: {
          difficulty: number | null
          id: string
          keyword: string
          metadata: Json | null
          position: number | null
          previous_position: number | null
          recorded_at: string
          search_volume: number | null
          source: string | null
          url: string
        }
        Insert: {
          difficulty?: number | null
          id?: string
          keyword: string
          metadata?: Json | null
          position?: number | null
          previous_position?: number | null
          recorded_at?: string
          search_volume?: number | null
          source?: string | null
          url: string
        }
        Update: {
          difficulty?: number | null
          id?: string
          keyword?: string
          metadata?: Json | null
          position?: number | null
          previous_position?: number | null
          recorded_at?: string
          search_volume?: number | null
          source?: string | null
          url?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          avatar_url: string | null
          company: string
          created_at: string
          display_order: number
          id: string
          is_featured: boolean
          is_published: boolean
          quote: string
          role: string
          updated_at: string
        }
        Insert: {
          author: string
          avatar_url?: string | null
          company: string
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_published?: boolean
          quote: string
          role: string
          updated_at?: string
        }
        Update: {
          author?: string
          avatar_url?: string | null
          company?: string
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean
          is_published?: boolean
          quote?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_audits: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          long_term: Json | null
          medium_term: Json | null
          overall_score: number | null
          quick_wins: Json | null
          raw_response: Json | null
          seo_opportunities: Json | null
          status: Database["public"]["Enums"]["audit_status"]
          strengths: Json | null
          technical_issues: Json | null
          updated_at: string
          user_id: string
          website_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          long_term?: Json | null
          medium_term?: Json | null
          overall_score?: number | null
          quick_wins?: Json | null
          raw_response?: Json | null
          seo_opportunities?: Json | null
          status?: Database["public"]["Enums"]["audit_status"]
          strengths?: Json | null
          technical_issues?: Json | null
          updated_at?: string
          user_id: string
          website_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          long_term?: Json | null
          medium_term?: Json | null
          overall_score?: number | null
          quick_wins?: Json | null
          raw_response?: Json | null
          seo_opportunities?: Json | null
          status?: Database["public"]["Enums"]["audit_status"]
          strengths?: Json | null
          technical_issues?: Json | null
          updated_at?: string
          user_id?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_audits_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "client_websites"
            referencedColumns: ["id"]
          },
        ]
      }
      website_blueprints: {
        Row: {
          analytical: number
          assigned_to: string | null
          bold: number
          budget: string | null
          company: string | null
          contract_signed: boolean | null
          created_at: string
          email: string
          estimated_hours: number | null
          estimated_value: number | null
          features: Json | null
          id: string
          internal_notes: string | null
          kickoff_date: string | null
          minimal: number
          modules: Json | null
          name: string
          notes: string | null
          palette: string
          pdf_url: string | null
          phone: string | null
          priority: string | null
          project_code: string | null
          proposal_url: string | null
          purpose: string
          site_size: string
          stage: string | null
          status: string
          straight_talking: number
          target_launch: string | null
          timeline: string | null
          understated: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          analytical?: number
          assigned_to?: string | null
          bold?: number
          budget?: string | null
          company?: string | null
          contract_signed?: boolean | null
          created_at?: string
          email: string
          estimated_hours?: number | null
          estimated_value?: number | null
          features?: Json | null
          id?: string
          internal_notes?: string | null
          kickoff_date?: string | null
          minimal?: number
          modules?: Json | null
          name: string
          notes?: string | null
          palette: string
          pdf_url?: string | null
          phone?: string | null
          priority?: string | null
          project_code?: string | null
          proposal_url?: string | null
          purpose: string
          site_size: string
          stage?: string | null
          status?: string
          straight_talking?: number
          target_launch?: string | null
          timeline?: string | null
          understated?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          analytical?: number
          assigned_to?: string | null
          bold?: number
          budget?: string | null
          company?: string | null
          contract_signed?: boolean | null
          created_at?: string
          email?: string
          estimated_hours?: number | null
          estimated_value?: number | null
          features?: Json | null
          id?: string
          internal_notes?: string | null
          kickoff_date?: string | null
          minimal?: number
          modules?: Json | null
          name?: string
          notes?: string | null
          palette?: string
          pdf_url?: string | null
          phone?: string | null
          priority?: string | null
          project_code?: string | null
          proposal_url?: string | null
          purpose?: string
          site_size?: string
          stage?: string | null
          status?: string
          straight_talking?: number
          target_launch?: string | null
          timeline?: string | null
          understated?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      website_plan_pages: {
        Row: {
          created_at: string
          id: string
          is_enabled: boolean
          notes: string | null
          page_slug: string
          page_title: string
          page_type: string
          plan_id: string
          position: number
          sections: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          notes?: string | null
          page_slug: string
          page_title: string
          page_type: string
          plan_id: string
          position?: number
          sections?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_enabled?: boolean
          notes?: string | null
          page_slug?: string
          page_title?: string
          page_type?: string
          plan_id?: string
          position?: number
          sections?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_plan_pages_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "website_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      website_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "strategist" | "specialist" | "client"
      audit_status: "pending" | "processing" | "completed" | "failed"
      proposal_status:
        | "draft"
        | "sent"
        | "viewed"
        | "accepted"
        | "rejected"
        | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "strategist", "specialist", "client"],
      audit_status: ["pending", "processing", "completed", "failed"],
      proposal_status: [
        "draft",
        "sent",
        "viewed",
        "accepted",
        "rejected",
        "expired",
      ],
    },
  },
} as const
