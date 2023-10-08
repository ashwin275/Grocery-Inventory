import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./Home.css";

function Home() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [modifiedData, setModifiedData] = useState({});
  const [err, seterr] = useState({});
  const [sum,setTotalSum] = useState(0)
  const [formData, setFormData] = useState({
    product_name: "",
    quantity: "",
    unit_price: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("error message", err);
    console.log(err.quantity);
  }, [err]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/grocery_items/");
      console.log("Response", response.data);
      setGroceryItems(response.data.payload);
      setTotalSum(response.data.total_sum)
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //form  modals

  const handleClose = () => {
    setModifiedData({});
    setFormData({ product_name: "", quantity: "", unit_price: "" });
    seterr({});
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setModifiedData((prevState) => ({ ...prevState, [name]: value }));
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log("modified", modifiedData);
    if (err.length != 0) {
      seterr({});
    }
  };

  const HandlSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/grocery_items/",
        modifiedData
      );
      console.log("Reseponse for post method", response);

      setModifiedData({});
      fetchData();
      setShow(false);
      setFormData({ product_name: "", quantity: "", unit_price: "" });
      toast.success(response.data.message);
      seterr({});
    } catch (error) {
      console.log("error for post method", error);

      console.log(error.response.data.details);
      seterr(error.response.data.details);
      toast.error(error.response.data.details);
    }
  };

  return (
    <div className="Container-Home">
      <div className="header-wrapper d-flex flex-column">
        {" "}
        <p className="header">Grocery Items</p>
        <div className=" d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleShow}
          >
            Add item
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : groceryItems.length <= 0 ? (
        <>
          <div>
            <img
              src="https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif"
              className="img-thumbnail img-fluid"
              alt="Not found"
            />
            <p className="font-basket-empty">
              your basket is empty add some items .
            </p>
          </div>
        </>
      ) : (
        <div className="table-wrapper table-responsive">
          <table className="table table-success table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Date</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {groceryItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.product_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit_price}</td>
                  <td>{item.date}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">#</th>
                <td colspan="4">Total Price</td>
                <td>{sum}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD ITEMS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={HandlSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="product_name"
                className="form-control"
                id="product_name"
                value={formData.product_name}
                onChange={handleInputChange}
                placeholder="Product Name"
                // required={AddDept}
              />
              <div className="d-flex justify-content-center">
                {" "}
                <p className="err-msg">
                  {err.product_name && err.product_name}
                </p>{" "}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="quantity"
                className="form-control mt-3"
                id="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                // required={AddDept}
              />
              <div className="d-flex justify-content-center">
                {" "}
                <p className="err-msg">{err.quantity && err.quantity}</p>{" "}
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="unit_price"
                className="form-control mt-3"
                id="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
                placeholder="Unit Price"
                // required={AddDept}
              />
              <div className="d-flex justify-content-center">
                {" "}
                <p className="err-msg">
                  {err.unit_price && err.unit_price}
                </p>{" "}
              </div>
            </div>

            <button type="submit" className="btn btn-outline-primary mt-5">
              Save
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
