import CloseIcon from '@material-ui/icons/Close';
import DashboardSharp from '@material-ui/icons/DashboardSharp';
import styles from '../../styles/Sidebar.module.css'

const Sidebar = () => {
    return (
        <aside>
            <div className={styles.sideBarTop}>
                <div className={styles.logo}>
                    <img src='https://img.search.brave.com/B7-CY8jOkJ0wlDhsF0NSh121BMkPPElLhuhOqJc58B4/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/LWZsRGZ1UHV1Uk80/X3o0QTlmc2dnSGFI/YSZwaWQ9QXBp'></img>
                </div>
                <div className={styles.closeSideBar}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles.sideBar}>
                <a href='#' className={styles.active}>
                    <DashboardSharp className='navIcon' />
                    <h3>Dashboard</h3>
                </a>
                <a href='#'>
                    <DashboardSharp className='navIcon' />
                    <h3>Customers</h3>
                </a>
                <a href='#'>
                    <DashboardSharp className='navIcon' />
                    <h3>Transactions</h3>
                </a>
                <a href='#'>
                    <DashboardSharp className='navIcon' />
                    <h3>Settings</h3>
                </a>
                <a href='#'>
                    <DashboardSharp className='navIcon' />
                    <h3>Dashboard</h3>
                </a>
                <a href='#'>
                    <DashboardSharp className='navIcon' />
                    <h3>Dashboard</h3>
                </a>
            </div>
        </aside>
    )
}

export default Sidebar;