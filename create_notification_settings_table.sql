-- Create notification settings table
-- Run this SQL in your Supabase dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS public.notification_settings (
  id SERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS for now
ALTER TABLE public.notification_settings DISABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.notification_settings TO anon;
GRANT ALL ON public.notification_settings TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE notification_settings_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE notification_settings_id_seq TO authenticated;
