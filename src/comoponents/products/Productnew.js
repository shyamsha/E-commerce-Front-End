import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProductNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			price: "",
			stock: "",
			isCod: "",
			category: ""
		};
	}

	render() {
		return (
			<div>
				<h4>Product Add Here</h4>
				<Link to="/products">Back</Link>
			</div>
		);
	}
}

export default ProductNew;
