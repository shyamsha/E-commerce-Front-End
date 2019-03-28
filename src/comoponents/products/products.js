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
								<Link to={`/product/${product._id}`}>{product.name}</Link>{" "}
								<br />
								<img
									src={product.imageUrl}
									alt="productImg"
									width="100"
									hight="100"
								/>
							</li>
						);
					})}
				</ul>
				<Link to="product/add">Add Product</Link>
			</div>
		);
	}
}

export default Product;
