const mongoose = require('mongoose');
const validator = require('validator');


const studentSchema = new mongoose.Schema({
    Batch:{
        type:String,
        default:"A",
        uppercase:true,//batch should always start with capital letter A-Z
    },
    Name: {
        type:String,
        required:[true,'Name is Required'],
        trim: true
      },
    Email:{
        type : String,
        unique:[true,"email must be unique"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        },
        lowercase:true, //convert all emails to lower case before saving in db
      },
      Placed:{
        type:Boolean,
        trim:true,//remove any leading or trailing whitespace from input value when validating it
        uppercase:false,//converts user's entered text into upper-case letters while storing them in
    },
    Scores: [
    {
      course: {
        type: String, // Assuming the course is represented by a string (e.g., course name)
        uppercase:true,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    }
  ],
    Interviews: [
    {
        company:{
            type: String,
            uppercase: true,//company names are always capitalized so we convert it here while storing data into
            maxlength: 50,
            minlength:2,
            required: false
        },
        date:{
            type:Date,
            required:true
        },
    }
    ],
    ResultStatus :{
        type:String,
        enum:['pass','fail','onHold','not attempted'],
        default:'not attempted',
        required:true,

    }
  
    
})


const StudentDB = mongoose.model('StudentDB',studentSchema);

module.exports = StudentDB;