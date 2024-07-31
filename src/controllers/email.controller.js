import { transporter, mailOptionsEthereal, transporterGmail } from '../services/email.services.js';
import config from "../config.js";
import { template } from '../services/email.template.js';


export const sendMailEthereal = async(req, res) => {
    try {
        const response = await transporter.sendMail(mailOptionsEthereal);
        // const response = await transporter.sendMail(mailOptionsEtherealHandlebars);
        console.log('email enviado!');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}


export const sendGmail = async(req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailOptions = {
           from: config.EMAIL_GMAIL,
           to: dest,
           subject: 'Bienvenido/a Gmail',
           html: template(name)
        }
        const response = await transporterGmail.sendMail(gmailOptions);
        // const response = await transporter.sendMail(mailOptionsEtherealHandlebars);
        console.log('email enviado!');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}