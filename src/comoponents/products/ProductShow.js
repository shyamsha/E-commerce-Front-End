import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
class ProductShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: {}
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`/products/${id}`).then(response => {
			const products = response.data;

			this.setState(() => ({ products: products }));
		});
	}
	handleDelete = () => {
		const confirm = window.confirm("Are You Sure");
		const id = this.props.match.params.id;
		if (confirm) {
			axios
				.delete(`products/${id}`)
				.then(response => {
					this.props.history.push("/products"); // this anthor way of redireact
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	render() {
		return (
			<div>
				<h5>category show</h5>
				<ul>
					<li>{this.state.products.name}</li>
				</ul>
				<Link to={`/product/edit/${this.props.match.params.id}`}>Edit</Link>
				{"|"}
				<button onClick={this.handleDelete}>Delete</button>
				{"|"}
				<Link to="/products">Back</Link>
			</div>
		);
	}
}

export default ProductShow;
