import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import '../css/orders.css';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router';
const Orders = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');
    useEffect(() => {
        getAllOrders();
    }, [token])
    const getAllOrders = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("http://kzico.runflare.run/order/", {
                headers: {
                    authorization: `Bearer ${token} `,
                },
            });
            setAllOrders(data);
            // setError("");
            setLoading(false);
        } catch (error) {
            // setError(error.message);
            setLoading(false);
        }
    }
    return (
        <div className='allOrders'>
            {loading ? (
                <div className='spinnerLoding'>
                    <Spinner animation="border" variant="danger" />
                </div>
            ) : 
            // error ? (
            //     <div className='badgeError'>
            //         <Badge bg="danger">{error}</Badge>
            //     </div>
            // ):
             (
                <Container>
                    <Row>
                        <Col>
                            <h1>Order history</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {allOrders.length ? (
                                <>
                                    {allOrders.map((item) => {
                                        return (
                                            <Row key={item._id}>
                                                <Col className='parrentOfDetails'>
                                                    <div className='ordersHolder'>
                                                        <div className='moreDetails'>
                                                            <IoIosArrowForward onClick={() => navigate(`/orders/${item._id}`)}/>
                                                        </div>
                                                        <div className='adressOrders'>
                                                            <p>2022 February 25</p>
                                                            <p>Sent to: <span>{item.shippingAddress.city}</span></p>
                                                            <p>Total price: $<span>{item.totalPrice}</span></p>
                                                        </div>
                                                        <div className='imgHolder'>
                                                            {(item.orderItems).map((item) => {
                                                                return (
                                                                    <img key={item._id} src={item.product.image} alt='Image not available' />
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </>
                            ) : (
                                <Row>
                                    <Col>
                                        <div className='ordersShow'>
                                            <p>You have not placed an order yet</p>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}
export default Orders;



