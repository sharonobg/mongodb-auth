"use client";
import Link from "next/link";
import React,{useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {toast} from "react-hot-toast";


export default function SignUpPage() {
    const router = useRouter();
    //states:
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled]=React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error:any){
            console.log("Signup failed", error.message)
            // needs config: 
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(user.email.length > 3 && user.password.length > 3 && user.username.length > 3 ){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[user])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-center text-4xl mb-4">{loading ? "Processing" : "Sign Up"}</h1>
        <hr />
        <label htmlFor="username">username</label> 
        <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-blue-400"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({...user,username:e.target.value})} 
            placeholder="username"
            />
            <label htmlFor="username">username</label> 
        <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-blue-400"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})} 
            placeholder="email"
            />
            <label htmlFor="username">password</label> 
        <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-blue-400"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})} 
            placeholder="password"
            />
            <button 
            onClick={onSignup}
            className="mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit Log In Page</Link>
        </div>
    )
}