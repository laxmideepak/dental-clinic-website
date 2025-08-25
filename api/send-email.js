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

    // Log the booking data for now (we'll add actual email sending later)
    console.log('📧 New appointment booking received:', {
      patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
      email: bookingData.customerInfo.email,
      phone: bookingData.customerInfo.phone,
      date: bookingData.appointmentDate,
      time: bookingData.appointmentTime,
      type: bookingData.appointmentType,
      patientType: bookingData.patientType
    });

    // For now, just return success (we'll add Resend integration step by step)
    return res.status(200).json({ 
      success: true, 
      message: 'Booking notification logged successfully',
      data: {
        patient: `${bookingData.customerInfo.firstName} ${bookingData.customerInfo.lastName}`,
        appointmentTime: `${bookingData.appointmentDate} at ${bookingData.appointmentTime}`
      }
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
