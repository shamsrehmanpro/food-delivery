
import {mailTrapClient, sender} from "../mailtrap/mailtrap.config.js"
import {VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "../mailtrap/emailTemplate.js"
import { MailtrapClient } from "mailtrap"


export const sendWelcomeEmail = async(email, name)=>{
    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: 'bca36c7f-f405-4679-b723-8543a2067aee',
            template_variables: {
                "company_info_name": name,
                "company_info_address": "Pakistan",
                "company_info_city": "Islamabad",
                "company_info_zip_code": "444589",
                "company_info_country": "None",
            },
        })
        console.log("Welcome email send successfully", response);

        
    } catch (error) {
        console.log('Error sending welcome email', error);
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
            
        }) 
    } catch (error) {
        console.log(`Error sending Password reset Email`,error);
             
    }
}

export const sendResetSuccessfulEmail = async(email) => {
    const recipient = [{email}]

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        }) 

        console.log(`password reset email send successfully`, response);
        
    } catch (error) {
        console.log(`error sending password reset email`, error);
        
    }
}