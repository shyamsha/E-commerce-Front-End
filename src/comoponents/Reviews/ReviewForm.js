import React, { Component } from "react";
import decode from "jwt-decode";
class ReviewForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			body: "",
			rating: Number
		};
	}
	handleChange = e => {
		e.persist();
		this.setState(() => ({ [e.target.name]: e.target.value }));
	};
	handleSubmit = e => {
		e.preventDefault();
		const userId = localStorage.getItem("token");
		const decoded = decode(userId);
		const data = {
			title: this.state.title,
			body: this.state.body,
			rating: this.state.rating,
			user: decoded.user_id
		};
		this.props.handleSubmit(data);
		this.setState(() => ({
			title: "",
			body: "",
			rating: ""
		}));
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Headline
						<br />
						<input
							type="text"
							name="title"
							value={this.state.title}
							onChange={this.handleChange}
							size="35"
						/>
					</label>
					<br />
					<label>
						Write your review
						<br />
						<textarea
							name="body"
							value={this.state.body}
							onChange={this.handleChange}
							cols="35"
							rows="5"
						/>
					</label>
					<br />
					<label>
						Your rating
						<br />
						<input
							type="number"
							name="rating"
							// value={this.state.rating}
							onChange={this.handleChange}
						/>
					</label>
					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default ReviewForm;
