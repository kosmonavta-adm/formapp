export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customer_form: {
        Row: {
          form_id: number | null
          id: number
          schedule_id: number | null
          subdomain: string
          user_id: string
        }
        Insert: {
          form_id?: number | null
          id?: number
          schedule_id?: number | null
          subdomain: string
          user_id?: string
        }
        Update: {
          form_id?: number | null
          id?: number
          schedule_id?: number | null
          subdomain?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "domain_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "form"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "domain_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      form: {
        Row: {
          blueprint: Json
          created_at: string
          id: number
          is_published: boolean
          name: string
          schema: Json
          user_id: string
        }
        Insert: {
          blueprint: Json
          created_at?: string
          id?: number
          is_published?: boolean
          name: string
          schema: Json
          user_id?: string
        }
        Update: {
          blueprint?: Json
          created_at?: string
          id?: number
          is_published?: boolean
          name?: string
          schema?: Json
          user_id?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string
          id: number
          subdomain: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          subdomain: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          subdomain?: string
          user_id?: string
        }
        Relationships: []
      }
      schedule: {
        Row: {
          created_at: string
          data: Json
          end_date: string
          id: number
          is_published: boolean
          start_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          end_date: string
          id?: number
          is_published?: boolean
          start_date: string
          user_id?: string
        }
        Update: {
          created_at?: string
          data?: Json
          end_date?: string
          id?: number
          is_published?: boolean
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
