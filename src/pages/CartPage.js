import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import firebase from "../firebase";
import { toast } from "react-toastify";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);

  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [pincode, setPinCode] = useState();
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const placeorder = async () => {
    const addressinfo = {
      name,
      address,
      pincode,
      phonenumber,
    };
    console.log(addressinfo);
    const orderInfo = {
      cartItems,
      addressinfo,
      email: JSON.parse(localStorage.getItem("currentuser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentuser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(firebase, "orders"), orderInfo);
      console.log(result);
      setLoading(false);
      toast.success("Order Placed Successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("Order Failed");

      setLoading(false);
    }
  };
  return (
    <Layout loading={loading}>
      <table className="table mt-2">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80px" width="80px" alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {totalAmount} RS/-</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="place-order" onClick={handleShow}>
          PLACE ORDER
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <textarea
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Pin Code"
              value={pincode}
              onChange={(e) => {
                setPinCode(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={placeorder}>Order Now</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CartPage;
