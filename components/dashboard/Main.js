import { supabase } from "../../client";
import Home from "../../pages";
import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import TransactionsComponent from "./TransactionsComponent";
import PersonIcon from '@material-ui/icons/Person';

const Main = () => {
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()
  const [url, setUrl] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

    const [insights, setInsights] = useState([])
    const amount = '12'

    const fetchData = async() => {
      setLoading(true)

      let { data, error, status } = await supabase
      .from('stores')
      .select('totalprofit, totalcustomers, url')
      .eq('owner', user.id)
      setInsights(data)
      setUrl(data.url)
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
      <MoneyIcon sx={{ fontSize: 20 }} />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Sales</h3>
          {
            insights.map((insights) => (
          
          <h1 key={1}>{insights.totalprofit} $</h1>
          ))}
        </div>

      </div>
      <small className={styles.textmuted}>All time</small>
    </div>
    {/*---------- END OF SALES ------------*/}
    <div className={styles.expenses}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Customers</h3>
          {
            insights.map((insights) => (
          <h1 key={1}>{insights.totalcustomers}</h1>
          ))}
        </div>

      </div>
      <small className={styles.textmuted}>All time</small>
    </div>
    {/*---------- END OF EXPENSES ------------*/}
    <div className={styles.income}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Income</h3>
          <h1>0 $</h1>
        </div>

      </div>
      <small className={styles.textmuted}>All time</small>
    </div>
    {/*---------- END OF INCOME ------------*/}
  </div>
  {/*---------- END OF INSIGHTS ------------*/}
<TransactionsComponent />
</main>
    )
}

export default Main;