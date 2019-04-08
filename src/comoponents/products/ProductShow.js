import React, { Component } from "react";
import axios from "../../config/config";
import { Link } from "react-router-dom";
// import decode from "jwt-decode";
class ProductShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: {},
			reviews: [],
			isload: false
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`/products/${id}`).then(response => {
			const products = response.data;
			this.setState(() => ({ products: products }));
		});
		axios.get("/reviews").then(response => {
			this.setState(() => ({ reviews: response.data, isload: true }));
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
			.then(response => {})
			.catch(err => {
				console.log(err);
			});
	};
	handleMonthlyCart = () => {
		const data = {
			product: this.props.match.params.id,
			quantity: 1
		};
		const conform = window.confirm(
			"Are you sure this items repeated every month!"
		);
		if (conform) {
			axios
				.post(`/monthlycarts`, data, {
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
		}
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
					<button onClick={this.handleMonthlyCart}>AddMonthlyCart</button>
				</div>
				<hr />
				<Link to={`/product/edit/${this.props.match.params.id}`}>Edit</Link>
				{"|"}
				<button onClick={this.handleDelete}>Delete</button>
				{"|"}
				{this.state.isload && (
					<div>
						<h2>Reviews</h2>
						{this.state.reviews.map(review => {
							if (this.state.products._id === review.product) {
								return (
									<div key={review._id}>
										<p>
											<b>{review.title}</b>
										</p>
										<p>{review.body}</p>
										<p>{review.rating}</p>
									</div>
								);
							} else {
								return "";
							}
						})}
					</div>
				)}
				<Link to={`/products/user/reviews/${this.props.match.params.id}`}>
					<button>Write a product review</button>
				</Link>
			</div>
		);
	}
}

export default ProductShow;
