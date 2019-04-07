import React, { Component } from "react";
import ProductForm from "./ProductForm";
import axios from "../../config/config";
import { Link } from "react-router-dom";

class AddProduct extends Component {
	handleSubmit = data => {
		axios
			.post("/products", data, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(responce => {
				this.props.history.push("/products");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<h5>Add Product Here</h5>
				<ProductForm handleSubmit={this.handleSubmit} />
				<Link to="/categories">Back</Link>
			</div>
		);
	}
}

export default AddProduct;
