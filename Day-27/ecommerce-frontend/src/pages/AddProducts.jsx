import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const AddProducts = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    brand: "",
    price: 0,
    ratings: "",
    description: "",
    imageSrc: "",
    about: "",
  });

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(productDetails);
      
      toast.success("product added Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Products</h1>
      <div className="container" id="register-form-container">
        <form action="" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="name"
                  value={productDetails.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter Product Name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  name="brand"
                  value={productDetails.brand}
                  onChange={handleChange}
                  required
                  placeholder="Enter Brand Name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  required
                  onChange={handleChange}
                  name="price"
                  value={productDetails.price}
                  placeholder="Enter Product Cost"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Ratings</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={handleChange}
                  value={productDetails.ratings}
                  name="ratings"
                  placeholder="add product ratings"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={productDetails.description}
                  onChange={handleChange}
                  required
                  placeholder="description of the Product"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Image Src</Form.Label>
                <Form.Control
                  type="url"
                  name="imageSrc"
                  value={productDetails.imageSrc}
                  required
                  onChange={handleChange}
                  placeholder="https://...."
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Form.Group>
                <Form.Label>About </Form.Label>
                <Form.Control
                  required
                  value={productDetails.about}
                  name="about"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter about Product"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit" className="btn btn-success">
                Add Product
              </button>
              <button type="reset" className="btn btn-danger mx-2">
                Reset
              </button>
            </Col>
          </Row>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddProducts;
