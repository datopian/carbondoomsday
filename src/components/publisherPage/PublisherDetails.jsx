import React, { PropTypes } from 'react'
import _ from 'lodash'
import { Col, Image } from 'react-bootstrap'

class PublisherDetails extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    const keys = _.keys(data)
    if (keys.length > 0) {
      return (
        <Col sm={3}>
          <Image src="https://avatars3.githubusercontent.com/u/22451011?v=3&s=200" fluid thumbnail />
          <h1>{ data.name }</h1>
          <h4>{ data.title }</h4>
          <p><span className="fa fa-calendar" /> { data.joined }</p>
        </Col>
      )
    } else {
      return (
        <Col sm={3}>No publisher details to display.</Col>
      )
    }
  }
}

PublisherDetails.propTypes = {
  data: PropTypes.object.isRequired
}

export default PublisherDetails
