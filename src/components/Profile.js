import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/action';
import "../css/profile.css"

const Profile = () => {
    const { data } = useSelector((state) => state.profile)
    const available = data.success ? true : false;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProfile());
    },[])
    return (
        <div className='profileHolder'>
            <Container>
                <Row>
                    <Col md='6' className='profileImg'>
                        <img src={available ? `${data.user.image}` : null} alt='Image not available' />
                    </Col>
                    <Col md='6'>
                        <Container>
                        <Row className='userDetails'>
                            <Col sm='6'>
                            <p>Username <span>{available ? `${data.user.username}` : ' '}</span></p>
                            <p>First Name <span>{available ? `${data.user.firstname}` : ' '}</span></p>
                            <p>Mobile <span>{available ? `${data.user.mobile}` : ' '}</span></p>
                            <p>Age <span>{available ? `${data.user.age}` : ' '}</span></p>
                            </Col>
                            <Col sm='6'>
                            <p>Email <span>{available ? `${data.user.email}` : ' '}</span></p>
                            <p>Last Name <span>{available ? `${data.user.lastname}` : ' '}</span></p>
                            <p>Gender <span>{available ? `${data.user.gender}` : ' '}</span></p>
                            <p>City <span>{available ? `${data.user.city}` : ' '}</span></p>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Profile;