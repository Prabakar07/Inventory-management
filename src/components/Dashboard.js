import React from 'react';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import inventory from "../images/inventory.gif";

const Dashboard = () => {


    return (
        <>
            <Container style={{ height: "20vh" }}>
                <Row>
                    <Col>
                        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" fixed='top'>
                            <Container>
                                <Navbar.Brand className='topleft'>Inventory-management</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ms-auto my-2 my-lg-0">
                                        <Nav.Link href="/register" style={{ width: "100px" }} >Register</Nav.Link>
                                        <Nav.Link href="/login" style={{ width: "100px" }}>Login</Nav.Link>

                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
            <Container style={{ height: "80vh" }}>
                <img src={inventory} alt="background"style={{ width: "100%", height: "100%" }} />
            </Container>
        </>
    );
}

export default Dashboard;
