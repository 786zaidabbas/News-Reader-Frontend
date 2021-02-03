import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsItems from "./Components/news-items.components";
import logo from "./logo.png";

// Routing and Header implemented
function App() {
  return (
    <Router>
      <div >        
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
          <a className="navbar-brand" href="http://localhost:3000/" target="_self">
            <img src={logo} width="30" height="30" alt="search icon" />
          </a>        
          <Link to="/" className="navbar-brand">News Reader</Link>            
        </nav>          
        <Route path="/" exact component={NewsItems} />          
      </div>
    </Router>
  );
}

export default App;
