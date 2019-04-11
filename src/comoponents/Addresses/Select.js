import React, { Component } from "react";
import Addresses from "./Addresses";
import axios from "../../config/config";

class Select extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false
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
	placeOrder = () => {
		const data = [];
		this.state.carts.forEach(cart => {
			data.push({
				product: cart.product._id,
				quantity: cart.quantity
			});
		});
	};
	render() {
		return (
			<div>
				<Addresses />
				<select name="addresses" id="">
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
				<br />
				<button onClick={this.placeOrder}>Place the Order</button>
			</div>
		);
	}
}

export default Select;
