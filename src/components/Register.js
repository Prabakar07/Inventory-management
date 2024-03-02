import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Col } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
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
      const response = await axios.post('http://node.inventorymanage.tech/users/register', formData);

      // Handle successful registration (redirect, show a success message, etc.)
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      // Handle registration failure (show an error message, etc.)
      console.error('Error registering user:', error.response.data);
    }
  };

  return (
    <Container className='reg-page'>
      <Col md={{ span: 6, offset: 3 }}>
        <h1>Register Page</h1>
        <Form  onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Control>
          </Form.Group>
<br/>
          <Button type="submit" variant="primary">Register</Button>&nbsp;

          {/* Add Link to Dashboard */}
          <Link to="/">
            <Button variant="success" className="ml-2">
              Go to Dashboard
            </Button>
          </Link>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;
