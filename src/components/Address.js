import React, { useState, useRef, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import '../css/address.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [emptyCode,setEmptyCode]=useState(false);
  const [mobile, setMobile] = useState({
    value: '',
    isTouched: 'false',
    error: 'Mobile number is not valid',
    isValid: 'false'
  });
  const [city, setCity] = useState({
    value: '',
    isTouched: 'false',
    error: 'city must be at least 2 characters',
    isValid: 'false'
  });
  const [address, setAddress] = useState({
    value: '',
    isTouched: 'false',
    error: 'address must be at least 10 characters',
    isValid: 'false'
  });
  
  const mobileRegex = /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/;

  const scroll = useRef();
  useEffect(() => {
    window.scrollTo({
      top: scroll?.current?.offsetTop - 100,
      behavior: 'smooth'
    })
  }, []);
  const registerAddress = () => {
    if(!code.length){
      setEmptyCode(true);
    }
    if (city.isValid && address.isValid && code !== '' && mobile.isValid && mobile.value.length
    && city.value.length &&address.value.length
    ) {
      localStorage.setItem(
        'address',
        JSON.stringify({
          address: address.value,
          city: city.value,
          postalCode: code,
          phone: mobile.value
        })
      );
      navigate('/checkout');
      setEmptyCode(false);
    }
  }
  return (
    <div className='address' ref={scroll}>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <form onSubmit={(e) => e.preventDefault()}>
              <p>Please enter your address</p>
              <label for="city">City</label>
              <input type="text" name="city" id="city"
                    onChange={(e) => setCity(last => { return { ...last, value: e.target.value } })}
                    value={city.value}
                    onBlur={
                        () => setCity((last) => {
                            return { ...last, isTouched: true, isValid: last.value?.trim().length >= 2 }
                        })
                    }
                    onFocus={()=>{
                        setCity((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
              />
              {!city.isValid && city.isTouched && <p style={{ color: '#EA1B25' }}>{city.error}</p>}
              <label for="address">Address</label>
              <input type="text" name="address" id="address"
                    onChange={(e) => setAddress(last => { return { ...last, value: e.target.value } })}
                    value={address.value}
                    onBlur={
                        () => setAddress((last) => {
                            return { ...last, isTouched: true, isValid: last.value?.trim().length >= 10 }
                        })
                    }
                    onFocus={()=>{
                        setAddress((last)=>{
                            return {...last,isTouched:false}
                        })
                    }}
              />
              {!address.isValid && address.isTouched && <p style={{ color: '#EA1B25' }}>{address.error}</p>}
              <label for="postalCode">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              {emptyCode && <p style={{ color: '#EA1B25' }}>please enter postal code</p>}
              <label for="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile"
                onChange={(e) => setMobile(last => { return { ...last, value: e.target.value } })}
                value={mobile.value}
                onBlur={
                  () => setMobile((last) => {
                    return { ...last, isTouched: true, isValid: mobileRegex.test(last.value) }
                  })
                }
              />
              {!mobile.isValid && mobile.isTouched && <p style={{ color: '#EA1B25' }}>{mobile.error}</p>}
              <button type="submit" onClick={registerAddress}>Next</button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Address;