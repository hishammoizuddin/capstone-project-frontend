import axios from 'axios';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [showBasic, setShowBasic] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8181/supplier/all')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        //always gets executed
      })
  }, [])
  const onSupplierSelect = (id) => {

    navigate('/executive?page=order&supplier_id=' + id)
  }
  const onProductSelect = () => {
    navigate('/executive?page=product')
  }
  const onSalesSelect = () => {
    navigate('/executive?page=sales')
  }
  const onHomeSelect = () => {
    navigate('/executive?page=home')
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand  >
          <img
            src={imslogo}
            height='50'
            width='70'
            alt=''
            loading='lazy'
          /> &nbsp;
          <div className="flex flex-wrap gap-2" style={{ fontFamily: "bold" }}>
            Inventory Management System - Executive Portal
          </div>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={() => onSalesSelect()}>Sales Transactions
              </MDBNavbarLink>


            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink onClick={() => onProductSelect()}>
                View Products
              </MDBNavbarLink>
            </MDBNavbarItem>


            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  View Orders
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {
                    suppliers.map((s) => {
                      return (
                        <MDBDropdownItem link key={s.id}>
                          <span onClick={() => onSupplierSelect(s.id)}> {s.name}</span>
                        </MDBDropdownItem>
                      )
                    })
                  }

                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>


          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
          </form>
          &nbsp;&nbsp;&nbsp;
          <Link to="/logout">
            <MDBBtn color='primary'>
              Logout
            </MDBBtn>
          </Link>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Navbar;