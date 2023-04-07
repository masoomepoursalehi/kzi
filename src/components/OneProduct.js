import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { AiFillEye } from "react-icons/ai";
import '../css/oneProduct.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const OneProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const scroll = useRef();

    const [oneProduct, setOneProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo({
            top: scroll?.current?.offsetTop - 100,
            behavior: 'smooth'
        })
        getOneProduct(id);
    }, [id]);

    const getOneProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);
            setOneProduct(data);
            setError("");
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    const addProduct = () => {
        if (oneProduct.countInStock > 1) {
            dispatch(addToCart(id));
        }
        else {
            toast('The desired product is not available.', {
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

        <div className='oneProduct' ref={scroll}>
            <ToastContainer />
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
                        <Col md='6' className='imgHolder'>
                            <img src={oneProduct.image} alt='Image not available' />
                            <button onClick={addProduct}>
                                <MdOutlineAddShoppingCart />
                                Add To Cart
                            </button>
                        </Col>
                        <Col md='6' >
                            <div className='detailsAProduct'>
                                <h3>{oneProduct.name}</h3>
                                <p>Brand: <span>{oneProduct.brand}</span></p>
                                <p>Category: <span>{oneProduct.category}</span></p>
                                <p>Color: <span>{oneProduct.color}</span></p>
                                <p>Stock: <span>{oneProduct.countInStock}</span></p>
                                <p>Rating: <span>{oneProduct.rating}</span></p>
                                <p>Description: {oneProduct.description}</p>
                                <p><AiFillEye /> {oneProduct.numReviews}</p>
                                <p>$<span>{oneProduct.price}</span></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}
export default OneProduct;