import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';

const SettingsComponent = () => {
    return (
<main>
  <h1>Dashoard</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Sign Up</h3>
          <input className={styles.input}
          type='email'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
          <input className={styles.input}
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <input className={styles.input}
          placeholder='First Name'
          onChange={e => setFirstName(e.target.value)}
          style={{ margin: 10 }}
        />
        <input className={styles.input}
          placeholder='Last Name'
          onChange={e => setSecondName(e.target.value)}
          style={{ margin: 10 }}
        />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </div>
    </div>
</main>
    )
}

export default SettingsComponent;