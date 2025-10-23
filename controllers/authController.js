
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import prisma from "../utils/prisma.js"
import bcrypt from "bcrypt"
import { sendtokens } from "../utils/jwttoken.js";


const register = catchAsyncError(async (req,res, next)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return next(new Errorhandler("Please fill all fields",400));
        }
        const existingUser = await prisma.user.findUnique({where:{email}});
        if(existingUser){
            return next(new Errorhandler("User already exists",400));
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword
            }

        });
        sendtokens(user,201,"Registered Successfully",res);


        
    } catch (error) {
        
    }
})

export {register};