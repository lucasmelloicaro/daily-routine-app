-- Create the daily_routine table in your Supabase database
-- Run this SQL in your Supabase dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS daily_routine (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  weight DECIMAL(5,2),
  tasks JSONB NOT NULL DEFAULT '[]',
  weekend_tasks JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the date column for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_routine_date ON daily_routine(date);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE daily_routine ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- In production, you might want to restrict this to authenticated users
CREATE POLICY "Allow all operations on daily_routine" ON daily_routine
FOR ALL USING (true);
