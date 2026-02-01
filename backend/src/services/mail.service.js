const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ashishgokani58@gmail.com', // Hardcoded as requested
        pass: 'beda kyaz prgz dijz'       // Hardcoded as requested
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: '"Rental System" <ashishgokani58@gmail.com>',
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't throw error to prevent blocking the main flow
        return null;
    }
};

const sendWelcomeEmail = async (email, name) => {
    const subject = 'Welcome to Rental Management System';
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Welcome, ${name}!</h2>
            <p>Thank you for registering with our Rental Management System.</p>
            <p>You can now browse products and request quotations.</p>
            <br>
            <p>Best Regards,<br>The Rental Team</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`; // Assuming frontend runs on 5173
    const subject = 'Password Reset Request';
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Password Reset</h2>
            <p>You requested a password reset. Click the link below to reset your password:</p>
            <p><a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
            <p>This link is valid for 1 hour.</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

const sendOrderStatusEmail = async (email, orderId, status, details = '') => {
    const subject = `Order #${orderId} Update: ${status}`;
    let message = '';

    switch (status) {
        case 'CONFIRMED':
            message = 'Your order has been confirmed! We are preparing your items.';
            break;
        case 'ACTIVE':
            message = 'Your rental period has started. Enjoy your items!';
            break;
        case 'COMPLETED':
            message = 'Your rental is complete. Thank you for doing business with us.';
            break;
        case 'CANCELLED':
            message = 'Your order has been cancelled.';
            break;
        default:
            message = `Your order status has been updated to ${status}.`;
    }

    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Order Update</h2>
            <p>${message}</p>
            <p><strong>Order ID:</strong> #${orderId}</p>
            ${details ? `<p>${details}</p>` : ''}
            <br>
            <p>Login to your account to view full details.</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

module.exports = {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendOrderStatusEmail
};
