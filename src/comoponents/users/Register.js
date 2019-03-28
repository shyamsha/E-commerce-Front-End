import React from "react";
import axios from "../../config/config";

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			//same properties have to be here when i create in mongoose
			username: "",
			email: "",
			password: "",
			conformPwd: ""
		};
	}
	usernameHandle = e => {
		const username = e.target.value;
		this.setState(() => ({ username }));
	};
	emailHandle = e => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	passwordHandle(e) {
		const password = e.target.value;
		this.setState(() => ({ password }));
	}
	conformHandle = () => {};
	handleSubmit = e => {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};
		//valdition

		axios
			.post("/users/register", formData)
			.then(responce => {
				this.setState(() => ({
					username: "",
					email: "",
					password: ""
				}));
				this.props.history.push("/user/login");
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<h3>Register with us</h3>
				<form onSubmit={this.handleSubmit}>
					<label>
						UserName:
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.usernameHandle}
							minLength="3"
							maxLength="10"
							required="write your name"
							autoFocus
							pattern="\w*"
							title="must be alphanumeric"
							placeholder="write your username"
						/>
					</label>
					<br />
					<label>
						Email:
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.emailHandle}
							required
							// pattern={`^((?>[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+\x20*|"((?=[\x01-\x7f])[^"\\]|\\[\x01-\x7f])*"\x20*)*(?<angle><))?((?!\.)(?>\.?[a-zA-Z\d!#$%&'*+\-/=?^_`{|}~]+)+|"((?=[\x01-\x7f])[^"\\]|\\[\x01-\x7f])*")@(((?!-)[a-zA-Z\d\-]+(?<!-)\.)+[a-zA-Z]{2,}|\[(((?(?<!\[)\.)(25[0-5]|2[0-4]\d|[01]?\d?\d)){4}|[a-zA-Z\d\-]*[a-zA-Z\d]:((?=[\x01-\x7f])[^\\\[\]]|\\[\x01-\x7f])+)\])(?(angle)>)$ `}
							pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
							title="example@example.com"
							placeholder="write your valid email"
						/>
					</label>
					<br />
					<label>
						Password:
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.passwordHandle.bind(this)}
							required
							pattern="(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$"
							title="must be alphanumeric with at least one number, one letter, and be between 6-15 character in length."
							placeholder="write your password"
						/>
					</label>
					<br />
					PasswordConform:
					<label>
						<input
							type="password"
							name="password"
							value={this.state.conformPwd}
							onChange={this.conformHandle}
							required
							placeholder="conform your password"
						/>
					</label>
					<br />
					<input type="submit" onChange={this.handleSubmit} />
				</form>
			</div>
		);
	}
}

export default Register;
