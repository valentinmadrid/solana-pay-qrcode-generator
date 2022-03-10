import { supabase } from "../../client";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
const ProfileComponent = () => {
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
    return (
<main>
  <h1>Settings</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Store Settings</h3>

          <label>Wallet Adress</label>
          <input
          placeholder={profile.email}
          onChange={e => setWallet(e.target.value)}
          style={{ margin: 10 }}
          className={styles.forminput}
        />
        <br />
        <button onClick={() => handleStoreInfoSubmit()}>Update Info</button>
        </div>
      </div>

    </div>
    </div>
</main>
    )
}

export default ProfileComponent;