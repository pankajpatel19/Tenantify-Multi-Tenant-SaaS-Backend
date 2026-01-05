import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true for 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// verify connection (optional but good)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mail server error:", error);
  } else {
    console.log("✅ Mail server ready");
  }
});

export const sendInviteEmail = async (toEmail, inviteLink) => {
  try {
    const mailOptions = {
      from: `"SaaS App" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "You're invited to join our workspace",
      html: `
        <div style="font-family: Arial; padding: 20px">
          <h2>Welcome 👋</h2>
          <p>You have been invited to join our workspace.</p>
          <p>Click the button below to set your password:</p>

          <a href="${inviteLink}"
             style="
               display:inline-block;
               padding:10px 16px;
               background:#4f46e5;
               color:#fff;
               text-decoration:none;
               border-radius:6px;
             ">
             Accept Invitation
          </a>

          <p style="margin-top:20px;color:#555">
            This link will expire in 24 hours.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Invite email sent to", toEmail);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email sending failed");
  }
};
