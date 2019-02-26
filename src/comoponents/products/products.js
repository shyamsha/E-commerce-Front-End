import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
class Product extends Component {
	constructor() {
		super();
		this.state = {
			products: []
		};
	}
	componentDidMount() {
		axios.get("/products").then(response => {
			const products = response.data;

			this.setState(() => ({ products: products }));
		});
	}
	render() {
		return (
			<div>
				<h5>Products - {this.state.products.length}</h5>
				<ul>
					{this.state.products.map(product => {
						return (
							<li key={product._id}>
								Name: {product.name} <br />
								<br />
							</li>
						);
					})}
				</ul>
				<Link to="products/add">Add Product</Link>
			</div>
		);
	}
}

export default Product;
