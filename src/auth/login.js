import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const newUser = () => { // If it is new user, and hasn't signed up yet
        navigate("/customersignup");
    }

    const doLogin = () => {
        if(username === 'admin@incedoinc.com' && password === 'admin') {
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
            default:
                setErrMsg('Unauthorized! contact admin')
                break;
        }
    }


    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-primary rounded shadow">
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
                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input type="password"
                                        className="form-control border-primary"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setErrMsg('')
                                        }}
                                    />
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