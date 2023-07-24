import CheckoutCard from "./components/CheckoutCard";
import RemoveProductModal from "./components/RemoveProductModal";
import CheckoutModal from "./components/CheckoutModal";
import { useState } from "react";
import axios from "axios";

const CustomerCart = ({ cartList, setCartList, removeProduct, updateProductQuantity, setRefresh, refresh, cartMessage, setCartMessage}) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [checkoutModal, setCheckoutModal] = useState(false);
    const [removedProduct, setRemovedProduct] = useState('');
    const [removedProductId, setRemovedProductId] = useState();
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    
    const findTotal = () => {
        let total = cartList.reduce(
            (p1, p2) => p1 + p2.price * p2.quantity, 0
        )
        return ((total + 10) * (100-discount) / 100).toFixed(2);
    }

    const closeAndRemoveFromCart = () => {
        setRemoveModal(false);
        removeProduct(removedProductId);
    }
    const promptRemove = (id) => {
        setRemovedProduct(cartList.filter(product => product.id === id)[0].title);
        setRemovedProductId(id);
        setRemoveModal(true);
    }

    const applyDiscount = async()=> {
        const response = await axios.get('http://localhost:8181/coupon/all');
        const cp = response.data.filter(coupon => coupon.couponCode === discountCode)[0];
        setDiscount(cp.discount);
    }

    const changeHandler = (e) => {
        setDiscountCode(e.target.value)
    }

    const confirmOrder = async() => {
        let token = localStorage.getItem("token");
        const orders = cartList.map((product, index)=> {
            return {
                "id": product.id,
                "quantity": product.quantity
            }
        });
        const response = await axios.post('http://localhost:8181/product/confirm-order', orders, {headers:{
            'Authorization' : 'Basic ' + token
        }});
        setCartList([]);
        setCheckoutModal(false);
        setRefresh(!refresh);
        setCartMessage("Thank you for your order");
    }

    return (
        <div className="row d-flex justify-content-center">
            <h2 className="col-sm-8 col-lg-8 col-md-8 mb-4"> {cartMessage} </h2>
            <RemoveProductModal
                basicModal={removeModal}
                setBasicModal={setRemoveModal}
                closeAndRemoveFromCart={closeAndRemoveFromCart}
                removedProduct={removedProduct}

            />
            <CheckoutModal
                basicModal={checkoutModal}
                setBasicModal={setCheckoutModal}
                confirmOrder={confirmOrder}

            />
            <div className="row d-flex justify-content-center">
                {
                    cartList.map((product, index) => {
                        return (
                            <CheckoutCard
                                product={product}
                                promptRemove={promptRemove}
                                updateProductQuantity={updateProductQuantity}

                            />
                        )
                    })
                }
                {cartList.length > 0 ? (
                    <div className="col-sm-8 col-lg-8 col-md-8">
                        {/* <div> Tax: 10$</div> */}
                        <div> Delivery Fees: 10$ </div>
                        <div> Subtotal: {findTotal()}$ </div>
                        <div className="mb-4">
                        <label>Coupon Code: &nbsp;&nbsp;</label>
                            <input onChange={changeHandler} value={discountCode} style={{width: "100px"}} type="text" 
                                name="couponCode"
                                // value={this.state.coupon.couponCode}
                                // onChange={this.changeHandler}
                            />
                        <span> &nbsp;&nbsp; </span>
                        <a href="#!" className="btn btn-tertiary" onClick={applyDiscount}> Apply </a> 
                        </div>
                        <div>
                            <a href="#!" className="btn btn-primary" onClick={()=>setCheckoutModal(true)}> Checkout </a>
                        </div>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export default CustomerCart;