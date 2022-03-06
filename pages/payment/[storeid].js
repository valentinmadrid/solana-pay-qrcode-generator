import { useRouter } from "next/router";
import { supabase } from '../../client'
import { useEffect, useState } from "react";
import Modal from "react-modal"
import { Cluster, clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';
import { useRef, useLayoutEffect } from "react";

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
    const [amount, setAmount] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const ref = useRef(null)


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
    const recipient = new PublicKey(wallet);
    const transactionAmount = new BigNumber(amount);
    const reference = new Keypair().publicKey;
    const label = storeName;
    const message = 'Your order at this store';
    const memo = '11111';
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
    const url = encodeURL({ recipient, transactionAmount, splToken, reference, label, message, memo });
    const qrCode = createQR(url);
    setModalIsOpen(true)
    qrCode?.append(ref.current)

}

useEffect(() => {
    qrCode?.append(ref.current)
}, [modalIsOpen])





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
        <div ref={ref} />
        <button onClick={generateQr}>Create QR Code</button>
        <Modal isOpen={modalIsOpen}>
<h1>hello</h1>
<div ref={ref} />
        </Modal>
        </div>
    )
}

export default Payment;