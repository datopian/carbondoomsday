import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import { Row, Col, Button } from 'react-bootstrap'

class PackageListItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { name, title, description, publisherName } = this.props
    const packageUrl = `${publisherName}/${name}`
    return (
      <div className="card mb-2">
        <div className="card-block">

          <h5 className="card-title"><span className="fa fa-files-o" />{title}</h5>
          <h6>[{name}]</h6>

          { description !== undefined ?
            <ReactMarkdown className="panel-body" source={description} />
            : ''
          }

          <Row className="show-grid clearfix">
            <Col sm={2}>
              <img src="https://avatars3.githubusercontent.com/u/22451011?v=3&s=200" className="img-fluid rounded-circle" />
            </Col>
            <Col sm={6} className="align-self-center">
              <small><Link to={`/${publisherName}`}>by:{publisherName}</Link></small>
            </Col>
            <Col sm={4} className="pull-right align-self-center">
              <Button bsStyle="default" bsSize="xsmall">
                <Link to={packageUrl}>Explore</Link>
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

PackageListItem.propTypes = {
  name: PropTypes.string.isRequired
  , description: PropTypes.string
  , publisherName: PropTypes.string.isRequired
  , title: PropTypes.string.isRequired
}

export default PackageListItem
