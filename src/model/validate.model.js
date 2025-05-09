import mongoose from "mongoose";
const { Schema } = mongoose
const validateSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    },
    status:{
        type:String,
        enum: ["Approved","Disapproved","Pending"],
        default:"pending"

    }
},{timestamps:true})
const validate = mongoose.model('validate',validateSchema)

export default validate