export const otpEmailData = {
  subject: "Verify your OTP for RentBandhu",
  text: (otp: number) => {
    return `<div>
        <div>
            <h2>OTP Verification for RentBandhu</h2>
        </div>
        <p>Dear user,</p>
        <p>Thank you for registering with us. Please use the following OTP to complete your verification:</p>
        <div>${otp}</div>
        <p>Valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>`;
  },
};
