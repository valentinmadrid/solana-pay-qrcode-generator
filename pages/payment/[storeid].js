import { useRouter } from "next/router";
import { supabase } from '../../client'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
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


    async function connect() {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    }

    useEffect(() => {
        fetchData()
        connect()
        console.log(storeid)
      }, [storeid])
    
      const user = supabase.auth.user()
    
      const fetchData = async() => {
        setLoading(true)
    
    
        let { data, error, status } = await supabase
        .from('stores')
        .select(`wallet, name`, `description`, `id`)
        .eq('url', storeid)
        .single()
    
      if (error && status !== 406) {
        throw error
        console.log(error)
      }
    
      if (data) {
        console.log(data.wallet)
        setWallet(data.wallet)
        setUrl(data.url)
        setStoreName(data.name)
        setDescription(data.description)
        setLoading(false)
      }
    
      
}

const [qrCode, setQrCode] = useState(null)

const generateQr = () => {
    console.log(paymentAmount)
    console.log(description)
    const recipient = new PublicKey(wallet);
    const transactionAmount = new BigNumber(paymentAmount);
    const reference = new Keypair().publicKey;
    const label = storeName;
    const message = description;
    const memo = 'Payment at' + storeName + '#2022' + '00001';
    let splToken = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    if (currency === 'SOL') {
        splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    } else if (currency === 'USDC') {
        splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    } else if (currency === 'ETH') {
        splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    } else if (currency === 'BTC') {
        splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
    }
    const url = encodeURL({ recipient, amount: transactionAmount, splToken, reference, label, message, memo });
    console.log(url)
    const qrCode = createQR(url);
    setModalIsOpen(true)
    qrCode?.append(ref.current)

}

useEffect(() => {
    qrCode?.append(ref.current)
}, [modalIsOpen])





    return (
        <div>
        <Header />
        <main className={styles.main}>
            <div className={styles.form}>
                <input 
                    type="number"
                    placeholder='Amount'
                    className={styles.forminput}
                    name="amount"
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
            </div>
            <div className={styles.qrcode} ref={ref}>

            </div>
        </main>
        </div>
    )
}

export default Payment;