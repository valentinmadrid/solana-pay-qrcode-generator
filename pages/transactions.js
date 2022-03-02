import Rightbar from "../components/dashboard/Rightbar";
import Sidebar from "../components/dashboard/Sidebar";
import TransactionComponent from "../components/dashboard/TransactionsComponent";

const Transactions = () => {
    return (
        <div className="container">
        <Sidebar />
        <TransactionComponent />
        <Rightbar />
        </div>
    )
}

export default Transactions;