import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import {
    MDBContainer,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import axios from 'axios';
import CustomerCart from "./customer-cart";
import AddProductModal from "./components/AddProductModal";
import Review from "./components/Review";
import CustomerOrder from "./components/CustomerOrder";

function CustomerDashboard() {
    const [productList, setProductList] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [reviewedProduct, setReviewedProduct] = useState();
    const [isCart, setIsCart] = useState(false);
    const [isReview, setIsReview] = useState(false);
    const [isViewOrder, setIsViewOrder] = useState(false);
    const [basicModal, setBasicModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8181/product/all');
                const products = response.data;
                await Promise.all(
                    products.map(async(product) => {
                        const avgRating = await axios.get('http://localhost:8181/review/rating/' + product.id);
                        const count = await axios.get('http://localhost:8181/review/count/' + product.id);
                        product.rating = avgRating.data.toFixed(2);
                        product.count = count.data;
                        product.quantity = 1;
                    })
                )
                setProductList(products);
                setAllProducts(products);

            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [refresh])
    const filter = (id) => {
        setIsCart(false);
        setIsReview(false);
        setIsViewOrder(false);
        if (id === -1) {
            // get all products
            setProductList(allProducts);
        } else {
            const new_arr = allProducts.filter(product => product.category.id === id);
            setProductList(new_arr);
        }
    }
    const addProduct = (product) => {
        let newCart = [...cartList];
        const prodArr = newCart.filter(prod => prod.id === product.id);
        if (prodArr.length > 0) {
            const product = prodArr[0];
            product.quantity = product.quantity + 1;
            setCartList(newCart);
        } else {
            newCart.push(product);
            setCartList(newCart);
        }
        setBasicModal(true);
        setAddedProduct(product.title);
    }

    const removeProduct = (id) => {
        const newCart = cartList.filter(product => product.id !== id);
        setCartList(newCart);
    }

    const updateProductQuantity = (pid, quantity) => {
        let newCart = [...cartList];
        let product = newCart.filter(product => product.id === pid)[0];
        product.quantity = quantity;
        console.log(product);
        setCartList(newCart);
    }
    

    const searchTitle = async (title) => {
        setIsCart(false);
        setIsReview(false);
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
    const viewReview = (product) => {
        setReviewedProduct(product);
        setIsReview(true);
        setIsCart(false);
    }
    const viewOrder = ()=>{
        setIsReview(false);
        setIsCart(false);
        setIsViewOrder(true);
    }
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
                        viewOrder={viewOrder}
                        searchTitle={searchTitle}
                        cartSize={cartList.length}
                    />
                </div>
                {isCart ? (
                    <CustomerCart
                    cartList={cartList}
                    setCartList={setCartList}
                    removeProduct={removeProduct}
                    updateProductQuantity={updateProductQuantity}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
                ) : isReview ? (
                    <Review
                        product={reviewedProduct}
                        setRefresh={setRefresh}
                        refresh={refresh}
                    />
                ) : isViewOrder ? (
                    <CustomerOrder/>
                    ) : (
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-10 col-lg-10 col-md-10">
                            <h1 className="mb-4">Product Dashboard</h1>
                            <div className="row d-flex">
                                {
                                    productList.map((product, index) => {
                                        return (
                                            <ProductCard
                                                product={product}
                                                addProduct={addProduct}
                                                viewReview={viewReview}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )}
            </MDBContainer>
        </div>
    );
}

export default CustomerDashboard;