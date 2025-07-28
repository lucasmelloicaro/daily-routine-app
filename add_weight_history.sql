-- Add weight history table to track daily weights
-- Run this SQL in your Supabase dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS public.weight_history (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_weight_history_date ON public.weight_history(date);

-- Disable RLS for now
ALTER TABLE public.weight_history DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.weight_history TO anon;
GRANT ALL ON public.weight_history TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE weight_history_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE weight_history_id_seq TO authenticated;
