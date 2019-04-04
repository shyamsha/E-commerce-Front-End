import React, { Component } from "react";
import axios from "../../config/config";
// import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { Typography } from "@material-ui/core";
const styles = theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap"
	},
	margin: {
		margin: theme.spacing.unit
	},
	cssLabel: {
		"&$cssFocused": {
			color: purple[500]
		}
	},
	cssFocused: {},
	cssUnderline: {
		"&:after": {
			borderBottomColor: purple[500]
		}
	},
	cssOutlinedInput: {
		"&$cssFocused $notchedOutline": {
			borderColor: purple[500]
		}
	},
	notchedOutline: {},
	bootstrapRoot: {
		"label + &": {
			marginTop: theme.spacing.unit * 3
		}
	},
	bootstrapInput: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.common.white,
		border: "1px solid #ced4da",
		fontSize: 10,
		width: "auto",
		padding: "10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
		}
	},
	bootstrapFormLabel: {
		fontSize: 18
	},
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	}
});

const theme = createMuiTheme({
	palette: {
		primary: green
	},
	typography: { useNextVariants: true }
});
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			loginError: ""
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
			password: this.state.password
		};

		//valdition
		axios
			.post("/users/login", formData)
			.then(responce => {
				const token = responce.data;
				this.setState(() => ({ loginError: token }));
				if (token !== "invalid email or password") {
					this.setState(() => ({ loginError: "" }));
					localStorage.setItem("token", token);
					this.props.history.push("/home");
				}

				this.setState(() => ({
					email: "",
					password: ""
				}));
			})
			.catch(err => {
				console.log(err);
			});
	};
	valdition = () => {
		//let error = false;
		// const errors = {
		// 	emailError: "",
		// 	passwordError: ""
		// };
		if (this.state.email.indexOf("@") === -1) {
			//error = true;
			this.setState(() => ({ emailError: "give valid email format" }));
		}
		// this.setState({
		// 	...this.state
		// });
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<p style={{ color: "red" }}>{this.state.loginError}</p>
				<Typography variant="title" color="inherit">
					SignIn
				</Typography>

				<form onSubmit={this.handleSubmit}>
					<MuiThemeProvider theme={theme}>
						<TextField
							className={classes.margin}
							label="Email"
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.emailHandle}
							variant="outlined"
							placeholder="Your Email"
							required
						/>
						<br />
						<TextField
							className={classes.margin}
							label="Password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.passwordHandle}
							variant="outlined"
							placeholder="Your Password"
							required
						/>
					</MuiThemeProvider>

					{/* <label>
						Email
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.emailHandle}
							nError={this.valdition}
						/>
						<span>{this.state.emailError}</span>
					</label> */}
					{/* <br />
					<label>
						Password:
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.passwordHandle}
							/>
					</label>*/}
					<br />
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={this.handleSubmit}
					>
						LogIn
						<CloudUploadIcon className={classes.rightIcon} />
						{/* <Icon className={classes.rightIcon}>send</Icon> */}
					</Button>
					{/* <input type="submit" onSubmit={this.handleSubmit} /> */}
				</form>
			</div>
		);
	}
}
Login.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);
