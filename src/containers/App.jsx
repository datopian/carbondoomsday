import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavBar from '../components/navbar/NavBar'
import Footer from '../components/footer/Footer'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <NavBar {...this.props} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
App.propTypes = {
  children: PropTypes.element
}

function mapStateToProps(state) {
  return {
    state
  }
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		authActions: bindActionCreators(authActions, dispatch)
// 	};
// }

export default connect(mapStateToProps)(App)
