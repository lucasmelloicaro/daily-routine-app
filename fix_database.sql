-- Fix RLS policy for the daily_routine table
-- Run this SQL in your Supabase dashboard > SQL Editor

-- First, let's drop the existing policy and disable RLS temporarily
DROP POLICY IF EXISTS "Allow all operations on daily_routine" ON daily_routine;
ALTER TABLE daily_routine DISABLE ROW LEVEL SECURITY;

-- Alternative: Create a more specific policy
-- ALTER TABLE daily_routine ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable all operations for all users" ON daily_routine
-- FOR ALL TO anon, authenticated
-- USING (true)
-- WITH CHECK (true);
