import CloseIcon from '@material-ui/icons/Close';
import DashboardSharp from '@material-ui/icons/DashboardSharp';
import styles from '../../styles/Sidebar.module.css'
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const selected = router.query.selected
    return (
<aside>
  <div className={styles.top}>

  </div>
  <div className={styles.sidebar}>
    <a href="/dashboard">
      <DashboardSharp />
      <h3>Dashboard</h3>
    </a>
    <a href="/settings">
      <DashboardSharp />
      <h3>Settings</h3>
    </a>
    <a href="/coupons">
      <DashboardSharp />
      <h3>Coupons</h3>
    </a>
    <a href="/transactions">
      <DashboardSharp />
      <h3>Transactions</h3>
    </a>
    <a href="/profile">
      <DashboardSharp />
      <h3>Profile</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Logout</h3>
    </a>
  </div>
</aside>

    )
}

export default Sidebar;