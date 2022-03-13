import { supabase } from "../../client";
import Home from "../../pages";
import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import TransactionsComponent from "./TransactionsComponent";

const Main = () => {
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()

  useEffect(() => {
    fetchData()
  }, [])

    const [insights, setInsights] = useState([])
    const amount = '12'

    const fetchData = async() => {
      setLoading(true)

      let { data, error, status } = await supabase
      .from('stores')
      .select('totalprofit, totalcustomers')
      .eq('owner', user.id)
      setInsights(data)
      console.log(data)
  
  
  
    if (error && status !== 406) {
      throw error
      console.log(error)
    }
  
    if (data) {
      setInsights(data)
      setLoading(false)
    }
  
    }

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
<main>
  <h1>Dashoard</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <MoneyIcon sx={{ fontSize: 30 }} color="secondary" />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Sales</h3>
          {
            insights.map((insights) => (
          <h1>{insights.totalprofit} $</h1>
          ))}
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>81%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF SALES ------------*/}
    <div className={styles.expenses}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Customers</h3>
          {
            insights.map((insights) => (
          <h1>{insights.totalcustomers}</h1>
          ))}
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>62%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF EXPENSES ------------*/}
    <div className={styles.income}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Income</h3>
          <h1>$10,864</h1>
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>44%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF INCOME ------------*/}
  </div>
  {/*---------- END OF INSIGHTS ------------*/}
<TransactionsComponent />
</main>
    )
}

export default Main;