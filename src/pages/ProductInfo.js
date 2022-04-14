import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import firebase from "../firebase";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function ProductInfo() {
  const [product, setproduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const productTemp = await getDoc(
          doc(firebase, "products", params.productid)
        );
        setproduct(productTemp.data());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    if (params.productid) {
      getData();
    }
  }, [params.productid]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt=""
                  className="productinfo-img"
                />
                <hr />
                <p>{product.description}</p>
                <button
                  className="d-flex justify-content-end my-3"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
