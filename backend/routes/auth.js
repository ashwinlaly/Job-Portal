var express = require('express'),
    mailer = require('../email'),
    user = require('../models/Users'),
    company = require('../models/Companys'),
    authRoute = express.Router();

var route = () => {

    authRoute.route("/signin")
        .post((req , res)=>{
            var type = req.body.type;
            var data = {
                email : req.body.email,
                password : req.body.password
            };
            console.log(data);
            if (type == 1) {
                user.find(data,'_id name email',(err, doc) => {
                    console.log(doc);
                    var data = {
                        doc: doc[0],
                        type : 1,
                        message : 'Login sucess',
                        status : 200
                    };
                    if(doc.length == 1){
                        res.send(data);
                    } else {
                        res.send({
                            message : "Account does not exists",
                            status : 404    
                        });
                    }
                });
            } else {
                company.find(data,'_id name email',(err, doc) => {
                    console.log(doc);
                    var data = {
                        doc: doc[0],
                        type: 2,
                        message : 'Login sucess',
                        status : 200
                    };
                    if(doc.length == 1){
                        res.send(data);
                    } else {
                        res.send({
                            message : "Account does not exists",
                            status : 404    
                        });
                    }
                });
            }
        });
    authRoute.route("/signup")
        .post((req,res)=>{
            var type = req.body.type;
            //us.validateSync();
            if (type == 1 ) {
                var us = new user({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                });
                user.find({email : req.body.email}, (ers,doc) => {
                    if(ers){
                        console.log(ers);
                    }else if (doc.length == 0){
                        us.save((er,rs) => {
                            if(er){
                                res.send(er);
                                console.log("Save ", er);
                            } else {
                                res.send({
                                    message : "Account Created Successfully",
                                    status : 200
                                });
                                mailer(req.body.email,'Account Creation', `Account Created Sucessfully with password ${req.body.password}`);
                            }
                        });     
                    } else {
                        res.send({
                            message : "Email Already Exists",
                            status : 404
                        });
                    }
                });
            } else {
                var cs = new company({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
                });
                company.find({email : req.body.email}, (ers,doc) => {
                    if(ers){
                        console.log(ers);
                    }else if (doc.length == 0){
                        cs.save((er,rs) => {
                            if(er){
                                res.send(er);
                                console.log("Save ", er);
                            } else {
                                res.send({
                                    message : "Account Created Successfully",
                                    status : 200
                                });
                                mailer(req.body.email,'Account Creation', `Account Created as Company Sucessfully with password ${req.body.password}`);
                            }
                        });     
                    } else {
                        res.send({
                            message : "Email Already Exists",
                            status : 404
                        });
                    }
                });
            }
            console.log('signup');
        });
    
    return authRoute;

}

module.exports = route;