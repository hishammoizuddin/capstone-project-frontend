import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import {
    MDBContainer,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import axios from 'axios';
import CustomerCart from "./customer-cart";
import AddProductModal from "./components/AddProductModal";

function CustomerDashboard() {
    const [productList, setProductList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [isCart, setIsCart] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState('');

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:8181/product/all')
                .then(response => {
                    setProductList(response.data);
                    setAllProducts(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    //always gets executed
                })
        }
        fetchData();
    }, [])
    const filter = (id) => {
        setIsCart(false);
        if (id === -1) {
            // get all products
            setProductList(allProducts);
        } else {
            const new_arr = allProducts.filter(product => product.category.id === id);
            setProductList(new_arr);
        }
    }
    const addProduct = (product) => {
        const newCart = cartList.concat(product);
        setCartList(newCart);
        setBasicModal(true);
        setTimeout(() => {  setBasicModal(false) }, 2000);
        setAddedProduct(product.title);
    }

    const removeProduct = (id) => {
        const newCart = cartList.filter(product => product.id !== id);
        setCartList(newCart);
    }

    const searchTitle = async (title) => {
        setIsCart(false);
        await axios.get('http://localhost:8181/product/search/' + title)
            .then(response => {
                setProductList(response.data)
            })
            .catch(err => {
                this.setState({
                    errorMsg: err.msg
                })
            })
            .finally(() => {
                //always gets executed
            })
    }

    const viewCart = () => setIsCart(true);
    return (
        <div>
            <AddProductModal
                basicModal={basicModal}
                setBasicModal={setBasicModal}
                addedProduct={addedProduct}
                length={cartList.length}
                viewCart={viewCart}
            />
            <MDBContainer fluid>
                <div className='mb-4'>
                    <Navbar
                        filter={filter}
                        viewCart={viewCart}
                        searchTitle={searchTitle}
                        cartSize={cartList.length}
                    />
                </div>
                <h1>Customer Dashboard</h1>
                {!isCart ? (
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-10 col-lg-10 col-md-10">
                            <div className="row d-flex">
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <ProductCard
                                                product={product}
                                                addProduct={addProduct}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <CustomerCart
                        cartList={cartList}
                        removeProduct={removeProduct}
                    />
                )}
            </MDBContainer>
        </div>
    );
}

export default CustomerDashboard;