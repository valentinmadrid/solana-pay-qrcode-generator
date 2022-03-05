import { useRouter } from "next/router";
import { supabase } from '../../client'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import { Cluster, clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';
const Payment = () => {
    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState('')
    const [url, setUrl] = useState('')
    const [storeName, setStoreName] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    const storeid = router.query.storeid
    const [currency, setCurrency] = useState('SOL')
    const [transactionDescription, setTransactionDescription] = useState('')
    const [amount, setAmount] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    async function connect() {
        const [paymentStatus, setPaymentStatus] = useState('')
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
        .select(`wallet, name`, `description`)
        .eq('url', storeid)
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



    return (
        <div>
        <h1>Payment</h1>
        <h3>Welcome to {storeName}</h3>
        <h3>{description}</h3>
        <input type='number' placeholder='1' 
        onChange={(e) => {
            setAmount(e.target.value)
        }}
        />
        <select onChange={(e) => {
            const selectedCurrency = e.target.value;
            setCurrency(selectedCurrency);
        }}> 
            <option value='SOL'>Solana</option>
            <option value='USDC'>USDC</option>
            <option value='ETH'>Ethereum</option>
            <option value='BTC'>Bitcoin</option>
        </select>
        {currency}
        <input type='text' placeholder='Description' 
        onChange={(e) => {
            setTransactionDescription(e.target.value)
        }}
        />
        <button onClick={() => setModalIsOpen(true)}>Create QR Code</button>
        <Modal isOpen={modalIsOpen}>
<h1>hello</h1>
        </Modal>
        </div>
    )
}

export default Payment;