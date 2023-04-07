import React from 'react';
import '../../css/setting.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router';

const Setting = () => {
    const navigate = useNavigate();
    return (
        <div className='setting'>
            <Container>
                <Row>
                    <Col md='3'>
                        <ul className='sideBar'>
                            <li onClick={() => navigate('change-profile')}>Change profile</li>
                            <li onClick={() => navigate('change-password')}>Change password</li>
                            <li onClick={() => navigate('upload-avatar')}>Upload avatar</li>
                        </ul>
                    </Col>
                    <Col md='9'>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Setting;



