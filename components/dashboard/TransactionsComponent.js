import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';
import Transactions from '../../pages/transactions';

const TransactionsComponent = () => {
  const [loading, setLoading] = useState(true)
  const [wallet, setWallet] = useState(null)
  const [storeName, setStoreName] = useState(null)
  const [url, setUrl] = useState(null)
  const [description, setDescription] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const user = supabase.auth.user()

  const fetchData = async() => {
    setLoading(true)
    let { data, error, status } = await supabase
    .from('transactions')
    .select(`sender, receiver, amount, success, userid, currency, createdat`)
    .eq('userid', user.id)
    setTransactions(data)
    console.log(data)



  if (error && status !== 406) {
    throw error
    console.log(error)
  }

  if (data) {
    setTransactions(data)
    console.log(data)
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
  <h1>Dashoard</h1>
  {/*---------- END OF INSIGHTS ------------*/}
  <div className={styles.recentorders}>
    <h2>Recent Orders</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Customer</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
          
        {
            transactions.map((transactions) => (
                <tr className="tr" key={transactions.id}>
                             <td>{transactions.createdat}</td>
                             <td>{transactions.sender}</td>
                             <td>{transactions.amount} {transactions.currency}</td>
                             <td>{transactions.sender.substring(0,8)}...</td>
                             <td class="success">Success</td>
                         </tr>
                ))}
      </tbody>
    </table>
    <a href="#">Show All</a>
  </div>
</main>
    )
}

export default TransactionsComponent;