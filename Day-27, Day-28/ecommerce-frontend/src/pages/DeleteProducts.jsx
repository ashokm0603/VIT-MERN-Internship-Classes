/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { useEffect, useState } from "react";
import "../assets/styles/DeleteProducts.css";
import { Pagination } from "react-bootstrap";
import { toast,ToastContainer } from "react-toastify";

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-product-records?page=${page}&&limit=${5}`,
      );

      setProducts(response.data.ProductRecords);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButton = (pageNo) => {
    setPage(pageNo);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/delete-product/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      toast.success("deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center m-3 p-2 rounded bg-info">Delete Products</h1>
      <div className="row">
        <table>
          <thead>
            <tr>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Name
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Price
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Ratings
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Image Src
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Brand
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Description
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                About
              </th>
              <th className="border border-primary text-center py-3 bg-primary-subtle">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length != 0 ? (
              products.map((item) => (
                <tr>
                  <td className="border border-primary text-center">
                    {item.name}
                  </td>
                  <td className="border border-primary text-center">
                    {item.price}
                  </td>
                  <td className="border border-primary text-center">
                    {item.ratings}
                  </td>
                  <td className="border border-primary text-center">
                    <img src={item.imageSrc} height={90} width={90} alt="" />
                  </td>
                  <td className="border border-primary text-center">
                    {item.brand}
                  </td>
                  <td className="border border-primary text-center">
                    {item.description}
                  </td>
                  <td className="border border-primary text-center">
                    {item.about}
                  </td>
                  <td className="border border-primary text-center">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center border border-primary p-2"
                >
                  Product Not Found Not This page
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="container my-3 d-flex align-items-center justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => handleButton(1)} />
          <Pagination.Prev onClick={() => handleButton(page - 1)} />
          <Pagination.Item
            active={page == 1 ? true : false}
            onClick={() => handleButton(1)}
          >
            {1}
          </Pagination.Item>

          <Pagination.Item
            active={page == 2 ? true : false}
            onClick={() => handleButton(2)}
          >
            {2}
          </Pagination.Item>
          <Pagination.Item
            active={page == 3 ? true : false}
            onClick={() => handleButton(3)}
          >
            {3}
          </Pagination.Item>
          <Pagination.Item
            active={page == 4 ? true : false}
            onClick={() => handleButton(4)}
          >
            {4}
          </Pagination.Item>
          <Pagination.Item
            active={page == 5 ? true : false}
            onClick={() => handleButton(5)}
          >
            {5}
          </Pagination.Item>

          <Pagination.Ellipsis />

          <Pagination.Next onClick={() => handleButton(page + 1)} />
          <Pagination.Last onClick={() => handleButton(6)} />
        </Pagination>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteProducts;
