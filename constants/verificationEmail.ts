export const emailData = {
  subject: "Verify your email for RentBandhu",
  html: (user: string, link: string) => {
    return `<div>
        <div>
            <h2>Email Verification for RentBandhu</h2>
        </div>
        <p>Dear ${user},</p>
        <p>Thank you for registering with us. Please use the following link to complete your verification:</p>
        <strong><a href=${link} target="_blank">Verify here</a></strong>
        <p>Valid for 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <div>
            <p>&copy; 2024 RentBandhu. All rights reserved.</p>
        </div>
    </div>`;
  },
};
