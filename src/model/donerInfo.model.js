import mongoose from "mongoose";

const {Schema} = mongoose
const DonerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    authType:{
        type:String
    }
},{timestamps:true})

const donerInfo = mongoose.model('donerInfo',DonerSchema)

export default donerInfo
