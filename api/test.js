module.exports = async function handler(req, res) {
  console.log('🧪 Test API route called');
  console.log('🧪 Environment variables:', {
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasFromEmail: !!process.env.FROM_EMAIL,
    resendKeyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0
  });
  
  return res.status(200).json({ 
    success: true, 
    message: 'Test API working',
    env: {
      hasResendKey: !!process.env.RESEND_API_KEY,
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      hasFromEmail: !!process.env.FROM_EMAIL
    }
  });
}
