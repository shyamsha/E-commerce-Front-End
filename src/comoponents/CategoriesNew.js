import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../config/config";
//import { Redirect } from "react-router-dom";
class AddCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name ? props.name : "",
			isNew: false
		};
	}
	handleName = e => {
		e.persist();
		this.setState(() => ({
			name: e.target.value
		}));
	};
	handleSubmit = e => {
		e.preventDefault();
		const formData = {
			name: this.state.name
		};
		if (this.state.isNew) {
			axios
				.post("/categories", formData)
				.then(responce => {
					this.props.history.push("/categories");
				})
				.catch(err => {
					console.log(err);
				});
			this.setState(() => ({ name: "" }));
		}
		this.props.handleSubmit(formData);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name Of Category:
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleName}
						/>
					</label>

					<br />
					<input type="submit" value="submit" />
				</form>
				<Link to="/categories">Back</Link>
			</div>
		);
	}
}

export default AddCategory;
