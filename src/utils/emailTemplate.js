
import sendMail from "../helper/sendMail";

export const sendEmailToAdmin = (email, name) => {
    const emailTemplate = {
        emailTo: email,
        subject: "Welcome to Hover Ai - Exciting Times Ahead!",
        message: `<h1>Dear Admin, ${name}</h1><br/>
    Thank you for joining us at Hover Ai! We're eager to embark on this journey together, bringing you the latest and greatest. Stay tuned for more updates and opportunities to come.<br/>
    Warm regards,<br/>
    The Hover Ai Team<br/>`,
    };

    sendMail(emailTemplate)
};