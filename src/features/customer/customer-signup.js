import axios from "axios";
import { Component } from "react";

class Signup extends Component {

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
            <div style={{ margin: '20px' }}>
                <h1>Customer Sign Up</h1>
                <hr />
                <h3>Enter your details below to sign up</h3>
                <br/>

                <label>Username :</label>
                <input type="text"
                    name="username"
                    value={this.state.user.username}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Password :</label>
                <input type="text"
                    name="password"
                    value={this.state.user.password}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Name :</label>
                <input type="text"
                    name="name"
                    value={this.state.customer.name}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Contact :</label>
                <input type="text"
                    name="contact"
                    value={this.state.customer.contact}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Age :</label>
                <input type="text"
                    name="age"
                    value={this.state.customer.age}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>House Number :</label>
                <input type="text"
                    name="hno"
                    value={this.state.address.hno}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Street :</label>
                <input type="text"
                    name="street"
                    value={this.state.address.street}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>City :</label>
                <input type="text"
                    name="city"
                    value={this.state.address.city}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <label>Zip Code :</label>
                <input type="text"
                    name="zipcode"
                    value={this.state.address.zipcode}
                    onChange={this.changeHandler}
                />
                <br /><br />

                <button type="button" className="btn btn-outline-primary" onClick={this.addCustomer}>Sign Up</button>

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

export default Signup;

