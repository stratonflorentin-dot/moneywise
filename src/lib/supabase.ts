import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Transaction = {
  id: string
  user_id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  note: string | null
  date: string
  is_recurring: boolean
  created_at: string
}

export type Budget = {
  id: string
  user_id: string
  category: string
  monthly_limit: number
  month: string
  created_at: string
}

export type Goal = {
  id: string
  user_id: string
  name: string
  target_amount: number
  saved_amount: number
  deadline: string | null
  created_at: string
}

export type Debt = {
  id: string
  user_id: string
  name: string
  amount: number
  direction: 'i_owe' | 'they_owe'
  due_date: string | null
  is_paid: boolean
  created_at: string
}

export type Currency = 'TZS' | 'USD' | 'KES'

export const CATEGORIES = [
  'Food',
  'Transport',
  'Rent',
  'Bills',
  'Health',
  'Personal',
  'Education',
  'Entertainment',
  'Investment',
  'Other'
] as const

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TZS: 'TSh',
  USD: '$',
  KES: 'KSh'
}

export function formatCurrency(amount: number, currency: Currency = 'TZS'): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  return `${symbol}${amount.toLocaleString()}`
}
