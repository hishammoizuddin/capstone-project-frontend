import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
 function Login(){

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();

    const doLogin = () =>{
         if(username === 'admin@incedoinc.com' && password === 'admin'){
            navigate('/admin');
            return; 
         } 
         async function onLogin(){
            try{ 
            let token = window.btoa(username + ':' + password);
            const response = await axios.get('http://localhost:8181/user/login', 
            {
                headers:{
                    'Authorization' : 'Basic ' + token
                }
            });

            let user = response.data;
            /* save token and username in local storage */
            localStorage.setItem('token', token);
            localStorage.setItem('username',username);
            localStorage.setItem('isLoggedIn','true');
            processRole(user.role);
            }
            catch(err){
                setErrMsg('Invalid Credentials');
            }
         }
         onLogin();
    }

    const processRole = (role)=>{
        switch (role) {
          case "SUPPLIER":
            //go to supplier dashboard : use navigate from react-router
            navigate("/supplier");
            break;
          case "EXECUTIVE":
            //go to executive dashboard : use navigate from react-router
            navigate("/executive");
            break;
          case "MANAGER":
                //go to manager dashboard : use navigate from react-router
                navigate("/manager");
                break;
          default:
            setErrMsg("UnAuthorized. Contact Admin");
            break;
        }
    }
    return(
        <div>
            <h1>Login</h1>
            {errMsg?errMsg:''}
            {localStorage.getItem('isLoggedIn') === 'false'?'You are logged Out!!':''} 
            <br />
            <label>Username: </label>
            <input type="text" 
                   value={username}
                   onChange={(e)=>{
                    setUsername(e.target.value);
                    setErrMsg('')
                   }}
            /> 
            <br /><br />
            <label>Password: </label>
            <input type="password" 
                   value={password}
                   onChange={(e)=>{
                    setPassword(e.target.value);
                    setErrMsg('')
                   }}
            /> <br /><br />
            <button onClick={doLogin}>Login</button>

        </div>
    )
}

export default Login;