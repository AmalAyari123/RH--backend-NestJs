
import * as nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
           
            service: 'gmail',
            port : 465,
            secure : true , 
            logger : true,
            debug : true, 
            
            auth: {
                user: 'ayariamal222@gmail.com',
                pass: 'zsyf gvtm efpj wxdx'
            },
            tls : {
              rejectUnauthorized: true ,

            }

        });
    }

    async sendEmail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: 'ayariamal222@gmail.com', // Sender email address
            to: to,                        // Recipient email address
            subject: subject,              // Email subject
            text: text                     // Plain text email content
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email: ', error);
            throw new Error('Failed to send email');
        }
    }
}
