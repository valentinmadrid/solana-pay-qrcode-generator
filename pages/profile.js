import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";

const Profile = () => {
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        fetchProfile()
    }, [])
    
    const router = useRouter()
    const fetchProfile = async() => {
        const profileData = await supabase.auth.user()
        if (!profileData) {
            router.push('/login')
        } else {
            setProfile(profileData)
        }
    }
    async function signOut() {
        await supabase.auth.signOut()
        router.push('/login')
      }

    if(!profile) return null;
    return(
    <div>
    <h1>Your profile</h1>
    <p>email: {profile.email}</p>
    <input type="text" placeholder={profile.email} />
    <button onClick={signOut}>sign out</button>
    </div>
    )
}


export default Profile;