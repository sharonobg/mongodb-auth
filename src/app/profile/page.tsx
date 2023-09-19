"use client"

import axios from "axios";
import {useState} from 'react';
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data,setData]= useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            console.log("Logout success");
            toast.success('You have logged out' )
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);

        }
    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/user-profile')
        
        console.log('username: ',res.data.data.username);
        //const usernamep = res.data.data.username;
        setData(res.data.data._id)//messy says tutor

    }
    return(
        <div 
        className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-xl">Profile Page</h1>
            <hr />
            <p>My Profile:</p>
            <h2 
            className="bg-red-200 p-4">{data === "nothing" ? "Nothing here" : <Link href={`/profile/${data}`}>{`${data}`}</Link> }</h2>
            <hr />
            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 rounded-lg text-white py-2 px-4 mt-4">Logout</button>
            <button
            onClick={getUserDetails}
            className="bg-red-300 hover:bg-red-500 rounded-lg text-red hover:text-white px-4 py-2 m-4">Get User Data</button>
        </div>
    )
}