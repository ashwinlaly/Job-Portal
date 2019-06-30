var express = require('express'),
    company = require('../models/Companys'),
    users  = require('../models/Users'),
    job_types = require('../models/Job_type'),
    jobs = require('../models/Jobs'),
    mongoose = require('mongoose'),
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
    CompanyRoute.route("company/:id")
        .get((req,res) => {
            company.find({_id : req.params.id},(err,doc) => {
                if(err){
                    res.send({
                        message : "No Company data",
                        status : 400
                    });
                } else{
                    res.send(doc,{
                        message : "Company Details",
                        status : 200
                    });
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
                    // com.save((errs, docs) => {
                    //     if(errs){
                    //         res.send({
                    //             message : "Company details update failed",
                    //             status : 400
                    //         });
                    //     } else {
                    //         res.send({
                    //             message : "Data Updated Sucessfully.",
                    //             status : 200
                    //         });
                    //     }
                    // })
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

    return CompanyRoute;
}

module.exports = route;