const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: parseInt(process.env.SMTP_PORT, 10) === 465, // true for SSL/TLS on 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/*
 * Helper to fire off emails from the portfolio contact form.
 * It expects name, email, phone (optional), and the message body.
 */
const sendContactEmail = async (details) => {
  const { name, email, phone, message } = details;

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    // Setting replyTo so we can just hit 'Reply' in our inbox
    replyTo: email,
    subject: `New Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
-----------------------------------------
${message}
    `,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h3>New Message from Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
};




