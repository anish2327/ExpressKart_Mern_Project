import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    
    },

    email : {
        type : String,
        required: true,
        unique : true

    },
    password : {
        type : String,
        required: true
    },
    mobileNo : {
        type : Number,
        default : null

    },
    status : {
        type : String,
        enum : ["Active", "Inactive", "suspended"],
        default : "Active"
    },

},{
    timestamp:true
})

const userModel = mongoose.model("User", userSchema);
export default userModel;