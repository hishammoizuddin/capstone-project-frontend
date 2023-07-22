import React from 'react';
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

const ReturnModal = ({basicModal, setBasicModal, productCustomer}) => {
    const toggleShow = () => setBasicModal(!basicModal);
    const returnDefectProduct = async() => {
        await axios.post("localhost:8181/product/customer/return-defect-order/" + productCustomer.id);
        toggleShow();
    }
    const returnProduct = async() => {
        await axios.post("localhost:8181/product/customer/return-order/" + productCustomer.id);
        toggleShow();
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
                    Are you sure you want to return {productCustomer.product.title}? Please select a reason to return.
                </MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Cancel
                </MDBBtn>
                <MDBBtn onClick={returnDefectProduct}> Product was defective </MDBBtn>
                <MDBBtn onClick={returnProduct}> I don't need it </MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    );
} 

export default ReturnModal;