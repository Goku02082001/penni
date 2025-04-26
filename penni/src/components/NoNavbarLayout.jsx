import React from "react";
import Login from "./Login";
import Signup from "./Signup";
const NoNavbarLayout = ({ children }) => {
  return (
    <div>
        <Login/>
        <Signup/>
      <div>{children}</div>
    </div>
  );
};

export default NoNavbarLayout;
