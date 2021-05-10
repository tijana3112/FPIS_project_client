import React, { Component } from "react";
import { Link } from "react-router-dom";

class MenuBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-4">
      <div className="container-fluid">
      <ul className="nav navbar-nav">
      <li>
        <button className="btn btn-danger navbar-btn"><Link className="navbar-brand" to="/">
          Pocetna
        </Link></button>
        </li>
      <li>
        <button className="btn btn-danger navbar-btn"><Link className="navbar-brand" to="/obavestenjeList">
          Prikaz svih obavestenja o izvrsenoj uplati osiguranja
        </Link></button>
        </li>
        <li>
        <button className="btn btn-danger navbar-btn"><Link className="navbar-brand" to="/racunList">
          Prikaz svih racuna osiguranja
        </Link></button>
        </li>
        </ul>
        </div>
        </nav>
        );
 
   
  }
}

export default MenuBar;
