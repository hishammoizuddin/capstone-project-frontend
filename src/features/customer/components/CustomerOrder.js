import { useEffect, useState } from "react";
import axios from "axios";
import ReturnModal from "./ReturnModal";
const CustomerOrder = ({refresh, setRefresh}) => {
    const [customerOrders, setCustomerOrders] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [currentPc, setCurrentPc] = useState();
    const selectImage = (cid) => {
        // Just placeholders for images, if time permits will change this to maybe using S3 bucket
        if (cid === 1) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrW1oog8OnHiaZNzgGv3Qpn6VUWyayICtMSbUFhbOjUeyGIj8PcNTfFtp1_VBK19RKjN4&usqp=CAU"
        } else if (cid === 2) {
            return "https://t4.ftcdn.net/jpg/01/67/28/69/360_F_167286969_jAEAfUY47qQ1SHqf1SyqSYypOsl0fWYF.jpg"
        } else {
            return "https://i5.walmartimages.com/asr/16062593-5d6a-4293-966e-a0757d011a5a.1a4af15cf03d358ec950a03e5c8ba5e8.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
        }
    }
    useEffect(() => {
        async function fetchData() {
            try {
                let token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8181/product/customer/purchase/get/", {
                    headers: {
                        'Authorization': 'Basic ' + token
                    }
                })
                console.log(response.data)
                setCustomerOrders(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const onClickHandler = (productCustomer)=>{
        setCurrentPc(productCustomer);
        setBasicModal(true);
    }
    return (
        <div className="row d-flex justify-content-center">
            <ReturnModal
                basicModal={basicModal}
                setBasicModal={setBasicModal}
                productCustomer={currentPc}
                customerOrders={customerOrders}
                setCustomerOrders={setCustomerOrders}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            <h2 className="col-sm-6 col-lg-8 col-md-8 mb-4">Your Orders</h2>
            {
                customerOrders.map((co, index) => {
                    return (
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-6 col-lg-8 col-md-8 mb-4">
                                <div className="card">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-sm-6 col-lg-6 col-md-6 d-flex justify-content-center">
                                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                <img alt='' src={selectImage(co.product.category.id)} className="img-fluid" style={{ height: "160px" }} />
                                                <a href="#!">
                                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15", }}></div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-6 col-md-6">
                                            <div className="card-body">
                                                <h5 className="card-title"> {co.product.title} </h5>
                                                <p className="card-text"> Price: {co.product.price}$ </p>
                                                <p className="card-text"> Quantity: {co.quantity} </p>
                                                <p className="card-text"> Order Date: {co.dateOfPurchase} </p>
                                                { !co.returned ? (
                                                <a href="#!" className="btn btn-primary" onClick={()=>onClickHandler(co)}> Return </a>
                                                ) : <a href="#" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Item returned</a>
                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CustomerOrder;