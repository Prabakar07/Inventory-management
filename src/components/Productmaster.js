import React, { useState, useEffect } from 'react';
import { Form, Button, Table,Container,Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Productmaster = () => {

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productCode: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    // Fetch products on component mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://node.inventorymanage.tech/products/allproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If formData has an _id, it's an update; otherwise, it's an insert
      if (formData._id) {
        await axios.put(`http://node.inventorymanage.tech/products/updateproduct/${formData._id}`, formData);
        console.log('Not submitting form...');
      } else {
        await axios.post('http://node.inventorymanage.tech/products/createproduct', formData);
        console.log('Submitting form...');
      }

      // Clear the form data and fetch updated products
      setFormData({
        name: '',
        description: '',
        productCode: '',
        price: 0,
        quantity: 0,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://node.inventorymanage.tech/products/deleteproduct/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
 
  return (
    <Container>
      
      <Col md={{ span: 6, offset: 3 }}>
      <h1>Inventory Products</h1>
      <Form  onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productCode">
          <Form.Label>Product Code</Form.Label>
          <Form.Control
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
<br/>
        <Button type="submit">Submit</Button><br/><br/>
        <Link to="/dashboard1">
            <Button variant="success" className="ml-2">
              Go to Dashboard
            </Button>
          </Link>
      </Form></Col>
      <br/>
      <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Product Code</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.productCode}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <Button variant="info" onClick={() => handleEdit(product)}>
                Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(product._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
};

export default Productmaster;
