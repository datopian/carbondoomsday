import React from 'react'
import { Navbar } from 'react-bootstrap'
import BrandLogo from './brand-small-logo.png'
import './NavBar.css'

class NavBar extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Navbar className="navbar navbar-light bg-faded mb-5" role="navigation">
        <div className="container">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <img alt="Brand" src={BrandLogo} />
              </a>
            </Navbar.Brand>
          </Navbar.Header>
        </div>
      </Navbar>
    )
  }
}

export default NavBar
