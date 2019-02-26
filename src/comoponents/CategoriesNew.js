import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../config/config";
//import { Redirect } from "react-router-dom";
class AddCategory extends Component {
	constructor() {
		super();
		this.state = {
			name: ""
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
		axios
			.post("/categories", formData)
			.then(responce => {
				this.props.history.push("/categories");
			})
			.catch(err => {
				console.log(err);
			});
		this.setState(() => ({ name: "" }));
	};

	render() {
		return (
			<div>
				<h5>Add Category Here</h5>
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
