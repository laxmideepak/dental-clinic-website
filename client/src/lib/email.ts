import { Resend } from 'resend';

// Lazy initialization function
function initializeResend() {
  console.log('📧 Initializing Resend service...');
  console.log('📧 Environment check:', {
    hasResendKey: !!import.meta.env.VITE_RESEND_API_KEY,
    hasAdminEmail: !!import.meta.env.VITE_ADMIN_EMAIL,
    hasFromEmail: !!import.meta.env.VITE_FROM_EMAIL,
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV
  });

  const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@gotooptical.com';
  const fromEmail = import.meta.env.VITE_FROM_EMAIL || 'onboarding@resend.dev';

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    console.log('📧 Resend initialized successfully');
    console.log('📧 From:', fromEmail, '→ To:', adminEmail);
    return { resend, adminEmail, fromEmail };
  } else {
    console.log('📧 Resend API key not found - email notifications disabled');
    console.log('📧 Demo mode: Email details will be logged to console');
    return { resend: null, adminEmail, fromEmail };
  }
}

export interface BookingEmailData {
  patientType: 'current' | 'new';
  appointmentType: 'general' | 'contact-lens';
  appointmentDate: string;
  appointmentTime: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    insurance?: string;
    reasonForVisit?: string;
  };
}

export async function sendBookingNotification(bookingData: BookingEmailData): Promise<boolean> {
  try {
    console.log('📧 Sending booking notification via backend API...');
    
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('📧 Backend API error:', errorData);
      return false;
    }

    const result = await response.json();
    console.log('📧 Email sent successfully via backend API!', result);
    return true;
    
  } catch (error) {
    console.error('📧 Failed to send booking notification:', error);
    return false;
  }
}

export function isEmailServiceConfigured(): boolean {
  const { resend } = initializeResend();
  return !!resend;
}
