/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState({
    min: 1,
    max: 0,
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/get-products",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data.allProducts);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProductsOnPrice = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/product-price?min=${price.min}&&max=${price.max}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

  

      if(price.min=="" && price.max==""){
        fetchProducts()
      }
      
      setProducts(response.data.filteredProducts)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" m-5">
      <div className="container my-5">
        <div className="row">
          <h2>Filter Products On Price : </h2>
          <div className="col">
            <Form.Group>
              <Form.Label htmlFor="">Minimum Price</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPrice({ ...price, min: e.target.value });
                }}
                type="number"
                placeholder="1000"
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group>
              <Form.Label htmlFor="">Maximum Price</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  setPrice({ ...price, max: e.target.value });
                }}
                placeholder="20000"
              />
            </Form.Group>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-danger"
              onClick={filterProductsOnPrice}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <Row className="g-4" md={4}>
          {products.map((item) => (
            <Col>
              <div className="card">
                <img
                  className="card-image"
                  src={item.imageSrc}
                  height={250}
                  alt=""
                />
                <div className="card-body">
                  <h3>Name : {item.name}</h3>
                  <h3>Price: {item.price}</h3>
                  <h3>Ratings: {item.ratings}</h3>
                  <p>{item.description}</p>

                  <div className="btn">
                    <div className="btn btn-success">Buy</div>
                    <div className="btn btn-warning mx-2">Add Cart</div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ViewProducts;
