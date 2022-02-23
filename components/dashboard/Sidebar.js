import CloseIcon from '@material-ui/icons/Close';
import DashboardSharp from '@material-ui/icons/DashboardSharp';
import styles from '../../styles/Sidebar.module.css'

const Sidebar = () => {
    return (
<aside>
  <div className={styles.top}>

  </div>
  <div className={styles.sidebar}>
    <a href="#">
      <DashboardSharp />
      <h3>Dashboard</h3>
    </a>
    <a href="#" className={styles.active}>
      <DashboardSharp />
      <h3>Customers</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Orders</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Analytics</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Messages</h3>
      <span className={styles.messagecount}>26</span>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Products</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Reports</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Settings</h3>
    </a>
    <a href="#">
      <DashboardSharp />
      <h3>Add Product</h3>
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