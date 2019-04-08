import React, { Component } from "react";
import axios from "../../config/config";

class TotalCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: props.carts,
			totalCart: 0
		};
	}

	calculateTotal() {
		let total = 0;
		this.state.carts.forEach(product => {
			total += product.product.price * product.quantity;
			return total;
		});
		console.log(total);
	}
	componentWillReceiveProps(nextProps) {
		// if (this.state.carts.length !== nextProps.carts.length) {
		this.setState(() => ({
			carts: nextProps.carts
		}));

		// }

		console.log("update", nextProps);
	}

	render() {
		console.log(this.state);

		return (
			<div>
				<p style={{ fontSize: "1.2rem", float: "right" }}>
					Subtotal({this.state.carts.length}items):
					{this.calculateTotal()}
				</p>
			</div>
		);
	}
}

export default TotalCart;
