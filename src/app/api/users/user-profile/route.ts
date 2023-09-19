import {connect} from "@/dbconfig/dbconfig";
import {getTokenData} from "@/helpers/getTokenData";
import {NextRequest, NextResponse} from "next/server";
import User from '@/models/userModel';

connect()

export async function GET(request: NextRequest){
    try{
        const userID = await getTokenData(request);
        //const user = await User.findOne({_id: userID})
        const user = await User.findById({_id: userID})
        .select("-password  -isAdmin" );
        return NextResponse.json({
            message: "User found",
            data:user
        })

    } catch (error:any) {
        return NextResponse.json({error: error.messager},{status:400});
    }
}
