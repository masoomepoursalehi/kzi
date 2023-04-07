import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../css/cart.css';
import { VscClose } from "react-icons/vsc";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { minusProduct, plusProduct, removeProduct } from '../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';


const Cart = () => {
  const { shoppingCart } = useSelector((state) => state.cart);
  const totalPrice = shoppingCart.reduce(
    (help, item) => help + item.price * item.qty, 0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.profile);

  const registerShoppingCart = () => {
    if (data.success === true) {
      navigate('/address')
    }
    else {
      navigate('/login')
    }
  }
  const plusMore = (item) => {
    if (item.qty === item.countInStock) {
      toast('This product is no longer available.', {
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
    else {
      dispatch(plusProduct(item))
    }
  }
  return (
    <div className='cart'>
      <Container>
        <Row>
          <Col>
            <ToastContainer />
            <h1>Cart</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {shoppingCart.length ? (
              <>
                <Row>
                  <Col>
                    <div className='tableHeader'>
                      <p></p>
                      <p></p>
                      <p>Product</p>
                      <p>Color</p>
                      <p>Quantity</p>
                      <p>Price</p>
                    </div>
                  </Col>
                </Row>
                {shoppingCart.map((item) => {
                  return (
                    <Row key={item._id}>
                      <Col>
                        <div className='tableBody'>
                          <div className='rmBtn' onClick={() => dispatch(removeProduct(item))}>
                              <VscClose />
                          </div>
                          <div>
                            <img src={item.image} alt='Image not available' />
                          </div>
                          <p>{item.name}</p>
                          <p>{item.color}</p>
                          <div className='quantityHolder'>
                            <button className='minusBtn' onClick={() => dispatch(minusProduct(item))}>
                              <AiOutlineMinus />
                            </button>
                            <p>{item.qty}</p>
                            <button className='plusBtn' onClick={() => plusMore(item)}>
                              <AiOutlinePlus />
                            </button>
                          </div>
                          <p>${(item.price)*(item.qty)}</p>
                        </div>
                      </Col>
                    </Row>
                  )
                })}
                <Row>
                  <Col>
                    <div className='price'>
                      <p>
                        Total Price: <span>${totalPrice}</span>
                      </p>
                      <button
                        onClick={registerShoppingCart}
                      >Next</button>
                    </div>
                  </Col>
                </Row>
              </>
            )
              :
              <Row>
                <Col>
                  <div className='emptyCart'>
                    <p>your cart is currently empty</p>
                  </div>
                </Col>
              </Row>
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Cart;