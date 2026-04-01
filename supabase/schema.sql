               -- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  type text CHECK (type IN ('income', 'expense')),
  amount numeric NOT NULL,
  category text NOT NULL,
  note text,
  date date NOT NULL,
  is_recurring boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);

-- Budgets table
CREATE TABLE IF NOT EXISTS budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  category text NOT NULL,
  monthly_limit numeric NOT NULL,
  month text NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Goals table
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  target_amount numeric NOT NULL,
  saved_amount numeric DEFAULT 0,
  deadline date,
  created_at timestamp DEFAULT now()
);

-- Debts table
CREATE TABLE IF NOT EXISTS debts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  amount numeric NOT NULL,
  direction text CHECK (direction IN ('i_owe', 'they_owe')),
  due_date date,
  is_paid boolean DEFAULT false,
  created_at timestamp DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for transactions
DROP POLICY IF EXISTS "Users can only access their own transactions" ON transactions;
CREATE POLICY "Users can only access their own transactions" ON transactions
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for budgets
DROP POLICY IF EXISTS "Users can only access their own budgets" ON budgets;
CREATE POLICY "Users can only access their own budgets" ON budgets
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for goals
DROP POLICY IF EXISTS "Users can only access their own goals" ON goals;
CREATE POLICY "Users can only access their own goals" ON goals
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for debts
DROP POLICY IF EXISTS "Users can only access their own debts" ON debts;
CREATE POLICY "Users can only access their own debts" ON debts
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_debts_user_id ON debts(user_id);
