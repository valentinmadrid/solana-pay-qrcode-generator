import { useRouter } from "next/router";
import { supabase } from '../../client'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair, Transaction, Message } from '@solana/web3.js';
import { encodeURL, findTransactionSignature, FindTransactionSignatureError, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';
import { useRef, useLayoutEffect } from "react";
import styles from '../../styles/Payment.module.css'
import Header from '../../components/PaymentHeaderComponent'




const Payment = () => {
    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState('va1yPZsd2qieP5pE6gtxvAHkHKEW3qmtoZy3oN1GcBX')
    const [url, setUrl] = useState('')
    const [storeName, setStoreName] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    const storeid = router.query.storeid
    const [currency, setCurrency] = useState('SOL')
    const [transactionDescription, setTransactionDescription] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const ref = useRef(null)
    const [paymentAmount, setPaymentAmount] = useState(0)
    const [totalprofit, setTotalProfit] = useState(0)
    const [amount, setAmount] = useState(0)
    const [currencyAmount, setCurrencyAmount] = useState(0)

    const solanaToEurRate = 1/80
    const solanaToUsdRate = 1/70


    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

    useEffect(() => {
        fetchData()
        console.log(storeid)
      }, [storeid])

    const handleAmountChange = () => {
        setAmount(e.target.value)   
    }
  

      const user = supabase.auth.user()
    
      const fetchData = async() => {
        setLoading(true)
    
    
        let { data, error, status } = await supabase
        .from('stores')
        .select('wallet, name, description, id, totalprofit')
        .eq('url', storeid)
        .single()



      if (error && status !== 406) {
        router.push('notfound')
        return(
            <h1>This profile does not exist</h1>
        )
        throw error
        console.log(error)

      }
    
      if (data) {
        console.log(data)
        if (data.wallet === undefined) { router.push('notfound') }
        setWallet(data.wallet)
        console.log(wallet)
        setUrl(data.url)
        setStoreName(data.name)
        setDescription(data.description)
        setTotalProfit(data.totalprofit)
        setLoading(false)

        
      } else {
          return(
              <h1>This profile was not found</h1>
          )
      }
    
      
}

const [qrCode, setQrCode] = useState(null)

const generateQr = async() => {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    console.log(paymentAmount)
    console.log(description)
    setWallet()
    const recipient = new PublicKey(wallet);
    const transactionAmount = new BigNumber(paymentAmount);
    const reference = new Keypair().publicKey;
    const label = storeName;
    const message = description;
    const memo = 'Payment at' + storeName + '#2022' + Math.floor(Math.random(22,0));
    let splToken = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    if (currency === 'SOL') {
        splToken = new PublicKey('So11111111111111111111111111111111111111112');
    } else if (currency === 'USDC') {
        splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    } else if (currency === 'ETH') {
        splToken = new PublicKey('6krMGWgeqD4CySfMr94WcfcVbf2TrMzfshAk5DcZ7mbu');
    } else if (currency === 'BTC') {
        splToken = new PublicKey('0xeae57ce9cc1984f202e15e038b964bb8bdf7229a');
    }
    const url = encodeURL({ recipient, amount: transactionAmount, splToken, reference, label, message, memo });
    console.log(url)
    setAmount(transactionAmount)
    const qrCode = createQR(url);
    setModalIsOpen(true)
    qrCode?.append(ref.current)
    console.log("getting txn status")
    try {
      let txnLookupResults = await getTxnStatus(connection, reference)
      if (txnLookupResults) {
        setPmtStatus(txnLookupResults)
      }
    } catch (err) {
      console.log(err)
    }

}

const storePurchase = async(signature, feepayer) => {
  console.log(totalprofit + paymentAmount)
  let newprofit = totalprofit + paymentAmount
  console.log(newprofit)
  const { data, error } = await supabase
  .from('transactions')
  .insert([
  { amount: paymentAmount, userid: user.id, success: true, currency: currency, description: description, id: signature, sender: feepayer, receiver: wallet },
])
if (error) {
  console.log(error)
}
}

const storePurchase2 = async(signature, feepayer) => {
  console.log(totalprofit + paymentAmount)
  let newprofit = totalprofit + paymentAmount
  console.log(newprofit)
  const { data, error } = await supabase
  .from('stores')
  .insert([
  { id: user.id, totalprofit: newprofit },
])
if (error) {
  console.log(error)
}
}

useEffect(() => {
    qrCode?.append(ref.current)
}, [modalIsOpen])

async function getTxnStatus(connection, reference) {

    let signatureInfo;
    let count = 0

    return new Promise((resolve, reject) => {

      const interval = setInterval(async () => {
        console.log('Checking for transaction...', count);
        try {
          signatureInfo = await findTransactionSignature(connection, reference, undefined, 'confirmed');
          console.log('\n 🖌  Signature found: ', signatureInfo.signature );
          const signattureCheck = await connection.getTransaction(signatureInfo.signature)
          console.log(signattureCheck)         
          console.log(signattureCheck.meta.preTokenBalances[0].owner)
          console.log(signatureInfo.signature)

          let feepayer = signattureCheck.meta.preTokenBalances[0].owner
          let signature = signatureInfo.signature




          storePurchase(signature, feepayer)

          clearInterval(interval);
          resolve(signatureInfo);
          return signatureInfo
        } catch (error) {
          if (!(error instanceof FindTransactionSignatureError)) {
            console.error(error);
            clearInterval(interval);
            reject(error);
            count++
          }
        }
      }, 1500);
    });
  }


    return (
        <div>
        <Header 
        storename={storeName}
        />
        <main className={styles.main}>
            <div className={styles.form}>
                <input 
                    type="number"
                    placeholder='Amount'
                    className={styles.forminput}
                    name="amount"
                    value={paymentAmount}
                    onChange={((e) => setPaymentAmount(e.target.value))}
                />
                <input 
                    type="text"
                    placeholder="Description"
                    className={styles.forminput}
                    name="description"
                    onChange={((e) => setDescription(e.target.value))}
                />
                <button 
                    className={styles.formbutton}
                    onClick={generateQr}
                >
                    Generate QR Code
                </button>
                <select 
                    placeholder="Currency"
                    className={styles.forminput}
                    name="currency"
                    onChange={((e) => setCurrency(e.target.value))}
                >
                <option value="SOL">Solana</option>
                <option value="USDC">USDC</option>
                <option value="ETH">Ethereum</option>
                <option value="BTC">Bitcoin</option>
                </select>
                <input 
                    type=""
                    placeholder="Amount in $"
                    className={styles.forminput}
                    name="description"
                    onChange={((e) => setDescription(e.target.value))}
                />
            </div>
            <div className={styles.center}>
            <div className={styles.qrcode} ref={ref}>
            </div>
            </div>
        </main>
        </div>
    )
}

export default Payment;