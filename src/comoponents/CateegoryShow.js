import React, { Component } from "react";
import axios from "../config/config";
import { Link } from "react-router-dom";
class CategoryShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: {}
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`/categories/${id}`).then(response => {
			const categories = response.data;

			this.setState(() => ({ categories: categories }));
		});
	}
	handleDelete = () => {
		const alert = window.confirm("Are You Sure");
		const id = this.props.match.params.id;
		if (alert) {
			axios
				.delete(`categories/${id}`)
				.then(response => {
					this.props.history.push("/categories"); // this anthor way of redireact
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	render() {
		return (
			<div>
				<h5>category show</h5>
				<ul>
					<li>{this.state.categories.name}</li>
				</ul>
				<Link to={`/categories/edit/${this.props.match.params.id}`}>Edit</Link>
				{"|"}
				<button onClick={this.handleDelete}>Delete</button>
				{"|"}
				<Link to="/categories">Back</Link>
			</div>
		);
	}
}

export default CategoryShow;
