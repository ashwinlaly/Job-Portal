var express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    mailer = require('./email');
    db = require('./db');

// Routes
var authRoute = require('./routes/auth')(),
    companyRoute = require('./routes/company')(),
    userRoute = require('./routes/user')();

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    res.setHeader("Access-Control-Allow-Methods","GET,PATCH,DELETE,PUT,POST");
    res.setHeader("Access-Control-Allow-Credentials",true);
    next();
});

app.use(authRoute);
app.use(companyRoute);
app.use(userRoute);
app.get("*", (req,res) => {
    res.send({
        message : "Non exists.",
        status : 404
    });
});

app.listen(4100,()=> console.log('App started Sucessfully @ 4100'))