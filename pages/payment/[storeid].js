import { useRouter } from "next/router";

const Payment = () => {
    const router = useRouter()
    const storeid = router.query.storeid
    return (
        <h1>Payment {storeid}</h1>
    )
}

export default Payment;