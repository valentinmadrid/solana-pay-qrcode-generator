import styles from '../../styles/Rightbar.module.css'
import DashboardSharp from '@material-ui/icons/DashboardSharp'
import { useEffect, useState } from 'react'
import { Router, useRouter } from "next/router";
import { supabase } from "../../client";
const Rightbar = () => {





    return (
        <div className={styles.right}>
  <div className={styles.top}>
    <button id="menu-btn">
    <DashboardSharp />
    </button>

    <div className={styles.profile}>
      <div className={styles.info}>
        <p>
          Hey, great to see you 
        </p>
      </div>
    </div>
  </div>
  {/* END OF TOP */}
  <div className={styles.recentupdates}>
    <h2>Recent Updates</h2>
    <div className={styles.updates}>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="https://imgs.search.brave.com/vVyZzq1tnfFuKC58Ua9Qm5g4UUqZepIsKJV5V3pPSoA/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9hbWF6/aW5nc3RpY2tlcmNv/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9zdGlj/a2VyXzY2Mi5qcGc" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Valentin Madrid</b> Added a Customers Page to the App.
          </p>
          <small className={styles.textmuted}>1 Week ago</small>
        </div>
      </div>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="https://imgs.search.brave.com/vVyZzq1tnfFuKC58Ua9Qm5g4UUqZepIsKJV5V3pPSoA/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9hbWF6/aW5nc3RpY2tlcmNv/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9zdGlj/a2VyXzY2Mi5qcGc" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Valentin Madrid</b> Added a Transactions Page to the App.
          </p>
          <small className={styles.textmuted}>1 Month ago</small>
        </div>
      </div>
      <div className={styles.update}>
        <div className={styles.profilephoto}>
          <img src="https://imgs.search.brave.com/vVyZzq1tnfFuKC58Ua9Qm5g4UUqZepIsKJV5V3pPSoA/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9hbWF6/aW5nc3RpY2tlcmNv/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNi9zdGlj/a2VyXzY2Mi5qcGc" />
        </div>
        <div className={styles.message}>
          <p>
            <b>Valentin Madrid</b> Created a basic Dashboard.
          </p>
          <small className={styles.textmuted}>2 Months ago</small>
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
          <small className={styles.textmuted}>All time</small>
        </div>
        <h5 className={styles.success}>+0%</h5>
        <h3>0</h3>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.icon}>
        <DashboardSharp />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>OFFLINE ORDERS</h3>
          <small className={styles.textmuted}>All time</small>
        </div>
        <h5 className={styles.danger}>+0%</h5>
        <h3>0</h3>
      </div>
    </div>
    <div className={styles.item}>
      <div className={styles.icon}>
      <DashboardSharp />
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>NEW CUSTOMERS</h3>
          <small className={styles.textmuted}>All time</small>
        </div>
        <h5 className={styles.success}>+0%</h5>
        <h3>0</h3>
      </div>
    </div>

  </div>
</div>
    )
}

export default Rightbar;