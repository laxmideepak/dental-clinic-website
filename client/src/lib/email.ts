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
  const { resend, adminEmail, fromEmail } = initializeResend();
  
  if (!resend) {
    console.log('📧 Demo Mode - Email notification would be sent:', {
      to: adminEmail,
      subject: `New Appointment: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      appointmentDetails: bookingData
    });
    return true; // Return true for demo mode
  }

  try {
    // Format the appointment details
    const appointmentDateTime = `${bookingData.appointmentDate} at ${bookingData.appointmentTime}`;
    const patientTypeText = bookingData.patientType === 'current' ? 'Existing Patient' : 'New Patient';
    const appointmentTypeText = bookingData.appointmentType === 'general' ? 'General Eye Exam' : 'Contact Lens Consultation';

    // Create HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #22c55e; margin: 0; font-size: 28px;">GoTo Optical</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 16px;">EYEWEAR + EYECARE</p>
          </div>

          <!-- Main Content -->
          <h2 style="color: #333; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">New Appointment Booking</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #22c55e; margin-top: 0;">Appointment Details</h3>
            <p><strong>Date & Time:</strong> ${appointmentDateTime}</p>
            <p><strong>Patient Type:</strong> ${patientTypeText}</p>
            <p><strong>Appointment Type:</strong> ${appointmentTypeText}</p>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #22c55e; margin-top: 0;">Patient Information</h3>
            <p><strong>Name:</strong> ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}</p>
            <p><strong>Email:</strong> ${bookingData.customerInfo.email}</p>
            <p><strong>Phone:</strong> ${bookingData.customerInfo.phone}</p>
            <p><strong>Date of Birth:</strong> ${bookingData.customerInfo.dateOfBirth}</p>
            ${bookingData.customerInfo.insurance ? `<p><strong>Insurance:</strong> ${bookingData.customerInfo.insurance}</p>` : ''}
            ${bookingData.customerInfo.reasonForVisit ? `<p><strong>Reason for Visit:</strong> ${bookingData.customerInfo.reasonForVisit}</p>` : ''}
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0;">This is an automated notification from your GoTo Optical booking system.</p>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Please contact the patient to confirm their appointment.</p>
          </div>
        </div>
      </div>
    `;

    // Create plain text version
    const textContent = `GoTo Optical - New Appointment Booking

Appointment Details:
- Date & Time: ${appointmentDateTime}
- Patient Type: ${patientTypeText}
- Appointment Type: ${appointmentTypeText}

Patient Information:
- Name: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}
- Email: ${bookingData.customerInfo.email}
- Phone: ${bookingData.customerInfo.phone}
- Date of Birth: ${bookingData.customerInfo.dateOfBirth}
${bookingData.customerInfo.insurance ? `- Insurance: ${bookingData.customerInfo.insurance}` : ''}
${bookingData.customerInfo.reasonForVisit ? `- Reason for Visit: ${bookingData.customerInfo.reasonForVisit}` : ''}

This is an automated notification from your GoTo Optical booking system.
Please contact the patient to confirm their appointment.`;

    console.log('📧 Sending booking notification via Resend...');
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `New Appointment: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName} - ${appointmentDateTime}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('📧 Resend error:', error);
      return false;
    }

    console.log('📧 Email sent successfully via Resend!', data);
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
