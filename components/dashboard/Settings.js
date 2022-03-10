import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

const SettingsComponent = () => {
  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = useState(null)
  const [storeName, setStoreName] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const user = supabase.auth.user()

  const fetchData = async() => {
    setLoading(true)


    let { data, error, status } = await supabase
    .from('stores')
    .select(`wallet, url, name`, `description`)
    .eq('owner', user.id)
    .single()

  if (error && status !== 406) {
    throw error
    console.log(error)
  }

  if (data) {
    setWallet(data.wallet)
    setUrl(data.url)
    setStoreName(data.name)
    setDescription(data.description)
    setLoading(false)
  }

  }
  const handleStoreInfoSubmit = async() => {
    const updates = {
      owner: user.id,
      wallet,
      url,
      name: storeName,
      description
    }

    let { error } = await supabase.from('stores').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) {
      throw error
      console.log(error)
    }
  }
    return (
<main>
  <h1>Settings</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Store Settings</h3>

          <label>Wallet Adress</label>
          <input
          placeholder={wallet}
          onChange={e => setWallet(e.target.value)}
          style={{ margin: 10 }}
          className={styles.forminput}
        />
        <br />
          <label>Store Name</label>
          <input className={styles.forminput}
          placeholder={storeName}
          onChange={e => setStoreName(e.target.value)}
          style={{ margin: 10 }}
        />
          <br />
          <label>Store URL</label>
          <input className={styles.forminput}
          placeholder={url}
          onChange={e => setUrl(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <label>Store Description</label>
          <input className={styles.forminput}
          placeholder={description}
          onChange={e => setDescription(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <button onClick={() => handleStoreInfoSubmit()}>Update Info</button>
        </div>
      </div>
    </div>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Currencies</h3>
          <input className={styles.forminput}
          type='checkbox'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
          <input className={styles.forminput}
          type='checkbox'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </div>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Sign Up</h3>
          <input className={styles.forminput}
          placeholder='Wallet Adress'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
          <input className={styles.input}
          placeholder='Store Name'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </div>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Sign Up</h3>
          <input className={styles.input}
          placeholder='Wallet Adress'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
          <input className={styles.input}
          placeholder='Store Name'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </div>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Sign Up</h3>
          <input className={styles.input}
          placeholder='Wallet Adress'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
          <input className={styles.input}
          placeholder='Store Name'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
    </div>
    </div>
</main>
    )
}

export default SettingsComponent;