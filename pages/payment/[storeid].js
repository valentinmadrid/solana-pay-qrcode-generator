import { useRouter } from "next/router";
import { supabase } from '../../client'
import { useEffect, useState } from "react";
const Payment = () => {
    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState('')
    const [url, setUrl] = useState('')
    const [storeName, setStoreName] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    const storeid = router.query.storeid
    useEffect(() => {
        fetchData()
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
        <h1>Payment {storeid}</h1>
        <h3>{storeName}</h3>
        <h3>{description}</h3>
        </div>
    )
}

export default Payment;