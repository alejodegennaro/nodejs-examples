const nodemailer = require('nodemailer');


function sendEmail(mail) {

    let account = {
        user: "smtp_username",
        pass: "smtp_password"
    };


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: '200.47.32.129',
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"' + mail.nombre + ' ' + mail.apellido + '" <' + mail.email + '>', // sender address
        to: 'contacto@prismamp.com', // list of receivers
        subject: 'Consulta', // Subject line
        html: buildHtmlMailBody(mail), // plain text body
        text:buildMailBody(mail)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

function buildHtmlMailBody(mail) {

    let body = "<b>Nombre: </b>" + mail.nombre + "<br>" +
        "<b>Apellido: </b>" + mail.apellido + "<br>" +
        "<b>Empresa: </b>" + mail.empresa + "<br>" +
        "<b>E-Mail: </b>" + mail.email + "<br>" +
        "<b>Teléfono: </b>" + mail.telefono + "<br>" +
        "<b>Texto: </b>" + mail.texto + "<br>";
    return body;


}

function buildMailBody(mail) {

    let body = "Nombre: " + mail.nombre + "\n" +
        "Apellido: " + mail.apellido + "\n" +
        "Empresa: " + mail.empresa + "\n" +
        "E-Mail: " + mail.email + "\n" +
        "Teléfono: " + mail.telefono + "\n" +
        "Texto: " + mail.texto + "\n";
    return body;


}


/**
 * Expose Service
 */
module.exports = {sendEmail};
