import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router'
import MainNavbar from "./navbar";


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);    // show/hide password


    const newUser = () => { // If it is new user, and hasn't signed up yet
        navigate("/customersignup");
    }

    const doLogin = () => {
        if (username === 'admin@incedoinc.com' && password === 'admin@123') {
            localStorage.setItem('username', username);
            navigate('/admin');
            return;
        }

        async function onLogin() {
            try {
                let token = window.btoa(username + ':' + password);
                const response = await axios.get('http://localhost:8181/user/login',
                    {
                        headers: {
                            'Authorization': 'Basic ' + token
                        }
                    });

                let user = response.data;
                // Save token and username in local storage
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('isLoggedIn', false);
                processRole(user.role);
            }
            catch (err) {
                setErrMsg('Invalid Credentials');
            }
        }
        onLogin();
    }

    const processRole = (role) => {
        switch (role) {
            case 'SUPPLIER':
                // go to supplier dashboard - using navigate from react router
                navigate('/supplier');
                break;
            case 'CUSTOMER':
                // go to supplier dashboard - using navigate from react router
                navigate('/customer');
                break;
            case 'EXECUTIVE':
                // go to supplier dashboard - using navigate from react router
                navigate('/executive');
                break;
            case "MANAGER":
                //go to manager dashboard : use navigate from react-router
                navigate("/manager");
                break;
            default:
                setErrMsg('Unauthorized! contact admin')
                break;
        }
    }


    return (
        <div>
            <MainNavbar />
            <br /><br />
            <div className="jumbotron text-center">
                <div className="container">
                    <h1 className="display-4" style={{fontFamily: 'bold', fontSize: '40px'}}>Welcome to IMS</h1>
                    <p className="lead" style={{fontFamily: 'bold', fontSize: '20px'}}>Please enter your credentials below to login, or sign up as a new user</p>
                    <hr className="my-4" />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-primary rounded shadow mb-10">
                        <div className="card-header bg-primary text-white rounded-top">Login</div>
                        <div className="card-body">
                            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input type="text"
                                        className="form-control border-primary"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            setErrMsg('')
                                        }}
                                    />
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input type="password"
                                        className="form-control border-primary"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setErrMsg('')
                                        }}
                                    />
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <div style={{ display: "flex" }}>
                                        <input type={showPassword ? "text" : "password"}
                                            className="form-control border-primary"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setErrMsg('')
                                            }}
                                        />
                                        &nbsp;
                                        <button type="button" style={{ borderRadius: '5px' }} onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary mt-3" onClick={doLogin}>Login</button>
                                &nbsp;&nbsp;
                                <button type="button" className="btn btn-primary mt-3" onClick={newUser}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Login;