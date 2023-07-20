import React, { useState } from 'react';
import { Rating } from 'primereact/rating';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const ReviewModal = ({ basicModal, setBasicModal, reviews, setReviews, product }) => {
    const toggleShow = () => {
        setBasicModal(!basicModal);
    }
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const addReview = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8181/review/add",
                {
                    rating: rating,
                    feedback: review,
                    product: product,
                }
            );
            let new_reviews = reviews.concat(response.data);
            setReviews(new_reviews);
            toggleShow();
        } catch (err) {
            console.log(err.msg);
        }

    }

    return (
        <>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader className='bg-primary text-white'>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="col-sm-12 col-lg-12 col-md-12 mb-4 d-flex justify-content-center">
                                <Rating value={rating} onChange={(e) => setRating(e.value)} cancel={false} />
                            </div>
                            <div className='text-center'> Write something about this product </div>
                            <div class="form-outline">
                                <input type="text" id="form12" class="form-control" value={review} onChange={(e) => setReview(e.target.value)} />
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Cancel
                            </MDBBtn>
                            <MDBBtn onClick={addReview}> Write Review</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default ReviewModal;