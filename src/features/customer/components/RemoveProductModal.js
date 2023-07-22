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

const RemoveProductModal = ({basicModal, setBasicModal, removedProduct, closeAndRemoveFromCart}) => {
    const toggleShow = () => setBasicModal(!basicModal);
    return (
        <>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader className='bg-primary text-white'>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    Are you sure you want to remove {removedProduct} from your cart?
                </MDBModalBody>

                <MDBModalFooter> 
                <MDBBtn color='secondary' onClick={toggleShow}>
                    Cancel
                </MDBBtn>
                <MDBBtn onClick={closeAndRemoveFromCart}>Yes, remove it</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        </>
    );
} 

export default RemoveProductModal;
