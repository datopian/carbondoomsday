import React from 'react'
import { Link } from 'react-router'

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center mb-4">
          <h1>Welcome to Data Package Registry</h1>
        </div>
        <div className="d-flex justify-content-center">
          <Link to={'/core'} className="btn btn-secondary">Core Data Package</Link>
        </div>
      </div>
    )
  }
}
export default HomePage
