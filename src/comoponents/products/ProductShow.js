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
				.delete(`products/${id}`, {
					headers: {
						"x-auth": localStorage.getItem("token")
					}
				})
				.then(response => {
					this.props.history.push("/products"); // this anthor way of redireact
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	handleCart = () => {
		const data = {
			product: this.props.match.params.id,
			quantity: 1
		};
		axios
			.post(`/carts`, data, {
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
	};
	render() {
		return (
			<div>
				<div>
					<h5>{this.state.products.name}</h5>
					<img
						src={this.state.products.imageUrl}
						alt="productImg"
						width="100"
						hight="100"
					/>
					<p>description:{this.state.products.description}</p>
					<p>price -{this.state.products.price}</p>
					<button onClick={this.handleCart}>AddCart</button>
				</div>
				<hr />
				<Link to={`/product/edit/${this.props.match.params.id}`}>Edit</Link>
				{"|"}
				<button onClick={this.handleDelete}>Delete</button>
				{"|"}
				{/* <Link to="/products">Back</Link> */}
			</div>
		);
	}
}

export default ProductShow;
