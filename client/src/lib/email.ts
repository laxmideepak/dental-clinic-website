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
    console.log('📧 Sending booking notification...');
    console.log('📧 Environment:', {
      mode: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD
    });
    
    // In development, just log the email data (no actual sending)
    if (import.meta.env.DEV) {
      console.log('📧 DEV MODE: Email would be sent with data:', {
        to: 'info@gotooptical.com',
        subject: `New Appointment: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        patientType: bookingData.patientType,
        appointmentType: bookingData.appointmentType,
        customerInfo: bookingData.customerInfo
      });
      console.log('📧 DEV MODE: Email notification simulated successfully!');
      return true;
    }
    
    // In production, use the backend API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
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
  // Return true for both dev (simulation) and production (real emails)
  return true;
}
