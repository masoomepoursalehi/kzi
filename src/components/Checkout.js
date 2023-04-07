import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import '../css/checkout.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCart } from '../redux/action';

const Checkout = () => {
    const { shoppingCart } = useSelector((state) => state.cart);
    const totalPrice = shoppingCart.reduce(
        (help, item) => help + item.price * item.qty, 0
    );
    const userAddress = JSON.parse(localStorage.getItem('address'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const scroll = useRef();
    useEffect(() => {
        window.scrollTo({
            top: scroll?.current?.offsetTop - 100,
            behavior: 'smooth'
        })
    }, []);

    const doneShop = async () => {
        try {
            const { data } = await axios.post(
                "http://kzico.runflare.run/order/submit", {
                orderItems: shoppingCart.map((item) => {
                    return {
                        product: item._id,
                        qty: item.qty
                    }
                }),
                shippingAddress: {
                    address: userAddress.address,
                    city: userAddress.city,
                    postalCode: userAddress.postalCode,
                    phone: userAddress.phone
                },
                paymentMethod: "cash",
                shippingPrice: "5",
                totalPrice: totalPrice,
            },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                }
            );
            dispatch(deleteCart());
            toast('Your purchase has been successfully registered', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "success"
            });
            window.scrollTo({
                top: scroll?.current?.offsetTop - 100,
                behavior: 'smooth'
            });
        } catch (error) {
            toast(`${error.response.data.message[0]}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                type: "error"
            })
        }
    }
    return (
        <div className='checkout' ref={scroll}>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                            <>

                                <Row>
                                    <Col>
                                        <h1>Please check all items</h1>
                                    </Col>
                                </Row>
                                <div className='detailsOfShop'>
                                    <p className='hd1'>Your Order</p>
                                    <div className='redDiv'></div>
                                    <div className='headerOfTb'>
                                        <p>Product</p>
                                        <p>Price</p>
                                    </div>
                                    {shoppingCart.map((item) => {
                                        return (
                                            <div key={item._id} className='bodyOfTb'>
                                                <p>{item.name} <span>x {item.qty}</span></p>
                                                <p>${(item.price) * (item.qty)}</p>
                                            </div>
                                        )
                                    })}
                                    <div className='footerOfTb Tprice'>
                                        <p>Total price</p>
                                        <p>${totalPrice}</p>
                                    </div>
                                    <p className='hd1'>Your Address</p>
                                    <div className='redDiv2'></div>
                                    <div className='bodyOfTb'>
                                        <p>Address</p>
                                        <p>{userAddress.address}</p>
                                    </div>
                                    <div className='bodyOfTb'>
                                        <p>City</p>
                                        <p>{userAddress.city}</p>
                                    </div>
                                    <div className='bodyOfTb'>
                                        <p>Postal code</p>
                                        <p>{userAddress.postalCode}</p>
                                    </div>
                                    <div className='footerOfTb'>
                                        <p>Phone</p>
                                        <p>{userAddress.phone}</p>
                                    </div>

                                    <div className='btnHolder'>
                                        <button onClick={() => navigate('/cart')}>Edit</button>
                                    {shoppingCart.length?<button onClick={doneShop}>Done</button>:''}    
                                    </div>
                                </div>
                            </>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Checkout;



