import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { supabase } from "../client"
import { useRouter } from "next/router"


const Auth = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
      console.log(email + password)
    
    }, [email, password])
    
    const signIn = async() => {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            console.log(error)
        } else {
            console.log("logged in")
            router.push('/profile')
        }
    }

    const signUp = async() => {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            console.log(error)
        } else {
            console.log("logged in")
        }
    }

    return(
        <div>
        <h1>Login page</h1>
        <input 
        type="text" 
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
        />
        <input 
            type="password" 
            placeholder="password" 
            onChange={e => setPassword(e.target.value)}
        />


        <button onClick={() => signIn()}>Login</button>
        <button onClick={() => signUp()} >Register</button>
        </div>
    )
}

export default Auth;