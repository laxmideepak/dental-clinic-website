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
    console.log('📧 Booking data:', {
      patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      email: bookingData.customerInfo.email,
      date: bookingData.appointmentDate,
      time: bookingData.appointmentTime,
      type: bookingData.appointmentType
    });
    
    // Always use the backend API (works in both dev and production)
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('📧 Backend API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      return false;
    }

    const result = await response.json();
    console.log('📧 Booking notification processed successfully!', result);
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
