var Moongose = require('mongoose');

var companies = new Moongose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        employee_count : {
            type : Number,
            trim : true,
            min : [ 0 , 'Invalid Employee Count']
        },
        address : {
            type : String,
            trim : true,
            minlength : [5, 'Invalid Address']
        },
        email : {
            type : String,
            trim : true,
            required : true,
            unique : true
        },
        description : {
            type : String,
            trim : true
        },
        password : {
            type : String,
            required : [true, 'Password is Required']
        },
        phone : {
            type : Number,
            trim : true
        }
    },
    {
        timestamps : {}
    }
);

var Company = new Moongose.model('companies', companies);

module.exports = Company;