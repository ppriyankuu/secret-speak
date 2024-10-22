import { ApiResponse } from '@/types/api-response';
import { createTransport, SendMailOptions } from 'nodemailer';

const mailAddress = process.env.USER_EMAIL ?? '';
const mailPassword = process.env.USER_PASS ?? '';

const transporter = createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: mailAddress,
    pass: mailPassword,
  },
  maxConnections: 1,
});

export const sendVerificationMail = async ({
  email,
  username,
  verificationCode,
}: {
  email: string;
  username: string;
  verificationCode: string;
}): Promise<ApiResponse> => {
  const emailTemplate = `
    <html>
      <head>
        <title>Verification Code</title>
      </head>
      <body>
        <h1>Hey ${username}!</h1>
        <p>Your confirmation code is below - enter it in your open browser window and we'll help you get signed in.</p>
        <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; margin-bottom: 10px;">
          <h2 style="text-align: center;">${verificationCode}</h2>
        </div>
        <p>If you didn't request this email, there's nothing to worry about, you can safely ignore it.</p>
      </body>
    </html>
  `;
  try {
    const mailOptions: SendMailOptions = {
      from: mailAddress,
      to: email,
      subject: 'Secret speak | Verification code',
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Mail sent successfully' };
  } catch (error: any) {
    console.error(`Something went wrong in node_mailer: ${error.message}`);
    return { success: false, message: 'Failed to send the mail' };
  }
};
