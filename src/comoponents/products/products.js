import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";
// function cat() {
// 	axios.get(`/categories`).then(response => {
// 		console.log(response.data);
// 	});
// }
// var cate = cat();
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
			console.log(response.data[0].category.name);
			this.setState(() => ({ products: products }));
		});
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<h5>Products - {this.state.products.length}</h5>
				<ul>
					{this.state.products.map(product => {
						return (
							<div key={product._id}>
								<h5>
									<Link to={`/products/${product._id}`}>{product.name}</Link> -{" "}
									<span style={{ color: "green" }}>
										{product.category.name}
									</span>
								</h5>
								<img
									src={product.imageUrl}
									alt="productImg"
									width="100"
									hight="100"
								/>
								<p>price -{product.price}</p>
								<button>AddCart</button>
							</div>
						);
					})}
				</ul>
				<Link to="products/add">Add Product</Link>
			</div>
		);
	}
}

export default Product;
