import Rightbar from "../components/dashboard/Rightbar";
import Sidebar from "../components/dashboard/Sidebar";
import CustomerComponent from "../components/dashboard/CustomerComponent";

const Customers = () => {
    return (
        <div className="container">
        <Sidebar />
        <CustomerComponent />
        <Rightbar />
        </div>
    )
}

export default Customers;