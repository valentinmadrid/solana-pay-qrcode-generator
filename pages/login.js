import { useState } from 'react'
import styles from '../styles/Auth.module.css'

import { supabase } from '../client'

const SignIn = () => {
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
        <h1 className={styles.greeting}>
          Welcome back!
        </h1>
        <input
          placeholder='Enter Email'
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
        {!email && <h3>hello</h3>}
        <input
          placeholder='Enter Password'
          type='password'
          onChange={e => setPassword(e.target.value)}
          style={{ margin: 10 }}
        />
        {!password && <h3>Enter a valid password please</h3>}
        <button onClick={() => signIn()}>Sign In</button>
       </main>
    </div>
  )
}

export default SignIn;