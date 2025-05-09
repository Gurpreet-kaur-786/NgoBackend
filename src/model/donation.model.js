import mongoose from 'mongoose'
const { Schema } = mongoose
const donerSchema = new Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"auth"
    },
    donerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"donerInfo"
    },
    donationAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true })
const Doner = mongoose.model('Doner', donerSchema)
export default Doner 