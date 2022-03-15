import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';
import Transactions from '../../pages/transactions';

const CustomerComponent = () => {
  const [loading, setLoading] = useState(true)
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const user = supabase.auth.user()

  const fetchData = async() => {
    setLoading(true)
    let { data, error, status } = await supabase
    .from('customers')
    .select(`user, totalpaid`, `userid`)
    .eq('userid', user.id)
    console.log(data)



  if (error && status !== 406) {
    throw error
    console.log(error)
  }

  if (data) {
    setCustomers(data)
    console.log(data)
    setLoading(false)
  }

  }

    return (
<main>
  <div className={styles.recentorders}>
    <h2>Your Customers</h2>
    <table>
      <thead>
        <tr>
          <th>Wallet Adress</th>
          <th>Total Amount Paid</th>

        </tr>
      </thead>
      <tbody>
          
        {
            customers.map((customers) => (
                <tr className="tr" key={customers.id}>
                             <td>{customers.wallet}</td>
                             <td>{customers.totalpaid}</td>
                         </tr>
                ))}
      </tbody>
    </table>
    <a href="#">Show All</a>
  </div>
</main>
    )
}

export default CustomerComponent;