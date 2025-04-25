import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Blog from "./components/Blog";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route  path="/"element={<Home/>}></Route>
        <Route  path="/blog"element={<Blog/>}></Route>
        
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Signup/>}/>
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
