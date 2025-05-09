import bcrypt from 'bcrypt';
import auth from "../model/auth.model.js";
import { createToken } from '../middleware/token.js';
// import cloudinary from '../config/cloudniary.js'
import validate from '../model/validate.model.js';
import donerInfo from '../model/donerInfo.model.js';
import cloudinary from '../config/cloudniary.js';

export async function handleAuth(req, res) {
    const { 
        student_Name, 
        course, 
        father_Name, 
        mother_Name, 
        family_Income, 
        need, 
        amount, 
        email, 
        password, 
        contact_No, 
        Bank_Name, 
        Bank_Acc_No, 
        Ifsc_num, 
        houseNo, 
        StreetNo, 
        city, 
        state, 
        pincode ,
        paragraph,
        StudentImgShow,
        Registration_no
    } = req.body;

    // Access files from req.files
    const img1 = req.files.img1 ? req.files.img1[0] : null;
    const img2 = req.files.img2 ? req.files.img2[0] : null;
    const img3 = req.files.img3 ? req.files.img3[0] : null;

    try {
        let typeofUser = email === process.env.ADMIN_EMAIL ? "ngoOwner" : "Student";

        // Upload images to Cloudinary
        const [img1url, img2url, img3url] = await Promise.all([
            img1 ? cloudinary.uploader.upload(img1.path) : null,
            img2 ? cloudinary.uploader.upload(img2.path) : null,
            img3 ? cloudinary.uploader.upload(img3.path) : null
        ]);

        const check = await auth.findOne({ email });
        if (check) {
            return res.status(400).send('Already exists');
        }

        if (family_Income > 90000) {
            return res.status(400).send("You are not eligible for the scholarship");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const address = `House No : ${houseNo}, Street No : ${StreetNo}, City : ${city}, State : ${state}, Pincode : ${pincode}`;

        // Create new auth record
        const option = new auth({
            student_Name,
            course,
            father_Name,
            mother_Name,
            family_Income,
            need,
            amount,
            email,
            password: hashPassword,
            contact_No,
            address,
            authType: typeofUser,
            Bank_Name,
            Bank_Acc_No,
            Ifsc_num,
            pincode,
            IncomeImage: img3url ? img3url.secure_url : null,
            AdharImage: img2url ? img2url.secure_url : null,
            image: img1url ? img1url.secure_url : null,
            StudentImgShow,
            paragraph,
            Registration_no
        });

        if (typeofUser === 'Student') {
            const validationOption = new validate({
                student_id: option._id,
                status: "Pending"
            });
            await validationOption.save();
        }

        await option.save();
        res.status(200).send('Success');

    } catch (error) {
        console.log(error);
        res.status(500).send('SERVER ERROR');
    }
}


export async function handleAuthLogin(req, res) {
    const { email, password } = req.body
    console.log(req.body)
    try {
        let myData = await auth.findOne({ email }) || await donerInfo.findOne({ email });
        console.log(myData)
        if (!myData) {
            return res.status(404).send('not found')
        }

        console.log("Stored hashed password:", myData.password);

        const isValidPassword = await bcrypt.compare(password, myData.password);
        if (!isValidPassword) {
            return res.status(400).send('password or email is wrong')
        }
        let token = createToken(myData)
        myData.token = token
        await myData.save()
        res.cookie('authToken', token, {
            httponly: true
        })
        let data = {
            email,
            token,
            authType: myData.authType
        }
        res.status(200).send(data)

        // res.status(200).send(myData)

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')

    }

}

export async function handleGetData(req, res) {
    try {
        const specificData = await auth.find({ authType: "Student" })
        console.log(specificData)
        if (!specificData) {
            return res.status(404).send('not found')
        }
        res.status(200).send(specificData)

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')

    }

}

export async function handleSingleData(req, res) {
    const { id } = req.params
    try {
        const fetchData = await auth.findOne({ _id: id })
        console.log(fetchData)
        res.status(200).send(fetchData)

    } catch (error) {
        console.log(error)
        res.status(500).send("SERVER ERROR")
    }
}


export async function handleUpdate(req,res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
    
        // 1. Fetch existing user to compare password
        const existingUser = await auth.findById(id);
        if (!existingUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // 2. Only hash password if it's changed (and not already hashed)
        if (updateData.password && updateData.password !== existingUser.password) {
          const isHashed = updateData.password.startsWith('$2b$'); // bcrypt hash check
          if (!isHashed) {
            const hashPassword = await bcrypt.hash(updateData.password, 10);
            updateData.password = hashPassword;
          }
        }
    
        if (!Object.keys(updateData).length) {
          return res.status(400).json({ message: 'No fields provided for update' });
        }
    
        const updateAuth = await auth.findByIdAndUpdate(
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

export async function getSpecificData(req,res) {
    const {id} = req.user
    try {
        const check = await auth.findOne({_id:id}) || await donerInfo.findOne({_id:id})
        if(!check){
            return res.status(404).send('user not found')
        }
        res.status(200).send(check)
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
        
    }

    
}