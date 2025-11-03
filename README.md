# Entrepreneur Journey

A stage-by-stage guided approach to building your entrepreneurial project. Generate optimized, AI-powered prompts for each phase of your entrepreneurial journey using best practices.

## Features

- 🎯 **6-Stage Journey**: Comprehensive stages from idea generation to operations optimization
- 🤖 **AI-Powered Prompts**: Google Gemini Pro generates optimized prompts following industry best practices
- 📋 **One-Click Copy**: Instant clipboard copy functionality
- 🚀 **Deployment Platforms**: Quick links to GenSpark, Manus, and Lovable
- 🎨 **Professional Design**: Minimal, high-end, enterprise-grade UI
- ⚡ **Visual Feedback**: Smooth animations and loading states

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Google Gemini API** - Gemini Pro for prompt generation
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yaraabdullah/Entrepreneaur-Prompt-Gate.git
cd Entrepreneaur-Prompt-Gate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env.local file
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for easy deployment on Vercel:

### First-time Setup

1. Initialize Git and push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Entrepreneur Prompt Gate"
git branch -M main
git remote add origin https://github.com/yaraabdullah/Entrepreneaur-Prompt-Gate.git
git push -u origin main
```

2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Deployment on Vercel

1. Sign in to your Vercel account
2. Click "New Project"
3. Import the repository from GitHub
4. Vercel will automatically detect Next.js and configure the build settings
5. **Important**: Add your `GEMINI_API_KEY` environment variable in Vercel project settings
6. Click "Deploy" and your site will be live in minutes!

## Environment Variables

- `GEMINI_API_KEY` (required): Your Google Gemini API key for generating optimized prompts ([Get one here](https://makersuite.google.com/app/apikey))
- `NEXT_PUBLIC_SUPABASE_URL` (required): Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (required): Your Supabase anonymous/public key

## Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the following SQL to create the users table:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows insert for all (for sign-up)
CREATE POLICY "Allow public insert" ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy that allows select for authenticated users (optional)
CREATE POLICY "Allow select for authenticated" ON users
  FOR SELECT
  TO authenticated
  USING (true);
```

4. Go to **Settings** → **API** to get your:
   - Project URL (use as `NEXT_PUBLIC_SUPABASE_URL`)
   - `anon` `public` key (use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Entrepreneurial Stages

1. **Idea Generation & Business Model** - Define and validate your business concept
2. **MVP Development** - Build and validate your minimum viable product
3. **Investor Pitching** - Prepare your pitch deck and investor presentation
4. **Customer Acquisition & Marketing** - Develop your go-to-market strategy
5. **Scaling & Growth** - Plan for sustainable growth and scaling
6. **Operations & Optimization** - Optimize operations and improve efficiency

## License

MIT

## Author

Yara Abdullah

