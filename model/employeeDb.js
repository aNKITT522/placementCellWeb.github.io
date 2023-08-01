const mongoose = require("mongoose");
const validator = require("validator");

const singupSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        lowercase: true,
    },
    email : {
        type: String,
        required : true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email') ;
            }
        }
    },
    password:{
        type:String,
        minlength:[6,"Password should be at least 6 characters long"],
        maxlength:[20,"Password can not exceed more than 20 character"],
        trim:true,
        required: [true,'Please provide a valid Password']
    },
})

const EmployeeData = mongoose.model('EmployeeData',singupSchema);

module.exports = EmployeeData;