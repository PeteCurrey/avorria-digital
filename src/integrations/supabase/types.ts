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
      website_blueprints: {
        Row: {
          analytical: number
          bold: number
          budget: string | null
          company: string | null
          created_at: string
          email: string
          features: Json | null
          id: string
          minimal: number
          modules: Json | null
          name: string
          notes: string | null
          palette: string
          phone: string | null
          purpose: string
          site_size: string
          status: string
          straight_talking: number
          timeline: string | null
          understated: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          analytical?: number
          bold?: number
          budget?: string | null
          company?: string | null
          created_at?: string
          email: string
          features?: Json | null
          id?: string
          minimal?: number
          modules?: Json | null
          name: string
          notes?: string | null
          palette: string
          phone?: string | null
          purpose: string
          site_size: string
          status?: string
          straight_talking?: number
          timeline?: string | null
          understated?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          analytical?: number
          bold?: number
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string
          features?: Json | null
          id?: string
          minimal?: number
          modules?: Json | null
          name?: string
          notes?: string | null
          palette?: string
          phone?: string | null
          purpose?: string
          site_size?: string
          status?: string
          straight_talking?: number
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
    },
  },
} as const
