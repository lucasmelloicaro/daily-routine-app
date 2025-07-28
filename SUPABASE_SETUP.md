# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Wait for the project to be ready

## 2. Get Your Credentials
1. Go to Project Settings > API
2. Copy your Project URL and anon/public key
3. Update `src/supabase.js` with your credentials

## 3. Create Database Table
Run this SQL in your Supabase SQL Editor:

```sql
-- Create the daily_routine table
CREATE TABLE daily_routine (
  id BIGSERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  weight DECIMAL,
  tasks JSONB,
  weekend_tasks JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE daily_routine ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for simplicity)
CREATE POLICY "Allow all operations" ON daily_routine FOR ALL USING (true);
```

## 4. Environment Variables (Optional)
Create a `.env` file in your project root:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. For Android App
- Use the same Supabase credentials
- Install `@supabase/supabase-js` in your React Native project
- Use the same database functions
