import React, { Component } from "react";
import axios from "../config/config";
import AddCategory from "./CategoriesNew";
class CategoryEdit extends Component {
	constructor() {
		super();
		this.state = {
			categories: {},
			isLoad: false
		};
	}
	componentDidMount() {
		axios
			.get(`categories/${this.props.match.params.id}`)
			.then(response => {
				const category = response.data;

				this.setState(() => ({ categories: category, isLoad: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	handleSubmit = formData => {
		axios
			.put(`categories/${this.state.categories._id}`, formData)
			.then(response => {
				this.props.history.push("/categories");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				{this.state.isLoad && (
					<AddCategory
						name={this.state.categories.name}
						handleSubmit={this.handleSubmit}
					/>
				)}
			</div>
		);
	}
}

export default CategoryEdit;
