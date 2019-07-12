var express = require('express'),
    company = require('../models/Companys'),
    job_types = require('../models/Job_type'),
    jobs = require('../models/Jobs'),
    users_applied = require('../models/Users_applied'),
    mongoose = require('mongoose'),
    mailer = require('../email');
    CompanyRoute = express.Router();

var route = ()=> {

    CompanyRoute.route("/companies") 
        .get((req,res) => {
            company.find({},'_id name email phone description',(err,doc) => {
                if(err){
                    res.send({
                        message : "No Company data",
                        status : 400
                    });
                } else{
                    var data = {
                        doc : doc,
                        message : "all company details",
                        status : 200
                    }
                    res.send(
                        data
                    );
                    console.log('Company List');
                }
            });
        });
    CompanyRoute.route("/company/:id")
        .get((req,res) => {
            company.find({_id : req.params.id},(err,doc) => {
                if(err){
                    res.send({
                        message : "No Company data",
                        status : 400
                    });
                } else{
                    var data = {
                        doc,
                        message : "Company Details",
                        status : 200
                    };
                    res.send(data);
                }
            });
        })
        .patch((req,res) => {
            company.find({_id : req.params.id},(err,doc) => {
                if(err){
                    res.send({
                        message : "No Company data",
                        status : 400
                    });
                } else {
                    var com = new company({
                        name : req.body.name,
                        employee_count : req.body.employee_count,
                        address : req.body.address,
                        email : req.body.email,
                        description : req.body.description,
                        password : req.body.password,
                        phone :req.body.phone
                    });
                    com.save((errs, docs) => {
                        if(errs){
                            res.send({
                                message : "Company details update failed",
                                status : 400
                            });
                        } else {
                            res.send({
                                message : "Data Updated Sucessfully.",
                                status : 200
                            });
                        }
                    })
                }
            });
        });
    CompanyRoute.route("/company/addjob")
        .post((req,res) =>{
            console.log("here",req.body);
            var id = new mongoose.Types.ObjectId;
            var jb = new jobs({
                _id : id,
                job_type : req.body.job_id,
                company_id : req.body.company_id,
                name : req.body.name,
                salary : req.body.salary,
                description : req.body.description,
                due_date : req.body.due_date,
                positions_avaliable :  req.body.positions_avaliable
            });
            jb.save((err,doc)=>{
                if(err){
                    console.log("Job Creation", err);
                    res.send({
                        message : err.message,
                        status : 400
                    });
                } else {
                    res.send({
                        message : "Job Created Successfully",
                        status : 200
                    });
                }
            });
        });

    CompanyRoute.route("/job_types")
        .get((req,res) =>{
            job_types.find({},(err,doc)=>{
                if(err){
                    res.send({
                        message : "No Data found",
                        status : 404
                    }).status(404);
                } else {
                    var data = {
                        doc : doc,
                        message : "Job type listed",
                        status : 404
                    };
                    res.status(200).send(data);
                }
            });
        });

    CompanyRoute.route("/jobs")
        .get((req,res) =>{
            jobs.find().populate('job_type').populate('company_id', 'name email phone address description').exec((err,doc) => {
                if(err) {
                    res.send({
                        message : "Error in fetching Jobs",
                        status : 400
                    }).status(400);
                    console.log("Jobs Listing Error", err);
                } else {
                    var data = {
                        doc,
                        message : "Jobs listed",
                        status : 200
                    };
                    res.send(data).status(200);
                }
            });
        });

    CompanyRoute.route('/company/jobs/:id')
        .get( (req,res) => {
            console.log("List Companies's jobs",req.params.id);
            jobs.find({company_id : req.params.id}).populate('job_type').exec((err,doc) => {
                if(err){
                    res.send({
                        message : "no Jobs to List",
                        status : 200
                    });
                } else {
                    var data = {
                        doc,
                        message : "Jobs Listed",
                        status : 200
                    }
                    res.send(data);
                }
            });
        });

    CompanyRoute.route('/company/users_applied/:id')
        .get((req,res) => {
            var id = req.params.id;
            users_applied.find({company_id : id}).populate('job_id', 'description').populate('user_id','name email').exec((err,doc) => {
                if(err){
                    res.send({
                        message : "No users applied",
                        status : 200
                    });
                } else {

                    //var jobs =                     
                    //res.send(doc[0].job_id._id);
                    var data = {
                        doc,
                        message : "Applied user's List!.",
                        status : 200
                    };
                    if(doc.length == 0){
                        res.send({
                            message : "No users applied",
                            status : 200
                        }); 
                    } else {
                        res.send(data);
                    }
                }
            });
        });

    CompanyRoute.route("/company/call_for_interview/:id")
        .get( (req,res) => {
            var application_id = req.params.id;
            users_applied.find({_id: application_id}).populate('job_id','_id').populate('user_id','email name').populate('company_id','name').exec((err, doc) =>{
                if(err){
                    res.send({
                        message : "User does not exists",
                        status : 200
                    });
                } else {
                    if(doc[0].status == 1){
                        res.send({
                            message : "User already requested!.",
                            status : 200
                        });
                    } else {
                        users_applied.update({_id: application_id}, { $set : { status : 1} }, (uerr, udoc) => {
                            if(uerr){
                                res.send({
                                    message : "User already requested!.",
                                    status : 200
                                });
                            } else {
                                mailer(doc[0]['user_id']['email'],'interview call','Please contact '+doc[0]['company_id']['name']+'you are invited to attend an interview there');
                                res.send({
                                    message : doc[0]['user_id']['name']+"  invited",
                                    status : 200
                                });
                            }
                        });
                    }
                }
            });
        });

    return CompanyRoute;
}

module.exports = route;