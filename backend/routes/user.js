var express = require('express'),
    users = require('../models/Users'),
    mailer = require('../email'),
    users_applied = require('../models/Users_applied'),
    Mongoose = require('mongoose'),
    userRoute = express.Router();

var route = () => {

    userRoute.route("/user/:id")
        .get( (req,res) => {
            users.find({_id: req.params.id}, (err,doc) => {
                if(doc.length <= 0){
                    res.send({
                        message : "User Not Found.",
                        status : 404
                    });
                } else {
                    res.send({
                        doc : doc[0],
                        message : "User Exists!.",
                        status : 404
                    });
                }
            });
        })
        .post( (req,res) => {
            var id = req.params.id;
            var data = {
                name  : req.body.name,
                email : req.body.email,
                address : req.body.address,
                phone : req.body.phone,
                experience : req.body.experience,
                education : req.body.education,
            };
            console.log(data);
            //res.send(data);
            users.findByIdAndUpdate(id,data, (err,doc)=>{
                if(err){
                    res.send({
                        message : "Update failed",
                        status : 200
                    });
                } else {
                    res.send({
                        message : "User data updated sucessfully",
                        status : 200
                    });
                }
            });
        });

    userRoute.route("/apply")
        .post( (req,res) => {
            var data = {
                user_id : req.body.user_id,
                job_id : req.body.job_id
            };
            console.log("job apply", data);
           users_applied.find(data,(err,doc)=>{
                if(err){
                    res.send({
                        message : "Job Cannot be applied",
                        status : 400
                    });
                } else if (doc.length >= 1) {
                    res.send({
                        message : "Job Aleady Applied!.",
                        status : 200
                    });
                } else {
                    var us = new users_applied({
                        _id : new Mongoose.Types.ObjectId,
                        user_id : req.body.user_id,
                        job_id : req.body.job_id,
                        company_id : req.body.company_id
                    });
                    us.save((er,docs)=>{
                        if(er){
                            res.send({
                                message : "Job Cannot be applied",
                                status : 400
                            });
                        } else {
                            users.find({_id : req.body.user_id }, (e1,d1) => {
                                if(d1){
                                    mailer(d1[0].email,'Job Applied Sucessfully','you\'ve sucessfully applied for a job ');
                                    res.send({
                                        message : "Greets !!! applied sucessfully .",
                                        status : 200
                                    });
                                }
                            })
                        }
                    });
                }
           });
        });
        
    return userRoute;

}

module.exports = route;