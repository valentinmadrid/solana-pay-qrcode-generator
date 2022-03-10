import { supabase } from "../client";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import ProfileComponent from "../components/dashboard/ProfileComponent"
import Rightbar from "../components/dashboard/Rightbar";
import Sidebar from "../components/dashboard/Sidebar";

const Profile = () => {
    return(
        <div>
<Sidebar />
<ProfileComponent />
<Rightbar />
</div>
    )
}


export default Profile;