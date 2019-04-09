import React, { Component } from "react";
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

		return <div>{total}</div>;
	}

	componentWillReceiveProps(nextProps) {
		this.setState(() => ({
			carts: nextProps.carts
		}));
	}

	render() {
		return (
			<div>
				<p style={{ fontSize: "1.2rem", float: "right" }}>
					Subtotal({this.state.carts.length}items):
					{this.calculateTotal().props.children}
				</p>
			</div>
		);
	}
}

export default TotalCart;
