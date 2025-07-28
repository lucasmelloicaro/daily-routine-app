-- Add custom_tasks column to daily_routine table
-- Run this SQL in your Supabase dashboard > SQL Editor

ALTER TABLE public.daily_routine 
ADD COLUMN IF NOT EXISTS custom_tasks JSONB NOT NULL DEFAULT '[]';
