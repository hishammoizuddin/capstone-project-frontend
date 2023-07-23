import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imslogo from '../../../images/logo-color.png';
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
    MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Navbar = ({ filter, viewCart, viewOrder, searchTitle, cartSize }) => {

    const [showBasic, setShowBasic] = useState(false);
    const [title, setSearchTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const makeUpperCase = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:8181/category/all')
                .then(response => {
                    setCategories(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    //always gets executed
                })
        }
        fetchData();
    }, [])

    const changeHandler = (e) => {
        setSearchTitle(e.target.value)
    }
    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>
                    <img
                        src={imslogo}
                        height='50'
                        width='70'
                        alt=''
                        loading='lazy'
                    /> &nbsp;
                    <div className="flex flex-wrap gap-2" style={{ fontFamily: "bold" }}>
                        Inventory Management System - Customer Portal
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
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 pt-1'>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#' onClick={() => { filter(-1) }}>
                                All
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {
                            categories.map((category, index) => {
                                return (
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href='#' onClick={() => { filter(category.id) }}> {makeUpperCase(category.name)} </MDBNavbarLink>
                                    </MDBNavbarItem>
                                )
                            })
                        }
                        {/* <MDBNavbarItem className="me-5">
                            <MDBNavbarLink href='#' onClick={viewCart}>
                                <i class="fas fa-cart-shopping"></i>
                                <span> ({cartSize})</span>
                            </MDBNavbarLink>
                        </MDBNavbarItem> */}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='#' onClick={viewOrder}>
                                <span> Past Orders </span>
                            </MDBNavbarLink>
                        </MDBNavbarItem>

                    </MDBNavbarNav>


                    <div style={{width: "70px"}}>
                        {/* <!-- Icon --> */}
                        <a href='#' onClick={viewCart}>
                        <i class="fas fa-cart-shopping"></i>
                            <span> ({cartSize})</span>
                            </a>
                    </div>


                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='products,...' aria-label='Search' value={title}
                            onChange={changeHandler} />
                        <MDBBtn color='primary' onClick={() => searchTitle(title)}>Search</MDBBtn>
                    </form>
                    &nbsp; &nbsp; &nbsp;
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