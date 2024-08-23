 import { createTransport } from 'nodemailer';
 import config from "../config.js";
 import { template } from "./email.template.js";
 
 import path from 'path';
 import hbs from 'nodemailer-express-handlebars';
import { logger } from '../utils/logger.js';

export const transporter = createTransport({
    host: config.HOST,
    port: config.PORT_MAIL,
    auth: {
        user: config.USER_MAIL,
        pass: config.PASSWORD_MAIL
    }
});

export const transporterGmail = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASS_GMAIL
    }
});

export const mailOptionsEthereal = {
    from: config.USER_MAIL,
    to: config.USER_MAIL,
    subject: 'Bienvenido/a',
    html: template('Nombre Test')
}

const createMsgRegister = (first_name) => `<h1>Hola ${first_name} </h1>`

const createMsgReset = (first_name) => {
    return `<p> !Hola ${first_name}! Haz click <a href=""> Aqui </a> 
    para restablecer tu contraseña.
    </p>`;
}


export const sendMail = async (user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let msg = '';
            service === 'register' 
            ? (msg = createMsgRegister(first_name))
            : service === "resetPass"
            ? (msg = createMsgReset(first_name))
            : (msg = '');

        let subj = '';

        subj = 
            service === 'register' 
            ? 'Bienvenido/a'
            : service === "resetPass"
            ? 'Restablecimiento de contraseña'
            : "";
            
        const gmailOptions = {
            from: config.EMAIL_GMAIL,
            to: email,
            subject: subj,
            html: msg
        }
        const response = await transporterGmail.sendMail(gmailOptions);
        if(token) return token;
        logger.info('Email enviado', response);
    } catch (error) {
        throw new Error(error)
    }
}

// CON JAN DEL BAR

// const  handlebarsOptions = {
//     viewEngine: {
//         extName: '.handlebars',
//         defaultLayout: false
//     },
//     viewPath: path.resolve('./src/views'),
//     extName: '.handlebars',
// }

// transporter.use('compile', hbs(handlebarsOptions));

// export const mailOptionsEtherealHandlebars = {
//     from: config.USER_MAIL,
//     to: config.USER_MAIL,
//     subject: 'Bienvenido/a a correos con handlebars',
//     template: 'email',
//     context: {
//         title: "Email plantilla de handlebars",
//         text: "Lorem ipsum dolor sit amet consectetur\
//          adipisicing elit. Quasi ut, perspiciatis,\
//          sed, dolor incidunt hic unde ducimus aperiam\
//          repellat optio quas cupiditate eos at cum impedit\
//         dolores quae maiores voluptates?"
//     }
// }

