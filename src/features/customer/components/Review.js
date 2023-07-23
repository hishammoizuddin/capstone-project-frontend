import { Rating } from 'primereact/rating';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewModal from './ReviewModal';
const Review = ({ product, refresh, setRefresh }) => {
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
    const [reviews, setReviews] = useState([]);
    const [basicModal, setBasicModal] = useState(false);
    const [refreshRating, setRefreshRating] = useState(false);
    const [currentRating, setCurrentRating] = useState(0);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8181/review/all/' + product.id);
                setReviews(response.data);
                const rating = (response.data.reduce((a,b) => a + b.rating, 0))/(response.data.length);
                setCurrentRating(rating.toFixed(2));
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [refreshRating])

    return (
        <div className="row d-flex justify-content-center">
            <ReviewModal 
                setBasicModal={setBasicModal} 
                basicModal={basicModal}
                reviews={reviews}
                setReviews={setReviews}
                product={product}
                setRefresh={setRefresh}
                refresh={refresh}
                setRefreshRating={setRefreshRating}
                refreshRating={refreshRating}
            />
            <div className="col-sm-6 col-lg-8 col-md-8 mb-4">
                <div className="card">
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-6 col-lg-6 col-md-6 d-flex justify-content-center">
                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img alt='' src={selectImage(product.category.id)} className="img-fluid" style={{ height: "160px" }} />
                                <a href="#!">
                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15", }}></div>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-6 col-md-6">
                            <div className="card-body">
                                <h5 className="card-title"> {product.title} </h5>
                                <p className="card-text"> {product.tagline} </p>
                                <p className="card-text"> {product.description} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-lg-12 col-md-12 mb-4 d-flex justify-content-center">
                < Rating readOnly value={currentRating} cancel={false}/>
            </div>
            <div className="mb-6 col-sm-12 col-lg-12 col-md-12 mb-4 d-flex justify-content-center">
                <a href="#!" className="btn btn-primary" onClick={()=>{setBasicModal(true)}}> Add a Review </a>
            </div>
            {reviews.map((review, index) => {
                return (
                    <div className="col-sm-6 col-lg-8 col-md-8 mb-4">
                    <div className="row">
                        <div className="col-sm-3 col-lg-3 col-md-3 d-flex justify-content-center">
                           < Rating readOnly value={review.rating} cancel={false}/>
                        </div>
                        <div className="col-sm-9 col-lg-9 col-md-9">
                            <div className="row text-center">
                            <span>{review.feedback}</span>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}
            
        </div>

    )
}

export default Review;