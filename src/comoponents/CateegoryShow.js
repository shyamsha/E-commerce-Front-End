import React, { Component } from "react";
import axios from "../config/config";
import { Link } from "react-router-dom";
class CategoryShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}
	componentDidMount() {
		axios.get("/categories").then(response => {
			const categories = response.data;

			this.setState(() => ({ categories: categories }));
		});
	}
	render() {
		return (
			<div>
				<h5>category show</h5>
				<ul>
					{this.state.categories.map(category => {
						return <li key={category._id}>{category.name}</li>;
					})}
				</ul>
				<Link to="/categories/edit">Edit</Link>
				{"|"}

				<Link to="/categories">Back</Link>
			</div>
		);
	}
}

export default CategoryShow;
