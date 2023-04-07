import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import '../css/oneOrder.css';

const OneOrder = () => {
    const { id } = useParams();
    const [oneOrder, setOneOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const scroll = useRef();

    useEffect(() => {
        window.scrollTo({
            top: scroll?.current?.offsetTop - 100,
            behavior: 'smooth'
        })
        getOneOrder(id);
    }, [id])

    const getOneOrder = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`http://kzico.runflare.run/order/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")} `,
                },
            });
            setOneOrder(data);
            setError("");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }
    return (
        <div className='oneOrder' ref={scroll}>
            {loading ? (
                <div className='spinnerLoding'>
                    <Spinner animation="border" variant="danger" />
                </div>
            ) : error ? (
                <div className='badgeError'>
                    <Badge bg="danger">{error}</Badge>
                </div>
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <h1>Details of the desired purchase</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='colOfProducts'>
                            <div className='productsHolder'>
                                <div className='shippingInformation'>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <p>Payment Method: <span>{oneOrder?.paymentMethod}</span></p>
                                                <p>Shipping Price: <span>${oneOrder?.shippingPrice}</span></p>
                                            </Col>
                                            <Col>
                                                <p>Total Price: <span>${oneOrder?.totalPrice}</span></p>
                                                <p>Address: <span>{oneOrder.shippingAddress?.address}</span></p>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                {oneOrder.orderItems?.map((item) => {
                                    return (
                                        <div className='productsInformation'>
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <img src={item.product.image} alt='Image not available' />
                                                        <p>{item.qty}</p>
                                                    </Col>
                                                    <Col>
                                                        <p>{item.product.name}</p>
                                                        <p>Brand: <span>{item.product.brand}</span></p>
                                                        <p>Category: <span>{item.product.category}</span></p>
                                                        <p>Color: <span>{item.product.color}</span></p>
                                                        <p>$<span>{(item.product.price)*(item.qty)}</span></p>
                                                    </Col>
                                                </Row>
                                            </Container>

                                        </div>
                                    )
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}
export default OneOrder;



