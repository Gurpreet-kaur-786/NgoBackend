import mongoose from 'mongoose'
const {Schema} = mongoose
const authSchema = new Schema({
    student_Name:{
        type:String,
    },
 
    course:{
        type:String,
        
    },                    
    father_Name:{
        type:String,
        
    },
    mother_Name:{
        type:String,
        
    },
    family_Income:{
        type:Number,
        
    },
    need:{
        type:String,
        
    },
    amount:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
       
    },
    password:{
        type:String,
        

    },
    contact_No:{
        type:Number,
        
    },
    address:{
        type:String,
        
    },
    authType:{
        type:String,
        enum: ["Student","ngoOwner"],
        default:"Student"
    },
    token:{
        type:String
    },
    image:{
        type:String
    },
    Bank_Name:{
        type:String
    },
    Bank_Acc_No:{
        type:String
    },
    Ifsc_num:{
        type:String
    },
    AdharImage:{
        type:String
    },
    IncomeImage:{
        type:String
    },
    pincode:{
        type:String
    },
    paragraph:{
        type:String
    },
    StudentImgShow:{
        type:String,
        enum: ["Yes","No"],
        default:"Yes"
    },
    Registration_no:{
        type:String,
        // required:true
    }


},{timestamps:true})

const auth = mongoose.model('auth',authSchema)
export default auth 