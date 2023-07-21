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


class SupplierSignUp extends Component {

    constructor() {
        super();
        this.state = {
            isClicked: false,
            suppliers: [],
            users: [],
            addresses: [],
            errorMsg: '',
            passwordError:'',

            supplier: {
                name: '',
            },

            user: {
                username: '',
                password: '',
            },

            address: {
                hno: '',
                street: '',
                city: '',
                zipcode: '',
            }
        }

    }

    componentDidMount() {
    }

    validatePassword = (password) => {
        const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        return passwordRegEx.test(String(password));
    }
    



    render() {

        return(
            <div>
                <MainNavbar/>
                {this.viewSupplierSignUp()}
            </div>
        );
    }

    viewSupplierSignUp() {

        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-primary rounded shadow">
                            <div className="card-header bg-primary text-white rounded-top">Add a Supplier - Sign Up</div>
                            <div className="card-body">
                                <p className="card-text">Complete the details below to register a Supplier in the database</p>
                                
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
                                        <input type="password"
                                            className="form-control border-primary"
                                            name="password"
                                            value={this.state.user.password}
                                            onChange={this.changeHandler}
                                        />
                                        <small className="text-danger">{this.state.passwordError}</small>
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="name"
                                            value={this.state.supplier.name}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">House Number:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="hno"
                                            value={this.state.address.hno}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Street:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="street"
                                            value={this.state.address.street}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">City:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="city"
                                            value={this.state.address.city}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Zip Code:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="zipcode"
                                            value={this.state.address.zipcode}
                                            onChange={this.changeHandler}
                                        />
                                    </div>

                                    <button type="button" className="btn btn-primary mt-3" onClick={
                                        this.addSupplier
                                        }>Add Supplier</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    

    addSupplier=async ()=>{
        if (this.state.passwordError) {
            console.log("Password does not meet the requirements.");
            return;
        }

        try {
          const response = await axios.post(
            "http://localhost:8181/executive/supplier/add",
            {
                name: this.state.supplier.name,
                user:{
                    username: this.state.user.username,
                    password: this.state.user.password,
                },
                address:{
                    hno: this.state.address.hno,
                    street: this.state.address.street,
                    city: this.state.address.city,
                    zipcode: this.state.address.zipcode,
                }
            }
          );
          let tempArray = this.state.suppliers;
          tempArray.push(response.data);
          localStorage.setItem('username', this.state.user.username)
          this.setState({
            suppliers : tempArray
          }, () => this.props.navigate('/supplier'))
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
            supplier: {
                ...this.state.supplier,
                [e.target.name]: e.target.value
            },
            user:{
                ...this.state.user,
                [e.target.name]: e.target.value
            },
            address:{
                ...this.state.address,
                [e.target.name]: e.target.value
            }
        })
    }

}

export default withRouter(SupplierSignUp);

