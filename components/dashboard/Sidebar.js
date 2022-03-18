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
    <Link href="/profile">
      <a>
      <DashboardSharp />
      <h3>Profile</h3>
      </a>
    </Link>
    <Link href="/payment/cheezychips">
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