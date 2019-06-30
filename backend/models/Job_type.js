var Mongoose = require('mongoose');

var Job_type = new Mongoose.Schema(
    {
        job_name : {
            type : String,
            required : [true, 'Job Name is Required']
        },
        status : {
            type : Boolean,
            default : true
        },
    },
    {
        timestamps : {}
    }
);

var Job_type = new Mongoose.model('job_type',Job_type);

module.exports = Job_type;