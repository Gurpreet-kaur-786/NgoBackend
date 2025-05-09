import Doner from "../model/donation.model.js";
import validate from "../model/validate.model.js";

export async function handleValidate(req,res) {
    const{student_id,status} = req.body
    console.log(req.body)
    try {
        const check = await validate.findOne({student_id})
        console.log(check)
        if(check)
        {
            return res.status(400).send('already exist')
        }
        const option = new validate({
            student_id,
            status
        })
        await option.save()
        res.status(200).send('sucess')
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }    
}

export async function handleValidateLogin(req,res) {
    try {
        const data = await validate.find().populate('student_id')
        console.log(data)
        if(!data){
            return res.status(404).send('not found')
        }
        res.status(200).send(data) 
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}

export async function handleValidateUpdate(req,res) {
    const {id,status} = req.body
    console.log(req.body)
    try {
        const updateData = await validate.findByIdAndUpdate({_id:id},{status},{new:true})
        console.log(updateData)
        if(!updateData){
            return res.status(400).send('data not updated')
        }
        res.status(200).send(updateData)
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}

export async function handleStudentGet(req,res) {
    try {
        const getData = await validate.find().populate([
            {path:"student_id",
            match:{amount: {$gt:0} },
            select:"student_Name family_Income need amount email"
        }

        ])
        if(!getData){
            return res.status(404).send('not found')
        }
        res.status(200).send(getData)
        console.log(getData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
} 

export async function handleByIdGet(req,res) {
    const {id} = req.params
    try {
        const getData = await validate.findOne({_id:id}).populate([
            {path:"student_id",
            match:{amount: {$gt:0} }
        }

        ])
        if(!getData){
            return res.status(404).send('not found')
        }
        res.status(200).send(getData)
        console.log(getData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}
export async function OnlyValid(req,res) {
    try {
        const onlyValid = await validate.find({ status: "Approved" }).populate([
            {path:"student_id",
            match:{amount: {$gt:0}},
            
        }

        ])
        if(!onlyValid){
            return res.status(404).send('not found')
        }
        res.status(200).send(onlyValid)
        console.log(onlyValid)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
        
    }
    
}
export async function GetStudentApplication(req,res){
    const {id} = req.user
    console.log(req.user)
    try {
        const getApplicationData = await validate.findOne({student_id:id}).populate("student_id")
        if(!getApplicationData){
            return res.status(404).send('not found')
        }
        res.status(200).send(getApplicationData)
        console.log(getApplicationData)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
}


export async function handleDelete(req,res) {
    const {id} = req.params
    console.log(req.body)
    try {
        const updateData = await validate.findByIdAndDelete(id)
    
        res.status(200).send("Delete SuccessFully")
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}

export async function handleStudeDetail(req,res) {
    const {id} = req.user
    console.log(id)
    try {
        const getData = await validate.findOne({student_id:id}).populate('student_id')
        if(!getData){
            return res.status(404).send('not found')
        }
        res.status(200).send(getData)
        console.log(getData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}