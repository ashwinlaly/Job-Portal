var Mongoose = require('mongoose'),
    job_type = require('./models/Job_type');

    // seeder = require('mongoose-seed'),

Mongoose.connect("mongodb://localhost:27017/job_portal",{useNewUrlParser : true, useFindAndModify : false} , (err, con) => {
    if(err){
        console.log(err);
    } else {
        //  seeder.connect("mongodb://localhost:27017/job_portal" , () => {
        //     seeder.clearModels('job_type', () =>{
        //         seeder.populateModels(data, ()=>{
        //             console.log("Loaded All Data.");
        //            seeder.disconnect();
        //         });
        //     });
        // });
        console.log("Connection created");
    }
});


// var data = [
//     {
//         'model' : 'job_type',
//         'documents' : [
//             {
//                 'job_name' : 'Backend Developer'
//             },
//             {
//                 'job_name' : 'Frontend Developer'
//             },
//             {
//                 'job_name' : 'Web Developer'
//             },
//             {
//                 'job_name' : 'System Administrator'
//             },
//             {
//                 'job_name' : 'Database Administrator'
//             }
//         ]
//     }
// ];