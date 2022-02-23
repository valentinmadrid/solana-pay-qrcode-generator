import styles from '../../styles/Rightbar.module.css'
import DashboardSharp from '@material-ui/icons/DashboardSharp'
import { useEffect, useState } from 'react'
import { Router, useRouter } from "next/router";
import { supabase } from "../../client";
const Rightbar = () => {
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


  if(!profile) return null;
    return (
        <div className={styles.right}>
  <div className={styles.top}>
    <button id="menu-btn">
    <DashboardSharp />
    </button>
    <div className={styles.themetoggler}>
      <DashboardSharp />
      <DashboardSharp />
    </div>
    <div className={styles.profile}>
      <div className={styles.info}>
        <p>
          Hey, <b>{profile.name}</b>
        </p>
        <small className={styles.textmuted}>Admin</small>
      </div>
      <div className={styles.profilephoto}>
        <img src="./images/profile-1.jpg" />
      </div>
    </div>
  </div>
  {/* END OF TOP */}
  <div className={styles.recentupdates}>
    <h2>Recent Updates</h2>
    <div className={styles.updates}>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="./images/profile-2.jpg" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Mike Tyson</b> received his order of Night lion tech GPS drone.
          </p>
          <small className={styles.textmuted}>2 Minutes Ago</small>
        </div>
      </div>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="./images/profile-3.jpg" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Mike Tyson</b> received his order of Night lion tech GPS drone.
          </p>
          <small className={styles.textmuted}>2 Minutes Ago</small>
        </div>
      </div>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="./images/profile-4.jpg" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Mike Tyson</b> received his order of Night lion tech GPS drone.
          </p>
          <small className={styles.textmuted}>2 Minutes Ago</small>
        </div>
      </div>
    </div>
  </div>
  {/*--------------- END OF RECENT UPDATES ------------------*/}
  <div className={styles.salesanalytics}>
    <h2>Sales Analytics</h2>
    <div className={styles.item}>
      <div className={styles.icon}>
        <DashboardSharp />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>ONLINE ORDERS</h3>
          <small className={styles.textmuted}>Last 24 Hours</small>
        </div>
        <h5 className={styles.success}>+39%</h5>
        <h3>3849</h3>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.icon}>
        <DashboardSharp />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>OFFLINE ORDERS</h3>
          <small className={styles.textmuted}>Last 24 Hours</small>
        </div>
        <h5 className={styles.danger}>-17%</h5>
        <h3>1100</h3>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.icon}>
      <DashboardSharp />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>NEW CUSTOMERS</h3>
          <small className={styles.textmuted}>Last 24 Hours</small>
        </div>
        <h5 className={styles.success}>+25%</h5>
        <h3>849</h3>
      </div>
    </div>

  </div>
</div>
    )
}

export default Rightbar;