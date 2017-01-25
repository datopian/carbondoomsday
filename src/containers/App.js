import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class App extends React.Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
    }
}
App.propTypes = {
	children: PropTypes.element
};

function mapStateToProps(state) {
	return {
		state: state
	};
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		authActions: bindActionCreators(authActions, dispatch)
// 	};
// }

export default connect(mapStateToProps)(App);
