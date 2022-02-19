import Sidebar from "../components/dashboard/sidebar"
import { useEffect, useState } from "react"
import { Router, useRouter } from "next/router";
import { supabase } from "../client";


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
        <body>
        <div className="container">
        <Sidebar />
        <h1>Dashboard</h1>
        </div>
        </body>

    )
}

export default Dashboard;