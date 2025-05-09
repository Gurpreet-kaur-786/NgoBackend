import auth from "../model/auth.model.js";
import Doner from "../model/donation.model.js";

export async function handleDoner(req,res) {
    const{student_id,donationAmount} = req.body
    const {id} = req.user
    console.log(req.user)
    console.log(req.body)
    try {

        const studentDetail = await auth.findOne({_id:student_id})
        const check = await Doner.findOne({student_id})
        // console.log(check)

        const sum = studentDetail.amount - Number(donationAmount )
        console.log(sum)


        // if(check){
        //     return res.status(404).send('already exist')
        // }

       
        const updateStudent = await auth.findByIdAndUpdate({_id:studentDetail._id},{amount:sum},{new:true})

        const option = new Doner({
            student_id,
            donerId:id,
            donationAmount
        })
        await option.save()
        res.status(200).send("Donate SuccessFully")
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}

export async function handleDonerGet(req,res) {
    
    try {
        const specificData = await Doner.find().populate([
            {path:"donerId"},
            {path:"student_id",select:"student_Name authType email"}
        ])
        // console.log(specificData)
        if(!specificData){
           return res.status(404).send('not found')
        }
        res.status(200).send(specificData)
    
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}



export async function handleSpecficDonerGet(req,res) {
    const {id} = req.user
    try {
        const specificData = await Doner.find({donerId:id}).populate([
            {path:"donerId"},
            {path:"student_id",select:"student_Name authType email"}
        ])
        // console.log(specificData)
        if(!specificData){
           return res.status(404).send('not found')
        }
        res.status(200).send(specificData)
    
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}
