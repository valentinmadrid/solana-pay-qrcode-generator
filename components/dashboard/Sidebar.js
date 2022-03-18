import CloseIcon from '@material-ui/icons/Close';
import DashboardSharp from '@material-ui/icons/DashboardSharp';
import styles from '../../styles/Sidebar.module.css'
import { useRouter } from "next/router";
import Link from 'next/link'

const Sidebar = () => {
  const router = useRouter();
  const selected = router.query.selected
    return (
<aside>
  <div className={styles.top}>

  </div>
  <div className={styles.sidebar}>
    <Link href="/dashboard">
      <DashboardSharp />
      <h3>Dashboard</h3>
    </Link>
    <Link href="/settings">
      <DashboardSharp />
      <h3>Settings</h3>
    </Link>
    <Link href="/transactions">
      <DashboardSharp />
      <h3>Transactions</h3>
    </Link>
    <Link href="/customers">
      <DashboardSharp />
      <h3>Customers</h3>
    </Link>
    <Link href="/profile">
      <DashboardSharp />
      <h3>Profile</h3>
    </Link>
    <Link href="/payment/cheezychips">
      <DashboardSharp />
      <h3>My Store</h3>
    </Link>
    <Link href="#">
      <DashboardSharp />
      <h3>Logout</h3>
    </Link>
  </div>
</aside>

    )
}

export default Sidebar;