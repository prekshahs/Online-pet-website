// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via SMS (Twilio integration)
const sendOTP = async (phone, otp) => {
  try {
    // Twilio code commented out for testing without Twilio
    // const twilio = require('twilio');
    // const client = twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    // 
    // await client.messages.create({
    //   body: `Your SMILEY Pet Store OTP is: ${otp}. Valid for 10 minutes.`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone
    // });
    
    console.log(`OTP sent to ${phone}: ${otp}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};

module.exports = { generateOTP, sendOTP };
