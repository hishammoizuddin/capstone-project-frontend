import axios from "axios";
import { Component } from "react";
import { useNavigate } from "react-router";

import { useLocation } from 'react-router-dom';
import MainNavbar from "./navbar";

export function withRouter(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} navigate={navigate} location={location} />;
    };
}


class ManagerSignUp extends Component {

    constructor() {
        super();
        this.state = {
            isClicked: false,
            managers: [],
            users: [],
            errorMsg: '',
            passwordError: '',
            showPassword: false,

            manager: {
                name: '',
                jobTitle: '',
            },

            user: {
                username: '',
                password: '',
            },

        }

    }

    componentDidMount() {
    }

    validatePassword = (password) => {
        const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        return passwordRegEx.test(String(password));
    }



    render() {

        return (
            <div>
                <MainNavbar />
                {this.viewManagerSignUp()}
            </div>
        );
    }

    viewManagerSignUp() {

        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-primary rounded shadow">
                            <div className="card-header bg-primary text-white rounded-top">Add a Manager - Sign Up</div>
                            <div className="card-body">
                            {this.state.errorMsg && <div className="alert alert-danger">{this.state.errorMsg}</div>}
                                <p className="card-text">Complete the details below to register a Manager in the database</p>

                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Username:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="username"
                                            value={this.state.user.username}
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <div style={{ display: "flex" }}>
                                            <input
                                                type={this.state.showPassword ? "text" : "password"}
                                                className="form-control border-primary"
                                                name="password"
                                                value={this.state.user.password}
                                                onChange={this.changeHandler}
                                            />
                                            &nbsp;
                                            <button
                                                button type="button" style={{ borderRadius: '5px' }}
                                                onClick={() => this.setState({ showPassword: !this.state.showPassword })}>
                                                {this.state.showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                        <small className="text-danger">{this.state.passwordError}</small>
                                    </div>


                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="name"
                                            value={this.state.manager.name}
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Designation:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="jobTitle"
                                            value={this.state.manager.jobTitle}
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <button type="button" className="btn btn-primary mt-3" onClick={
                                        this.addManager
                                    }>Add Manager</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    addManager = async () => {

        if (this.state.passwordError) {
            this.setState({
                errorMsg: "Password does not meet the requirements"
            })
            console.log("Password does not meet the requirements.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8181/manager/sign-up",
                {
                    name: this.state.manager.name,
                    jobTitle: this.state.manager.jobTitle,
                    user: {
                        username: this.state.user.username,
                        password: this.state.user.password,
                    }
                }
            );
            let tempArray = this.state.managers;
            tempArray.push(response.data);
            localStorage.setItem('username', this.state.user.username)
            this.setState({
                managers: tempArray
            }, () => this.props.navigate('/manager'))
        } catch (err) {
            console.log(err.msg);
        }

    }


    changeHandler = (e) => {
        if (e.target.name === "password") {
            if (!this.validatePassword(e.target.value)) {
                this.setState({ passwordError: "Password must contain at least 1 uppercase, 1 number and 1 special character." });
            } else {
                this.setState({ passwordError: "" });
            }
        }

        this.setState({
            manager: {
                ...this.state.manager,
                [e.target.name]: e.target.value
            },
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

}

export default withRouter(ManagerSignUp);

