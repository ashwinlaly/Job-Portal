var Email = require('nodemailer'),
    cs = require('./config');

var mailer = (to,subject,text) => {

    var transporter = Email.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
            user : cs.email,
            pass : cs.password
        }
    });

    var data = {
        from : cs.email,
        to : to,
        subject : subject,
        text : text,
    };

    transporter.sendMail(data,(err,res) => {
        if(err){
            console.log(err);
        }else {
            console.log(res);
        }
    });

}

module.exports = mailer;