import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

const TransactionsComponent = () => {
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
  <h1>Dashoard</h1>
  {/*---------- END OF INSIGHTS ------------*/}
  <div className={styles.recentorders}>
    <h2>Recent Orders</h2>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Number</th>
          <th>Payment</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
         <tr className="tr">
                      <td>Foldable Mini Drone</td>
                      <td>85631</td>
                      <td>Due</td>
                      <td class="warning">Pending</td>
                      <td class="primary">Details</td>
                  </tr>
                  <tr className="tr">
                      <td>Foldable Mini Drone</td>
                      <td>85631</td>
                      <td>Due</td>
                      <td class="warning">Pending</td>
                      <td class="primary">Details</td>
                  </tr>
                  <tr className="tr">
                      <td>Foldable Mini Drone</td>
                      <td>85631</td>
                      <td>Due</td>
                      <td class="warning">Pending</td>
                      <td class="primary">Details</td>
                  </tr>
      </tbody>
    </table>
    <a href="#">Show All</a>
  </div>
</main>
    )
}

export default TransactionsComponent;