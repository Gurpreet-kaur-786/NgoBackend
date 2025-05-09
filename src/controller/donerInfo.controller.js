import donerInfo from "../model/donerInfo.model.js";
import bcrypt from 'bcrypt';

export async function handleDonerInfo(req,res) {
    const {name,email,password} = req.body
    console.log(req.body)
    try {
        const check = await donerInfo.findOne({email})
        console.log(check)
        if(check){
            return res.status(400).send('already exist')
        }
        const hashPassword = await bcrypt.hash(password,10)
        const option = new donerInfo({
            name,
            email,
            password:hashPassword,
            authType:"Doner"
        })
        await option.save()
        res.status(200).send('sucess')
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
}

export async function handleDonerInfoGet(req,res) {
    try {
        const getData = await donerInfo.find()
        if(!getData){
            return res.status(404).send('not found')
        }
        res.status(200).send('sucess')
        console.log(getData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }
    
} 

export async function updateDonorInfo(req,res) {
     try {
            const { id } = req.params;
            const updateData = req.body;
        
            // 1. Fetch existing user to compare password
            const updateDonor = await donerInfo.findById(id);
            if (!updateDonor) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            // 2. Only hash password if it's changed (and not already hashed)
            if (updateData.password && updateData.password !== updateDonor.password) {
              const isHashed = updateData.password.startsWith('$2b$'); // bcrypt hash check
              if (!isHashed) {
                const hashPassword = await bcrypt.hash(updateData.password, 10);
                updateData.password = hashPassword;
              }
            }
        
            if (!Object.keys(updateData).length) {
              return res.status(400).json({ message: 'No fields provided for update' });
            }
        
            const updateAuth = await donerInfo.findByIdAndUpdate(
              id,
              { $set: updateData },
              { new: true }
            );
        
            if (!updateAuth) {
              return res.status(404).json({ message: 'Document not found' });
            }
        
            res.status(200).json({ message: 'Update successful', updateAuth });
        } catch (error) {
            console.error('Update error:', error);
            return res.status(500).send("SERVER ERROR");
        }
    
}