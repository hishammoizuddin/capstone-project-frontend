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

const ReturnModal = ({basicModal, setBasicModal, productCustomer, customerOrders, setCustomerOrders}) => {
    const toggleShow = () => setBasicModal(!basicModal);
    const returnDefectProduct = async() => {
        await axios.post("http://localhost:8181/product/customer/return-defect-order/" + productCustomer.id);
        const temp_arr = [...customerOrders];
        const new_pc = temp_arr.filter(pc => pc.id === productCustomer.id)[0];
        new_pc.returned = true;
        setCustomerOrders(temp_arr);
        toggleShow();
    }
    const returnProduct = async() => {
        await axios.post("http://localhost:8181/product/customer/return-order/" + productCustomer.id);
        const temp_arr = [...customerOrders];
        const new_pc = temp_arr.filter(pc => pc.id === productCustomer.id)[0];
        new_pc.returned = true;
        setCustomerOrders(temp_arr);
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
                {productCustomer != null ? (
                <MDBModalBody>
                    Are you sure you want to return {productCustomer.product.title}? Please select a reason to return.
                </MDBModalBody>) : ''
                }
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