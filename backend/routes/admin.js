var express = require('express'),
    user = require('../models/Users'),
    job_type = require('../models/Job_type'),
    companies = require(),
    adminRoute = express.Router();

var route = () => {

    adminRoute.route("admin/signin")
        .post((req,res) => {

        });
    adminRoute.route("admin/user")
        .get((req,res) => {
            
        });
    adminRoute.route("admin/user/:id")
        .delete((req,res) => {

        });
    adminRoute.route("admin/companies")
        .post((req,res) => {

        });
    adminRoute.route("admin/job_type")
        .post((req,res) => {

        });

    return adminRoute;

}

module.exports = route;