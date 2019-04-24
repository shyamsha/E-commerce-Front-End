import React, { Component } from "react";
import axios from "../config/config";
import CategoryForm from "./CategoriesForm";

class NewCategory extends Component {
	handleSubmit = formData => {
		axios
			.post("/categories", formData, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				console.log(response.data);
				this.props.history.push("/categories");
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		return (
			<div>
				<CategoryForm handleSubmit={this.handleSubmit} />
			</div>
		);
	}
}

export default NewCategory;
