import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const UpdateProducts = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/get-products",
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      console.log(response.data.allProducts);
      setProducts(response.data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllProducts();
  }, []);

  const getProductOnId = async (id) => {
    try {
      const token = await localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/get-product/${id}`,
        { headers: { authorization: `Bearer ${token}` } },
      );

      console.log(response.data);
      setProductDetails(response.data.foundProduct);
      console.log(productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const token = await localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/update-product/${id}`,
        productDetails,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      toast.success("updated Successfully.");
      fetchAllProducts();
      setShow(false);
    } catch (error) {
      toast.error("failed to update details");
      console.log(error);
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-center m-3 p-3 rounded bg-success-subtle">
        Update Products{" "}
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th className="border  border-success text-center bg-info-subtle">
              Name
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              Brand
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              Price
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              Ratings
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              Description
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              About
            </th>
            <th className="border  border-success text-center bg-info-subtle">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td className="border border-success text-center">
                {product.name}
              </td>
              <td className="border border-success text-center">
                {product.brand}
              </td>
              <td className="border border-success text-center">
                {product.price}
              </td>
              <td className="border border-success text-center">
                {product.ratings}
              </td>
              <td className="border border-success text-center">
                {product.description}
              </td>
              <td className="border border-success text-center">
                {product.about}
              </td>
              <td className="border border-success text-center">
                <button
                  className="btn btn-warning"
                  onClick={() => getProductOnId(product._id)}
                >
                  <Button variant="primary" onClick={handleShow}>
                    Update Product Details
                  </Button>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="text-center">
              Update Product Details
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div>
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
                  <button
                    type="submit"
                    onClick={() => handleUpdate(productDetails._id)}
                    className="btn btn-danger"
                  >
                    Update
                  </button>
                  <button
                    type="reset"
                    onClick={handleClose}
                    className="btn btn-warning mx-2"
                  >
                    Back
                  </button>
                </Col>
              </Row>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
      <ToastContainer />
    </div>
  );
};

export default UpdateProducts;
