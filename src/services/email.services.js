 import { createTransport } from 'nodemailer';
 import config from "../config.js";
 import { template } from "./email.template.js";
 import path from 'path';
 import hbs from 'nodemailer-express-handlebars';

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

