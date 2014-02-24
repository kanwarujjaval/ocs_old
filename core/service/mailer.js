var nodemailer = require('nodemailer');
module.exports = function(){
    var transport = nodemailer.createTransport("SMTP", {
        host: "smtp.gmail.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "projectyellowmailer@gmail.com",
            pass: "9882218045"
        }
    });

    var message = {
        from: 'Project yellow Private Beta <projectyellowmailer@gmail.com>',
        to: '"Ujjaval" <ujjavalkanwar@gmail.com>',
        subject: 'Test mail from myself to myself ✔', 
        headers: {
            'X-Laziness-level': 1000
        },
        text: 'Hello to myself!',
        html:'<p><b>Hello</b> to myself</p>'+
             '<p>Here\'s a nyan cat for you</p>'
    };

    transport.sendMail(message, function(error){
        if(error){
            console.log('Error occured');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        transport.close();
    });
}