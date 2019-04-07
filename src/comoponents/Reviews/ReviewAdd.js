import React, { Component } from "react";
import axios from "../../config/config";
import ReviewForm from "./ReviewForm";
class ReviewAdd extends Component {
	handleSubmit = data => {
		const id = this.props.match.params.id;
		const formData = Object.assign(data, { product: id });
		axios
			.post("/reviews", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(responce => {
				this.props.history.push(`/products/${id}`);
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<h3>Create Review</h3>
				<ReviewForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default ReviewAdd;
