import React, { Component } from "react";
import axios from "../../config/config";
import { Redirect } from "react-router-dom";
class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			redirectCategories: false
		};
		//this.passwordHandle.bind(this);
	}
	emailHandle = e => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	passwordHandle = e => {
		e.persist(); //when ever u read diractely in setState use event.persist() must
		this.setState(() => ({ password: e.target.value }));
	};
	handleSubmit = e => {
		e.preventDefault();
		const formData = {
			email: this.state.email,
			password: this.state.password,
			redirectCategories: false
		};

		//valdition
		axios
			.post("/users/login", formData)
			.then(responce => {
				this.setState(() => ({
					email: "",
					password: "",
					redirectCategories: true
				}));
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		if (this.state.redirectCategories) {
			return <Redirect to="/categories" />;
		}
		return (
			<div>
				<h3>Login</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						Email:
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.emailHandle}
							required
							autoFocus
							placeholder="write your name"
							pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
							title="example@example.com"
						/>
					</label>
					<br />
					<label>
						Password:
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.passwordHandle}
							required
							placeholder="write your password"
						/>
					</label>
					<br />

					<input type="submit" onSubmit={this.handleSubmit} />
				</form>
			</div>
		);
	}
}

export default Login;
