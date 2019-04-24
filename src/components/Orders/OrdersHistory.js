import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
class OrderHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			order: false
		};
	}
	componentDidMount() {
		axios
			.get("/orders", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({ orders: response.data, order: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		console.log(this.state);
		if (this.state.orders.length === 0) {
			return (
				<div>
					<Typography>your are not yet purchaged</Typography>
				</div>
			);
		} else {
			return (
				<div>
					<h3>Your Orders</h3>
					{this.state.order && (
						<div>
							{this.state.orders.map(product => {
								return (
									<div key={product._id}>
										{product.order.map(order => {
											return (
												<div key={order._id}>
													<div>
														<span>Paid On : </span>
														{String(order.orderAt).slice(0, 10)} <br />
														<span>OrderNumber : </span>
														{order.orderNumber}
														{order.lineItems.map(cart => {
															return (
																<div key={cart.product._id}>
																	<p>
																		<Link to={`/products/${cart.product._id}`}>
																			{cart.product.name}
																		</Link>
																	</p>{" "}
																	<br />
																	<img
																		src={cart.product.imageUrl}
																		alt="product"
																		heigth="100"
																		width="100"
																	/>
																	<p>&#x20B9; {cart.product.price}</p>
																	<p>
																		total: {cart.price}*{cart.quantity}=
																		&#x20B9; {cart.quantity * cart.price}
																	</p>
																	<hr />
																</div>
															);
														})}
													</div>
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
					)}
				</div>
			);
		}
	}
}

export default OrderHistory;
