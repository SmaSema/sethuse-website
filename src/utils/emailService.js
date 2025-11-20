import emailjs from '@emailjs/browser';

// Store verification tokens in memory (in production, use Redis or database)
const verificationTokens = new Map();

// Generate random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
export const sendVerificationEmail = async (email) => {
  try {
    const verificationCode = generateVerificationCode();
    
    // Store code with expiration (10 minutes)
    verificationTokens.set(email, {
      code: verificationCode,
      expires: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    const templateParams = {
      to_email: email,
      verification_code: verificationCode,
      organization_name: 'Sethuse Community Haven',
      support_email: 'support@sethusehaven.org',
      expiration_minutes: 10
    };

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_VERIFICATION_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );

    console.log(`✅ Verification code ${verificationCode} sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send verification email:', error);
    return { success: false, error: error.message };
  }
};

// Verify the token
export const verifyToken = async (email, code) => {
  try {
    const storedData = verificationTokens.get(email);
    
    if (!storedData) {
      return { success: false, error: 'No verification code found for this email' };
    }

    if (Date.now() > storedData.expires) {
      verificationTokens.delete(email);
      return { success: false, error: 'Verification code has expired' };
    }

    if (storedData.code !== code) {
      return { success: false, error: 'Invalid verification code' };
    }

    // Code is valid - remove it and mark email as verified
    verificationTokens.delete(email);
    return { success: true };
  } catch (error) {
    console.error('❌ Verification failed:', error);
    return { success: false, error: error.message };
  }
};

// Clean up expired tokens (run this periodically)
export const cleanupExpiredTokens = () => {
  const now = Date.now();
  for (const [email, data] of verificationTokens.entries()) {
    if (now > data.expires) {
      verificationTokens.delete(email);
    }
  }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredTokens, 5 * 60 * 1000);