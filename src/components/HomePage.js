import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {

	constructor(props, context){
		super(props, context);
	}

	render(){
		return(
			<div >
				<h1>Welcome to Data Package Registry</h1>
        <Link to={"/pack"}>GO TO DATA PAGE</Link>
      </div>
		);
	}
}
export default HomePage;

