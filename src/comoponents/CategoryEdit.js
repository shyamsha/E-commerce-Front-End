import React, { Component } from "react";
import { Link } from "react-router-dom";
class CategoryEdit extends Component {
	render() {
		return (
			<div>
				<h5>edit functionality</h5>
				<Link to="/categories">Back</Link>
			</div>
		);
	}
}

export default CategoryEdit;
