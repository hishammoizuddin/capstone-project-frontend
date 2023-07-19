import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout(){

    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', false);
        navigate("/");
    //  eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div>

        </div>

    )

}

export default Logout;