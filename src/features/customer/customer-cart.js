import CheckoutCard from "./components/CheckoutCard";
import RemoveProductModal from "./components/RemoveProductModal";
import { useState } from "react";
import axios from "axios";

const CustomerCart = ({ cartList, removeProduct }) => {
    const [basicModal, setBasicModal] = useState(false);
    const [removedProduct, setRemovedProduct] = useState('');
    const [removedProductId, setRemovedProductId] = useState();
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const findTotal = () => {
        let total = cartList.reduce(
            (p1, p2) => p1 + p2.price, 0
        )
        return ((total + 10) * (100-discount) / 100).toFixed(2);
    }

    const closeAndRemoveFromCart = () => {
        setBasicModal(false);
        removeProduct(removedProductId);
    }
    const promptRemove = (id) => {
        setRemovedProduct(cartList.filter(product => product.id === id)[0].title);
        setRemovedProductId(id);
        setBasicModal(true);
    }

    const applyDiscount = async()=> {
        const response = await axios.get('http://localhost:8181/coupon/all');
        const cp = response.data.filter(coupon => coupon.couponCode === discountCode)[0];
        setDiscount(cp.discount);
    }

    const changeHandler = (e) => {
        setDiscountCode(e.target.value)
    }

    return (
        <div>
            <RemoveProductModal
                basicModal={basicModal}
                setBasicModal={setBasicModal}
                closeAndRemoveFromCart={closeAndRemoveFromCart}
                removedProduct={removedProduct}

            />
            <div className="row d-flex justify-content-center">
                {
                    cartList.map((product, index) => {
                        return (
                            <CheckoutCard
                                product={product}
                                promptRemove={promptRemove}

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
                            <a href="#!" className="btn btn-primary"> Checkout </a>
                        </div>
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export default CustomerCart;