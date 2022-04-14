import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import firebase from "../firebase";
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  // const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentuser")).user.uid;
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const result = await getDocs(collection(firebase, "orders"));
        const ordersArray = [];
        result.forEach((doc) => {
          ordersArray.push(doc.data());
          setLoading(false);
        });
        setOrders(ordersArray);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <Layout loading={loading}>
      <div className="p-2">
        {orders
          .filter((obj) => obj.userid === userid)
          .map((order) => {
            return (
              <table className="table mt-2 order">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.imageURL}
                            height="80px"
                            width="80px"
                            alt=""
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
      </div>
    </Layout>
  );
}

export default OrdersPage;
