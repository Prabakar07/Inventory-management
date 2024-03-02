import React, { useState, useEffect } from 'react';
import { Form, Button, Table,Col,Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ordermaster = () => {
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({
    product: '',
    quantity: 0,
    orderTotal: 0,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch orders and products on component mount
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://node.inventorymanage.tech/orders/allorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://node.inventorymanage.tech/products/allproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedProduct = products.find((product) => product._id === orderData.product);
  
    if (selectedProduct) {
      const requestData = {
        productId: selectedProduct._id,
        quantity: orderData.quantity || 1,
        orderTotal: orderData.orderTotal || 0,
      };
  
      try {
        const response = await axios.post('http://node.inventorymanage.tech/orders/createorder', requestData);
  
        if (response.data._id) {
          // Assuming the backend sends back the ID of the created order
          setOrderData({
            product: '',
            quantity: 0,
            orderTotal: 0,
          });
          fetchOrders();
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error submitting order:', error);
      }
    } else {
      console.error('Selected product not found.');
    }
  };
  

  const handleEdit = (order) => {
    setOrderData(order);
    console.log('Edit order:', order);
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://node.inventorymanage.tech/orders/deleteorder/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <Container>
      
      <Col md={{ span: 6, offset: 3 }}>
      <h1>Inventory Orders</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="product">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            name="product"
            value={orderData.product}
            onChange={handleChange}
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="orderTotal">
          <Form.Label>Order Total</Form.Label>
          <Form.Control
            type="number"
            name="orderTotal"
            value={orderData.orderTotal}
            onChange={handleChange}
            required
          />
        </Form.Group>
<br/>
        <Button type="submit" variant="primary">
          Submit
        </Button><br/><br/>
        <Link to="/dashboard1">
            <Button variant="success" className="ml-2">
              Go to Dashboard
            </Button>
          </Link>
      </Form></Col>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.products[0].product.name}</td>
              <td>{order.products[0].quantity}</td>
              <td>{order.orderTotal}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(order)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(order._id)}>
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

export default Ordermaster;
