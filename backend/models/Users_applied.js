var Mongoose = require('mongoose'),
    AutoInc  = require('mongoose-sequence')(Mongoose); 

var users = new Mongoose.Schema(
    {
        _id : {
            type : Mongoose.Schema.Types.ObjectId
        },
        job_id : {
            type : Mongoose.Schema.Types.ObjectId,
            ref : 'jobs'
        },
        company_id : {
            type : Mongoose.Schema.Types.ObjectId,
            ref : 'companies'
        },
        user_id : {
            type : Mongoose.Schema.Types.ObjectId,
            ref : 'users',
        },
        applied_at : {
            type : Date,
            default : Date.now()
        },
        order : {
            type : Number
        }
    },
    {
        timestamps : {}
    }
);

users.plugin(AutoInc, {inc_field : 'order'});

var users_applied = new Mongoose.model('Users_applied',users);

module.exports = users_applied;