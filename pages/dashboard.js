import Sidebar from "../components/dashboard/Sidebar"
import Main from "../components/dashboard/Main"
import { useEffect, useState } from "react"
import { Router, useRouter } from "next/router";
import { supabase } from "../client";
import Rightbar from "../components/dashboard/Rightbar";


const Dashboard = () => {
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

    return (

        <div className="container">
        <Sidebar />
        <Main />
        <Rightbar />
        </div>


    )
}

export default Dashboard;