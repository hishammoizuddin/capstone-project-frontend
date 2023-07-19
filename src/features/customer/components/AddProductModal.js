import React from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const AddProductModal = ({basicModal, setBasicModal, addedProduct, length, viewCart}) => {
    const toggleShow = () => setBasicModal(!basicModal);
    const closeAndViewCart = () => {
        toggleShow();
        viewCart();
    }
    return (
        <>
        <MDBModal show={basicModal} setShow={setBasicModal} animationDirection='right' position='top-right' side>
            <MDBModalDialog position='top-right' side animationDirection='right'>
            <MDBModalContent>
                <MDBModalHeader className='bg-primary text-white'>
                <MDBModalTitle> New Item Added!</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    You've just added {addedProduct}. Now you have {length} item(s) in your cart.
                </MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                </MDBBtn>
                <MDBBtn onClick={closeAndViewCart}>Go to the cart</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    );
} 

export default AddProductModal;
