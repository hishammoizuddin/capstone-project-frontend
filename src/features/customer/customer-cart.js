import CheckoutCard from "./components/CheckoutCard";
import RemoveProductModal from "./components/RemoveProductModal";
import { useState } from "react";

const CustomerCart = ({ cartList, removeProduct }) => {
    const [basicModal, setBasicModal] = useState(false);
    const [removedProduct, setRemovedProduct] = useState('');
    const [removedProductId, setRemovedProductId] = useState();
    const closeAndRemoveFromCart = () => {
        setBasicModal(false);
        removeProduct(removedProductId);
    } 
    const promptRemove = (id) => {
        setRemovedProduct(cartList.filter(product => product.id === id)[0].title);
        setRemovedProductId(id);
        setBasicModal(true);
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
                {cartList.length > 0 ? (<a href="#!" className="btn btn-primary col-sm-6 col-lg-6 col-md-6"> Checkout</a>) : ''}
            </div>
        </div>
    )
}

export default CustomerCart;