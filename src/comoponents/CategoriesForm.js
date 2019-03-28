import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name ? props.name : ""
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
		this.props.handleSubmit(formData);
		this.setState(() => ({ name: "" }));
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

export default CategoryForm;
