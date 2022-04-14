import React from "react";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import Loader from "./Loader";
function Layout(props) {
  return (
    <div>
      {props.loading && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
}

export default Layout;
