// Import Resend using dynamic import to avoid build issues
async function getResend() {
  const { Resend } = await import('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData } = req.body;

    if (!bookingData) {
      console.error('No booking data provided');
      return res.status(400).json({ error: 'No booking data provided' });
    }

    // Log the booking data
    console.log('📧 New appointment booking received:', {
      patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      email: bookingData.customerInfo.email,
      phone: bookingData.customerInfo.phone,
      date: bookingData.appointmentDate,
      time: bookingData.appointmentTime,
      type: bookingData.appointmentType,
      patientType: bookingData.patientType
    });

    // Check if we have Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.log('📧 No Resend API key found - logging only');
      return res.status(200).json({ 
        success: true, 
        message: 'Booking notification logged successfully (no email service configured)',
        data: {
          patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
          appointmentTime: `${bookingData.appointmentDate} at ${bookingData.appointmentTime}`
        }
      });
    }

    // Try to send actual email
    try {
      const resend = await getResend();
      
      const appointmentDateTime = `${bookingData.appointmentDate} at ${bookingData.appointmentTime}`;
      const patientTypeText = bookingData.patientType === 'current' ? 'Existing Patient' : 'New Patient';
      const appointmentTypeText = bookingData.appointmentType === 'general' ? 'General Eye Exam' : 'Contact Lens Consultation';

      const emailContent = `
        New Appointment Booking - GoTo Optical

        Patient: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}
        Email: ${bookingData.customerInfo.email}
        Phone: ${bookingData.customerInfo.phone}
        Date of Birth: ${bookingData.customerInfo.dateOfBirth}
        
        Appointment Details:
        - Date & Time: ${appointmentDateTime}
        - Patient Type: ${patientTypeText}
        - Appointment Type: ${appointmentTypeText}
        
        ${bookingData.customerInfo.insurance ? `Insurance: ${bookingData.customerInfo.insurance}` : ''}
        ${bookingData.customerInfo.reasonForVisit ? `Reason for Visit: ${bookingData.customerInfo.reasonForVisit}` : ''}
      `;

      const { data, error } = await resend.emails.send({
        from: 'GoTo Optical <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'info@gotooptical.com'],
        subject: `New Appointment: ${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName} - ${appointmentDateTime}`,
        text: emailContent,
      });

      if (error) {
        console.error('Resend error:', error);
        // Still return success since the booking was logged
        return res.status(200).json({ 
          success: true, 
          message: 'Booking logged, but email failed to send',
          emailError: error.message,
          data: {
            patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
            appointmentTime: appointmentDateTime
          }
        });
      }

      console.log('Email sent successfully:', data);
      return res.status(200).json({ 
        success: true, 
        message: 'Booking notification sent successfully',
        emailId: data.id,
        data: {
          patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
          appointmentTime: appointmentDateTime
        }
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success since the booking was logged
      return res.status(200).json({ 
        success: true, 
        message: 'Booking logged, but email service unavailable',
        emailError: emailError.message,
        data: {
          patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
          appointmentTime: `${bookingData.appointmentDate} at ${bookingData.appointmentTime}`
        }
      });
    }
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
