# Supabase Setup Guide

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project

## Step 2: Create Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Run the following SQL:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 3: Set Up Row Level Security (Optional but Recommended)

Run this SQL to enable basic security:

```sql
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for sign-up)
CREATE POLICY "Allow public insert" ON users
  FOR INSERT
  TO public
  WITH CHECK (true);
```

## Step 4: Get Your API Keys

1. Go to **Settings** → **API** in your Supabase project
2. Copy the following:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 5: Add to Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 6: Test

1. Restart your development server
2. Visit the website - you should be redirected to `/signup`
3. Fill out the form and submit
4. Check your Supabase **Table Editor** to see the user data

## Troubleshooting

### "relation users does not exist"
- Make sure you ran the CREATE TABLE SQL in Step 2

### "new row violates row-level security policy"
- Make sure you ran the RLS policy SQL in Step 3

### "Invalid API key"
- Double-check your environment variables
- Make sure you're using the `anon` key, not the `service_role` key
