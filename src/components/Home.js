import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import '../css/home.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllProducs()
  }, [])

  const getAllProducs = async () => {
    try {
      setLoadin(true);
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setProducts(data)
      setError("")
      setLoadin(false)
    } catch (error) {
      setError(error.message)
      setLoadin(false)
    }
  }
  return (

    <div className='allProduct'>
      {
        loading ? (
          <div className='spinnerLoding'>
            <Spinner animation="border" variant="danger" />
          </div>
        )
          : error ? (
            <div className='badgeError'>
              <Badge bg="danger">{error}</Badge>
            </div>
          )
            :
            <Container>
              <Row>
                <Col>
                  <h1>
                    Products List
                  </h1>
                </Col>
              </Row>
              <Row>
                {
                  products?.map((item) =>
                    <Col key={item._id}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>{item.brand}</Card.Title>
                          <Card.Text>{item.name}</Card.Text>
                          <div className='btnHolder'>
                            <Button onClick={() => navigate(`/product/${item._id}`)}>More Details</Button>
                          </div>
                        </Card.Body>
                        <div className='imgHolder'>
                          <Card.Img variant="top" src={item.image} alt="Image is not available" />
                        </div>
                      </Card>
                    </Col>
                  )
                }
              </Row>
            </Container>
      }
    </div>
  )
}
export default Home;