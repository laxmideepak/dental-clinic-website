# Resend Email Service Setup

This guide will help you set up Resend for email notifications when customers book appointments.

## Why Resend?

[Resend](https://resend.com/) is the best email service for developers:
- ✅ **No domain verification required** for basic usage
- ✅ **Simple API** - much easier than MailerSend
- ✅ **Better deliverability** - reaches inbox, not spam
- ✅ **Free tier**: 3,000 emails/month + 100 emails/day
- ✅ **Developer-first** design

## Step 1: Create Resend Account

1. Go to [Resend.com](https://resend.com/)
2. Click **"Get Started"** 
3. Sign up with your email
4. Verify your email address

## Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Go to **API Keys** in the sidebar
3. Click **"Create API Key"**
4. Give it a name: "GoTo Optical Notifications"
5. **Copy the API key** - it starts with `re_`

## Step 3: Update Environment Variables

Update your `.env` file:

```env
# Resend Configuration for Email Notifications
VITE_RESEND_API_KEY=re_your_actual_api_key_here
VITE_ADMIN_EMAIL=your_resend_signup_email@example.com
VITE_FROM_EMAIL=onboarding@resend.dev
```

**IMPORTANT**: 
- Replace `re_your_actual_api_key_here` with your actual Resend API key
- Replace `your_resend_signup_email@example.com` with the SAME email you used to sign up for Resend
- For testing, Resend only allows sending to your own email address until you verify a domain

## Step 4: Test the Setup

1. **Restart your server**:
   ```bash
   export PORT=3000 && npm run dev
   ```

2. **Make a test booking** through your website

3. **Check your email** (`krsayani11@gmail.com`) for the notification

4. **Check browser console** for email logs

## Email Features

The system automatically sends professional emails with:
- **Subject**: `New Appointment: [Customer Name] - [Date & Time]`
- **GoTo Optical branding**
- **Complete appointment details**
- **Patient information**
- **Professional HTML design**

## Troubleshooting

### Emails Not Sending
1. Check browser console for error messages
2. Verify API key starts with `re_` and is correct
3. Make sure server was restarted after updating `.env`
4. Check Resend dashboard for sending logs

### Demo Mode
If no API key is provided:
- Booking still works normally  
- Email details logged to console instead
- No actual emails sent

## Resend Benefits

- **Instant setup** - no domain verification needed
- **Great deliverability** - emails reach inbox
- **Simple integration** - just works out of the box
- **Free tier** - perfect for small businesses
- **Developer-friendly** - clean API and great docs

## Production Notes

- For production, consider verifying your own domain
- Monitor sending volume (free tier: 100/day, 3000/month)
- Resend provides detailed analytics and logs
- Excellent support and documentation

Your email notification system is now ready! 🚀
