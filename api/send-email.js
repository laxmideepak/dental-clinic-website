import { Resend } from 'resend';

const resend = new Resend(process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;

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

    const { data, error } = await resend.emails.send({
      from: process.env.VITE_FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.VITE_ADMIN_EMAIL || 'info@gotooptical.com'],
      subject: `New Appointment: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName} - ${appointmentDateTime}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, data });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
