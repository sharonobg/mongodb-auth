import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import {NextRequest,NextResponse}from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody)
        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        //check if password is correct
        const validPassword = await bcryptjs.compare
        (password,user.password)
        if(!validPassword){return NextResponse.json({error: "Password is incorrect"}, {status: 400})}

        //create Token and encrypt it (can have a lot of data)- then send secure cookie to user
        //create Token data
        const tokenData = {
            id: user._id,//can see _id in mongodb user
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        //send to cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token",token,{
            httpOnly:true, 
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status: 500})
    }
}