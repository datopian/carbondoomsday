import React from "react";
import BrandLogo from "./brand-small-logo.png";
import "./NavBar.css";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="Brand" src={BrandLogo}/>
            </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <div className="col-sm-3 col-md-3">
              <form className="navbar-form" role="search">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" name="q"/>
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit">
                      <i className="glyphicon glyphicon-search"/></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
