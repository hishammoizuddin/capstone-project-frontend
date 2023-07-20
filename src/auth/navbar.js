import React from 'react';
import imslogo from '../images/logo-color.png';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';

export default function MainNavbar() {
  return (
    <>
      <MDBNavbar light bgColor='light'>
        <MDBContainer>
          <MDBNavbarBrand href='#'>
            <img
              src={imslogo}
              height='50'
              width='70'
              alt=''
              loading='lazy'
            /> &nbsp;
            Inventory Management System
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}