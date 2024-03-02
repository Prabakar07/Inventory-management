import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Col } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://node.inventorymanage.tech/users/login', formData);

      if (response && response.data) {
        const { success, token, user } = response.data;

        if (success) {
          console.log('Token:', token);
          console.log('User:', user);
          navigate('/dashboard1');
        } else {
          console.error('Login failed. The server response indicates failure.');
        }
      } else {
        console.error('Login failed. Empty response or missing data property.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
    }
  };

  return (
    <Container className='login-page'>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Login page</h1>
        <Form className="mt-5" onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label >Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label >Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
<br/>
          <Button type="submit" variant="primary">Login</Button>&nbsp;

          {/* Add Link to Register */}
          <Link to="/register">
            <Button variant="info" className="ml-2">
              Go to Register
            </Button>
          </Link><br/><br/>
          <Link to="/">
            <Button variant="success" className="ml-2">
              Go to dashboard
            </Button>
          </Link>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
