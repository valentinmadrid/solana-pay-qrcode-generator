import styles from '../styles/Payment.module.css'
export default function Header(props) {
    return (
        <header className={styles.header}>
            <img 
                src="./images/troll-face.png" 
                className={styles.headerimage}
            />
            <h2 className={styles.headertitle}>{props.storename}</h2>
            <h4 className={styles.headerproject}>Powered by Solana Pay</h4>
        </header>
    )
}