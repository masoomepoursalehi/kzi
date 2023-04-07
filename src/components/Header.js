import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../css/header.css'
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/action';
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shoppingCart } = useSelector((state) => state.cart);
    const { data } = useSelector((state) => state.profile);
    const available = (data.success === true) ? true : false;
    return (
        <div className='header'>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} to='/cart'>
                                <SlBasket />
                                <div className='badge'>{shoppingCart?.length}</div>
                            </Nav.Link>
                            {available ? (
                                <NavDropdown title={data.user.email} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/orders'>Orders</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/setting/change-profile'>Setting</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            dispatch(getProfile());
                                            navigate('/');
                                        }}
                                    >Log Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (

                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header;