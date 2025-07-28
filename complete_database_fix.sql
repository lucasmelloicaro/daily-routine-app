-- Complete database setup and permissions fix
-- Run this SQL in your Supabase dashboard > SQL Editor

-- First, let's make sure the table exists and is properly configured
CREATE TABLE IF NOT EXISTS public.daily_routine (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  weight DECIMAL(5,2),
  tasks JSONB NOT NULL DEFAULT '[]',
  weekend_tasks JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Completely disable RLS for now
ALTER TABLE public.daily_routine DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to anon users (for testing)
GRANT ALL ON public.daily_routine TO anon;
GRANT ALL ON public.daily_routine TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE daily_routine_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE daily_routine_id_seq TO authenticated;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_daily_routine_date ON public.daily_routine(date);

-- Test insert to make sure everything works
INSERT INTO public.daily_routine (date, weight, tasks, weekend_tasks) 
VALUES (CURRENT_DATE, 70.5, '[]', '[]') 
ON CONFLICT (date) DO NOTHING;
