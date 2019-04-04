import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import TotalCart from "./totalCart";
class Carts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false,
			quaninty: 1,
			totalCart: 0
		};
	}
	componentDidMount() {
		axios
			.get("/carts", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({ carts: response.data.cart, cart: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleQuentity = e => {};

	render() {
		return (
			<div>
				<h4>
					Shopping Cart-{this.state.carts.length}
					<span
						style={{ float: "right", fontSize: "15px", fontWeight: "normal" }}
					>
						Quantity
					</span>
				</h4>
				{this.state.cart && (
					<div>
						{this.state.carts.map(product => {
							return (
								<div key={product._id}>
									<hr />
									<form type={this.handleSubmit}>
										<label>
											<input
												type="number"
												name="quantity"
												value={product.quantity}
												min="1"
												max="50"
												onChange={this.handleQuentity}
												style={{ float: "right" }}
											/>
										</label>
									</form>
									<h4>
										<Link to={`/products/${product.product._id}`}>
											{product.product.name}
										</Link>
									</h4>
									<img
										src={product.product.imageUrl}
										alt="productImg"
										width="100"
										hight="100"
									/>
									<p>price -{product.product.price}</p>
									<span
										style={{ textDecoration: "underline", color: "red" }}
										onClick={() => {
											axios
												.delete(`carts/${product._id}`, {
													headers: {
														"x-auth": localStorage.getItem("token")
													}
												})
												.then(response => {
													console.log(response.data);
												})
												.catch(err => {
													console.log(err);
												});
										}}
									>
										Delete
									</span>
									<hr />
								</div>
							);
						})}
					</div>
				)}
				<TotalCart />
			</div>
		);
	}
}

export default Carts;
