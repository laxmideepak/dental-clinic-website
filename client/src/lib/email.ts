// Email service using backend API to avoid CORS issues

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
  // Since we're now using backend API, we just need to check if we're in production
  return import.meta.env.MODE === 'production';
}
