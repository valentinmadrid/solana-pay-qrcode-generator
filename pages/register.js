import { useState } from 'react'
import styles from '../styles/Home.module.css'

import { supabase } from '../client'

const signUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  async function signIn() {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    },
    {
        data: { 
          first_name: firstName,
          second_name: secondName,
        }
    }
    )
    if (error) {
      console.log({ error })
    } else {
      setSubmitted(true)
    }
  }
  if (submitted) {
    return (
      <div className={styles.container}>
        <h1>Please check your email to sign in</h1>
      </div>
    )
  }

  return (
<main>
  <h1>Sign Up</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Sign Up</h3>
          <input
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
                <input
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        <br />
        <input
          placeholder='First Name'
          onChange={e => setFirstName(e.target.value)}
          style={{ margin: 10 }}
        />
        <input
          placeholder='Last Name'
          onChange={e => setSecondName(e.target.value)}
          style={{ margin: 10 }}
        />
        <button onClick={() => signIn()}>Sign In</button>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    </div>
    </main>
  )
}

export default signUp;