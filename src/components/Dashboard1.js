import React from 'react';
import { Container, Nav, Navbar, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import product from "../images/product.png";
import order from "../images/order.png";
import supplier from "../images/supplier.png";

const Dashboard1 = () => {
    const navigate=useNavigate();  
    const Logout = () => {  
    
       
        localStorage.removeItem('token'); 
        navigate("/");
    }
    
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" fixed='top'>
              <Container>
                <Navbar.Brand as={Link} to="/" className='topleft'>Inventory-management</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto my-2 my-lg-0">                    
                  <Nav.Link href="/products" style={{width:"100px"}}>Products</Nav.Link>
                  <Nav.Link href="/orders" style={{width:"100px"}} >Orders</Nav.Link>
                  <Nav.Link href="/suppliers" style={{width:"100px"}}>Suppliers</Nav.Link>
                  <Nav.Link  onClick={Logout} style={{width:"100px"}}>Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop:"15vh" }}>
        <Row>
            <Col xs={12}md={4}xl={4}lg={4} className="mb-3">
            <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='carded'>
            <Card.Img variant="top" src={product} style={{height:"50vh",width:"100%"}}/>
                            <Card.Body>
                                <Card.Title>Product category :</Card.Title>
                                <Card.Text>
                                    <Row> 
                                        <Col>
                                            <strong>Dashboard:</strong> For Products details
                                            <br />
                                            <strong>Department:</strong> Inventory Model
                                            
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Link>
            </Col>
            <Col xs={12}md={4}xl={4}lg={4} className="mb-3">
            <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='carded' >
                            <Card.Body>
                            <Card.Img variant="top" src={order} style={{height:"50vh",width:"100%"}}/>
                                <Card.Title>Order category :</Card.Title>
                                <Card.Text>
                                    <Row> 
                                        <Col>
                                        <strong>Dashboard:</strong> For Orders details
                                            <br />
                                            <strong>Department:</strong> Inventory Model
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card></Link>
            </Col>
            <Col xs={12}md={4}xl={4}lg={4} className="mb-3">
            <Link to="/suppliers" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card className='carded'>
            <Card.Img variant="top" src={supplier} style={{height:"50vh",width:"100%"}}/>
                            <Card.Body>
                                <Card.Title>Supplier category :</Card.Title>
                                <Card.Text>
                                    <Row> 
                                        <Col>
                                        <strong>Dashboard:</strong> For Suppliers details
                                            <br />
                                            <strong>Department:</strong> Inventory Model
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card></Link>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard1;
