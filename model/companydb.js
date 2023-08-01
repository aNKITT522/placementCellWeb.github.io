const mongoose = require("mongoose");
const validator = require("validator");


const interviewSchema = new mongoose.Schema({
    Company:{
        type:String,
        required:true
    },
  Date: {
    type: Date,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Batch: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

const companySchema = new mongoose.Schema({
  interviews: interviewSchema,
  students: [studentSchema],
});

const InterviewDb = mongoose.model('InterviewDb', companySchema);

module.exports = InterviewDb;




// const interviewSchema = new mongoose.Schema({
//     Title: {
//         type: String,
//         required: true,
//         trim:true,
//         minlength:[5,"Title should be at least 5 characters long"],
//         maxlength:[100,"Title cannot exceed more than 100 characters"]
//             },
//      Date: {
//         type: Date,
//         default :Date.now(),
//         required : true
//      }
// })
// const Interviews= mongoose.model('Interviews',interviewSchema);
// module.exports=Interviews;