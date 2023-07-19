import { useEffect, useState } from "react";
import Navbar from "./navbar";

function SupplierDashboard(){

    const [username, setUsername] = useState('');
    const [, setToken] = useState('');

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
        setToken(localStorage.getItem('token'));

    },[]);
 

    return(
        <div>
            <div className="mb-4">
                <Navbar/>
            </div>
            <h1>Supplier Dashboard</h1>
            <p>Welcome {username.split('@')[0]}</p>
        </div>

    );
}

export default SupplierDashboard;