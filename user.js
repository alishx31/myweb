const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        // validate:{
        //    validator:(value)=>{

        //    } ,
        //    message:'{value} is not a valid email'
        // }
    },
    password:{
        type:String,
        require:true,
        minlength:4
    }
});

const User = mongoose.model('users',UserSchema)
module.exports= User;