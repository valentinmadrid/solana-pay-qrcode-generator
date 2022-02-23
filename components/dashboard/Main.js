import { useState } from "react"
import { supabase } from "../../client";
import Home from "../../pages";
import styles from '../../styles/Home.module.css'
import MoneyIcon from '@material-ui/icons/Money';


const Main = () => {
    const [transactions, setTransactions] = useState('')
    const amount = '12'
    const fetchTransactions = async() => {
    const { data, error } = await supabase
    .from('transactions')
    .select('sender, receiver, amount')
    .eq('amount', amount)
    console.log(data)
    setTransactions(Object.keys(data))
    }

    const totalProfit = '12, 880$'

    return (
<main>
  <h1>Dashoard</h1>
  <div className={styles.insights}>
    <div className={styles.sales}>
      <MoneyIcon sx={{ fontSize: 30 }} color="secondary" />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Sales</h3>
          <h1>$25,024</h1>
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>81%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF SALES ------------*/}
    <div className={styles.expenses}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Expenses</h3>
          <h1>$14,160</h1>
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>62%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF EXPENSES ------------*/}
    <div className={styles.income}>
      <MoneyIcon />
      <div className={styles.middle}>
        <div className={styles.left}>
          <h3>Total Income</h3>
          <h1>$10,864</h1>
        </div>
        <div className={styles.progress}>
          <svg>
            <circle cx={38} cy={38} r={36} />
          </svg>
          <div className={styles.number}>
            <p>44%</p>
          </div>
        </div>
      </div>
      <small className={styles.textmuted}>Last 24 Hours</small>
    </div>
    {/*---------- END OF INCOME ------------*/}
  </div>
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

export default Main;