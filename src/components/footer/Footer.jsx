import React from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import './Footer.css'

function Footer() {
  return (
    <footer className="navbar">
      <div className="container">
        <Grid>
          <Row>
            <Col sm={6}>
              <div className="copy">
                <p>
                  Copyright © 2015 Open Knowledge International
                  <br />
                  <a href="https://okfn.org/terms-of-use/">Terms of Use</a>
                  &ndash;
                  <a href="https://okfn.org/ip-policy/">IP Policy</a>
                  <br />
                  <a href="https://opendefinition.org/okd/" title="Open Data">
                    <Image src="https://assets.okfn.org/images/ok_buttons/od_80x15_blue.png" alt="" border="" /></a>
                  <a href="https://opendefinition.org/ossd/" title="Open Online Software Service">
                    <Image src="https://assets.okfn.org/images/ok_buttons/os_80x15_orange_grey.png" alt="" border="" />
                  </a>
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={8}>
                  <p>This service is run by</p>
                  <Image src="https://a.okfn.org/img/oki/landscape-rgb-165x43.png" alt="post" />
                </Col>
                <Col sm={4} className="connect">
                  <p>Connect with Us</p>
                  <ul className="list-inline">
                    <li><a href="https://twitter.com/okfnlabs"><i className="icon-twitter" /></a></li>
                    <li><a href="https://facebook.com/OKFNetwork"><i className="icon-facebook" /></a></li>
                    <li><a href="https://www.youtube.com/user/openknowledgefdn"><i className="icon-youtube" /></a></li>
                    <li><a href="https://plus.google.com/112608652597658788737"><i className="icon-google-plus" /></a></li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </footer>
  )
}

export default Footer
