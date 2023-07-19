import axios from "axios";
import { Component } from "react";
import { Navigate, useNavigate } from "react-router";

class CustomerSignUp extends Component {

    constructor() {
        super();
        this.state = {
            customers: [],
            users: [],
            addresses: [],
            errorMsg: '',

            customer: {
                name: '',
                contact: '',
                age: '',
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



    render() {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card border-primary rounded shadow">
                            <div className="card-header bg-primary text-white rounded-top">Customer Sign Up</div>
                            <div className="card-body">
                                <p className="card-text">Enter your details below to sign up</p>
                                
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
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="name"
                                            value={this.state.customer.name}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Contact:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="contact"
                                            value={this.state.customer.contact}
                                            onChange={this.changeHandler}
                                        />
                                    </div>
    
                                    <div className="mb-3">
                                        <label className="form-label">Age:</label>
                                        <input type="text"
                                            className="form-control border-primary"
                                            name="age"
                                            value={this.state.customer.age}
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
                                        this.addCustomer
                                        }>Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    

    addCustomer=async ()=>{
        try {
          const response = await axios.post(
            "http://localhost:8181/customer/add",
            {
                name: this.state.customer.name,
                contact: this.state.customer.contact,
                age: this.state.customer.age,
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
          let tempArray = this.state.customers;
          tempArray.push(response.data);
          this.setState({
            customers : tempArray
          })
        } catch (err) {
          console.log(err.msg);
        }

    }
 
    changeHandler = (e) => {
        this.setState({
            customer: {
                ...this.state.customer,
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

export default CustomerSignUp;

