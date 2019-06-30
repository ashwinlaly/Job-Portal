var Mongoose = require('mongoose');

var user = new Mongoose.Schema(
    {
        name : {
            type : String,
            trim : true,
            required : [true, 'User name is Required']
        },
        email : {
            type : String,
            trim : true,
            required : [true, 'User Email is Required']
        },
        password : {
            type : String,
            trim : true,
            required : [true, 'User Password id Required']
        },
        phone : {
            type : String,
            trim : true
        },
        address : {
            type : String,
            trim : true
        },
        experience : [
            {
                description : String,
                month : [Number, 'Invalid month.'],
                year : [Number, 'Invalid year.']
            }
        ],
        education : [
            {
                course : {
                    type : String,
                    trim : true
                },
                from : { 
                    type : Date
                },
                to : {
                    type : Date
                },
                percentage : {
                    type : Number
                }
            }
        ],
        status : {
            type : Boolean,
            default : 1
        }
    },
    {
        timestamps : {}
    }
);


// user.path('email').validate((v)=>{
//     Mongoose.model['users'].find({email:v},(err , doc) =>{
//         if(er){} else if (doc.length >= 1){
//             return false;
//         }
//         return true;
//     });

// }, 'Email validation');


// validate : {
//     validator : (v) => {
//         Mongoose.model['users'].findOne({email:v},(err , doc) =>{
//             if(er){} else if (doc.length >= 1){
//                 return false;
//             }
//             return true;
//         });
//     },
//     message : 'Email fails'
// }

var Users = new Mongoose.model('users',user);

module.exports = Users;