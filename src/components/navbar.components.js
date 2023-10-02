import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <Link className="navbar-brand" to="/">GCASH-IN WEB APPLICATION</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Select
        </Link>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link type="button" className="btn btn-primary dropdown-item" to="/">Home</Link>
          <Link type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#CashInModal" to="/CashIn">Add Cash-In</Link>
          <Link type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#CollectionModal" to="/Collection">Add Collection</Link>
          <Link type="button" className="btn btn-primary dropdown-item" data-toggle="modal" data-target="#ExpensesModal" to="/Expenses">Add Expenses</Link>
        </div>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}