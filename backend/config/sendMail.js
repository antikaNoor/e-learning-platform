const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});

const sendMail = async (recipientEmail, subject, htmlBody) => {
    try { 
        const result = await transporter.sendMail({
            from: "antika.noor@bjitacademy.com",
            to: recipientEmail,
            subject: subject,
            html: htmlBody,
        });

        // console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = {
    sendMail
}