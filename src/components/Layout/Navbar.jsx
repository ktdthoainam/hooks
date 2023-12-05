import React from "react";
import {Link} from "react-router-dom"
function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container">
    <Link className="navbar-brand" to={"/"}>
      React Router DOM
    </Link>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        
      <li className="nav-item">
          <Link className="nav-link " to="/home">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/student/add">
            Student
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    )
}
export default Navbar;