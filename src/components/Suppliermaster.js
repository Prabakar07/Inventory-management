
import React, { useState, useEffect } from 'react';
import { Form, Button, Table,Col,Container} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Suppliermaster = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [supplierData, setSupplierData] = useState({
    name: '',
    products: [],
    contactPerson: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch suppliers and products on component mount
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://node.inventorymanage.tech/suppliers/allsuppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
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
    setSupplierData({
      ...supplierData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If supplierData has an _id, it's an update; otherwise, it's an insert
      if (supplierData._id) {
        await axios.put(`http://node.inventorymanage.tech/suppliers/updatesupplier/${supplierData._id}`, supplierData);
      } else {
        await axios.post('http://node.inventorymanage.tech/suppliers/createsupplier', supplierData);
      }

      // Clear the form data and fetch updated suppliers
      setSupplierData({
        name: '',
        products: [],
        contactPerson: '',
      });
      fetchSuppliers();
    } catch (error) {
      console.error('Error submitting supplier:', error);
    }
  };

  const handleEdit = (supplier) => {
    setSupplierData(supplier);
  };

  const handleDelete = async (supplierId) => {
    try {
      await axios.delete(`http://node.inventorymanage.tech/suppliers/deletesupplier/${supplierId}`);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <Container>
      
      <Col md={{ span: 6, offset: 3 }}>
      <h1>Inventory Suppliers </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="products">
          <Form.Label>Products</Form.Label>
          <Form.Control
            as="select"
            name="products"
            // multiple
            value={supplierData.products}
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

        <Form.Group controlId="contactPerson">
          <Form.Label>Contact Person</Form.Label>
          <Form.Control
            type="text"
            name="contactPerson"
            value={supplierData.contactPerson}
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Products</th>
            <th>Contact Person</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>{supplier.name}</td>
              <td>{supplier.products.map((product) => product.name).join(', ')}</td>
              <td>{supplier.contactPerson}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(supplier)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(supplier._id)}>
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

export default Suppliermaster;

