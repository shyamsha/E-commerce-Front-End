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
				{this.state.products.map(product => {
					return (
						<div key={product._id}>
							<h5>
								<Link to={`/products/${product._id}`}>{product.name}</Link> -{" "}
								<span style={{ color: "green" }}>{product.category.name}</span>
							</h5>
							<img
								src={product.imageUrl}
								alt="productImg"
								width="100"
								hight="100"
							/>
							<p>price -{product.price}</p>
							{/* <button onclick={this.handleProduct}>AddCart</button> */}
						</div>
					);
				})}

				{/* <Link to="products/add">Add Product</Link> */}
			</div>
		);
	}
}

export default Product;
