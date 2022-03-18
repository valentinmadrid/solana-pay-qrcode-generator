import { useState } from 'react'
import styles from '../styles/Auth.module.css'

import { supabase } from '../client'

const SignUp = () => {
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

export default SignUp;