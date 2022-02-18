import { useState } from 'react'
import styles from '../styles/Home.module.css'

import { supabase } from '../client'

const signIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email,
      password,
    })
    if (error) {
      console.log({ error })
    } else {
      setSubmitted(true)
    }
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Sign In
        </h1>
        <input
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
        <input
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <button onClick={() => signIn()}>Sign In</button>
       </main>
    </div>
  )
}

export default signIn;