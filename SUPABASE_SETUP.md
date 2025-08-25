# 🚀 Supabase Integration Setup Guide

This guide will help you connect your GoTo Optical appointment booking system to Supabase.

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Node.js**: Already installed ✅
3. **Project Running**: Server should be running on `http://localhost:3000` ✅

## 🎯 Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Create New Project**:
   - Project name: `goto-optical-appointments`
   - Database password: Choose a strong password
   - Region: Choose closest to your location
3. **Wait for setup** (takes ~2 minutes)

## 🔧 Step 2: Get Project Credentials

1. **Go to Project Settings** → **API**
2. **Copy these values**:
   ```
   Project URL: https://your-project-ref.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 🗄️ Step 3: Run Database Migrations

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. **Run the migrations**:
   ```bash
   supabase db push
   ```

   This will create:
   - `appointments` table
   - Indexes for performance
   - Row Level Security policies
   - Utility functions

## 🔐 Step 4: Configure Environment Variables

1. **Create `.env.local` file** in your project root:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Replace the placeholders** with your actual values from Step 2

3. **Restart your development server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

## ✅ Step 5: Test the Integration

1. **Open your app**: http://localhost:3000
2. **Click "Book Online"**
3. **Go through the booking flow**:
   - Select patient type
   - Choose service
   - Pick date and time
   - Fill out the form
   - Submit appointment

4. **Check Supabase Dashboard**:
   - Go to **Table Editor** → **appointments**
   - You should see your test appointment! 🎉

## 🔍 Step 6: Verify Database

**In Supabase SQL Editor**, run:
```sql
-- Check if table exists and has data
SELECT * FROM appointments ORDER BY created_at DESC LIMIT 5;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'appointments';
```

## 🚨 Troubleshooting

### ❌ "Error booking appointment"
- **Check**: Environment variables are set correctly
- **Check**: Supabase project is active
- **Check**: Database migrations ran successfully

### ❌ "Network error"
- **Check**: Internet connection
- **Check**: Supabase project URL is correct
- **Check**: No firewall blocking requests

### ❌ "RLS policy violation"
- **Check**: Policies were created during migration
- **Run**: `supabase db reset` to recreate everything

## 🎯 Production Deployment

For production, you'll need:

1. **Environment Variables** in your hosting platform:
   ```
   VITE_SUPABASE_URL=your-production-url
   VITE_SUPABASE_ANON_KEY=your-production-anon-key
   ```

2. **Domain Configuration** in Supabase:
   - Go to **Authentication** → **URL Configuration**
   - Add your production domain

3. **Email Templates** (optional):
   - Customize confirmation emails in **Authentication** → **Email Templates**

## 📊 Admin Features

To view appointments as an admin:

```javascript
// Use service_role key (keep this secure!)
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SERVICE_ROLE_KEY' // This has full access!
)

// Get all appointments
const { data } = await supabase
  .from('appointments')
  .select('*')
  .order('starts_at')
```

## 🎉 Success!

Your appointment booking system is now connected to Supabase! 

**Features now working**:
- ✅ Calendar-based date selection
- ✅ Time slot booking
- ✅ Form data collection
- ✅ Database storage
- ✅ Email validation
- ✅ Business hours enforcement
- ✅ Duplicate booking prevention

**Next Steps**:
- Set up email notifications
- Create admin dashboard
- Add appointment management
- Deploy to production

## 🆘 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Discord Support**: https://discord.supabase.com
- **Check logs**: Browser Developer Tools → Console
