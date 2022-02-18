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
            router.push('/auth')
        } else {
            setProfile(profileData)
        }
    }
    if(!profile) return null;
    return(
    <div>
    <h1>Your profile</h1>
    <p>email: {profile.email}</p>
    </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
  
    if (!user) {
      return { props: {}, redirect: { destination: '/auth' } }
    }
  
    return { props: { user } }
  }

export default Profile;