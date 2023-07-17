import axios from "axios";

const { Component } = require("react");

class Coupon extends Component{
    constructor(){
        super();

        this.state={
            coupons: [],
            errorMsg: '',
            
            coupon:{
                couponCode :'',
                totalAmount:0,
                discount:0
            }
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8181/coupon/all')
        .then(response =>{
            this.setState({
                coupons: response.data
            })
        })
        .catch(err=>{
            this.setState({
                errorMsg: err.msg
            })
        }) 
        .finally(()=>{
            //always gets executed
        })
    }

    render(){
        return (
          <div>
            {
                this.state.coupons.map((c,index)=>{
                    return (
                      <div key={index} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">{c.couponCode}</h5>

                          <p className="card-text">
                            Discount: {c.discount} % <br />
                            Min. Total Amount: {c.totalAmount}
                          </p>
                        </div>
                      </div>
                    );
                })
            }
            
            <hr />
            <h3>Enter New Coupon Details</h3>
            <label>Coupon Code: </label>
            <input type="text" 
                   name="couponCode"
                   value={this.state.coupon.couponCode}
                   onChange={this.changeHandler}
            /> 
            <br /><br />
            <label>Enter Discount: </label>
            <input type="text" 
                   name="discount"
                   value={this.state.coupon.discount}
                   onChange={this.changeHandler}
            /> 
            <br /><br />
            <label>Enter Min Amount : </label>
            <input type="text" 
                   name="totalAmount"
                   value={this.state.coupon.totalAmount}
                   onChange={this.changeHandler}
            /> 
            <br /><br />
            <button onClick={this.addCoupon}>Add Coupon</button>
          </div>
        );
    }

    changeHandler=(e)=>{
        this.setState({
            coupon:{
                ...this.state.coupon,
                [e.target.name] : e.target.value
            }
        })
    }

    addCoupon=async ()=>{
        try {
          const response = await axios.post(
            "http://localhost:8181/coupon/add",
            {
              totalAmount: this.state.coupon.totalAmount,
              couponCode: this.state.coupon.couponCode,
              discount: this.state.coupon.discount,
            }
          );
          let tempArray = this.state.coupons;
          tempArray.push(response.data);
          this.setState({
            coupons : tempArray
          })
        } catch (err) {
          console.log(err.msg);
        }

    }
}

export default Coupon;