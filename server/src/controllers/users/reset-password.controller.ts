import {Request, Response} from "express"; 
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt"; 

export const resetPassword = async (req: Request, res: Response)=>{
    try{
        const {email,password}= req.body; 
        const userEmailCheck = await UserModel.findOne({email}); 

         if (!userEmailCheck) return res.status(404).send({message:"User not found"}); 

         const checkPasswordValid = bcrypt.compareSync(password,userEmailCheck.password); 

         if (!checkPasswordValid)
            return res.status (401).send ({message: "Invalid password"})
        res.status(200).send({message: "User signed in successfully", data: userEmailCheck}
        ); 
    } catch (error){
        console.error (error); 
        res.status(500).send ({message: "Error signing in ", error: error })
    }

}; 