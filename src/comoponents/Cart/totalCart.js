import React, { Component } from "react";
import axios from "../../config/config";
let total = 0;
class TotalCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false,
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

	render() {
		// this.setState(() => ({ totalCart: total }))

		return (
			<div>
				<p style={{ fontSize: "1.2rem", float: "right" }}>
					Subtotal({this.state.carts.length}items):{total}
				</p>
				{this.state.cart && (
					<div>
						{this.state.carts.forEach(product => {
							total += product.product.price * product.quantity;
							return <div />;
						})}
					</div>
				)}
			</div>
		);
	}
}

export default TotalCart;
