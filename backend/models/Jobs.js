var Mongoose = require('mongoose');

var Jobs = new Mongoose.Schema(
    {
        _id : {
            type : Mongoose.Schema.Types.ObjectId
        },
        job_type : {
            type : Mongoose.Schema.Types.ObjectId,
            ref : 'job_type'
        },
        company_id :{
            type : Mongoose.Schema.Types.ObjectId,
            ref : 'companies',
        },
        salary : {
            type : Number,
            required : [true, 'Salary is required']
        },
        description : {
            type : String,
            trim : true,
            required : [true, 'Description is required']
        },
        created_date : {
            type : Date,
            default : Date.now()
        },
        due_date : {
            type : Date,
            required : [true, 'Due Date is required']
        },
        positions_avaliable: {
            type : Number,
            required : [true,'Positions Avaliable is required']
        }
    },
    {
        timestamps : {}
    }
);

var Jobs = new Mongoose.model('jobs',Jobs);

module.exports = Jobs;