const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, message }) {
  // Configure your SMTP server details here
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587,
    secure: false, // Use TLS or SSL
    auth: {
      user: '', // Replace with your email address
      pass: '', // Replace with your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: '"Video Service" <>',
    to: "",
    subject: "demo",
    text: message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
