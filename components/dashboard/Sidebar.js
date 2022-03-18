import CloseIcon from '@material-ui/icons/Close';
import DashboardSharp from '@material-ui/icons/DashboardSharp';
import styles from '../../styles/Sidebar.module.css'
import { useRouter } from "next/router";
import Link from 'next/link'
import { useState, useEffect } from "react"
import { supabase } from "../../client";

const Sidebar = () => {
  const [url , setUrl] = useState("")
  const user = supabase.auth.user()
  useEffect(() => {
    fetchData()
  },[])
  const fetchData = async() => {
    let { data, error, status } = await supabase
    .from('stores')
    .select('url')
    .eq('owner', user.id)
    .single()
    setUrl(data.url)
    console.log(data)



  if (error && status !== 406) {
    throw error
    console.log(error)
  }

  if (data) {
  }

  }

  const router = useRouter();
  const selected = router.query.selected
    return (
<aside>
  <div className={styles.top}>

  </div>
  <div className={styles.sidebar}>
    <Link href="/dashboard">
      <a>
      <DashboardSharp />
      <h3>Dashboard</h3>
      </a>
    </Link>
    <Link href="/settings">
      <a>
      <DashboardSharp />
      <h3>Settings</h3>
      </a>
    </Link>
    <Link href="/transactions">
      <a>
      <DashboardSharp />
      <h3>Transactions</h3>
      </a>
    </Link>
    <Link href="/customers">
      <a>
      <DashboardSharp />
      <h3>Customers</h3>
      </a>
    </Link>
    <Link href={"/payment/" + url}>
      <a>
      <DashboardSharp />
      <h3>My Store</h3>
      </a>
    </Link>
    <Link href="#">
      <a>
      <DashboardSharp />
      <h3>Logout</h3>
      </a>
    </Link>
  </div>
</aside>

    )
}

export default Sidebar;