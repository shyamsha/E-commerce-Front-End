import React, { Component } from "react";
import Addresses from "./Addresses";
import axios from "../../config/config";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const styles = theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap"
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	}
});

class SelectAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carts: [],
			cart: false,
			address: ""
		};
	}
	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	componentDidMount() {
		axios
			.get("/carts", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				this.setState(() => ({ carts: response.data.cart, cart: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	placeOrder = () => {
		const data = {
			lineItems: []
		};
		this.state.carts.forEach(cart => {
			data.lineItems.push({
				product: cart.product._id,
				quantity: cart.quantity,
				price: cart.product.price
			});
		});
		axios
			.post("/orders", data, {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				console.log(response.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div
					//className={classes.root}
					style={{
						float: "right",
						marginRight: "15px",
						marginBottom: "55px"
					}}
				>
					<FormControl className={classes.formControl}>
						<NativeSelect
							className={classes.selectEmpty}
							value={this.state.address}
							name="address"
							onChange={this.handleChange("address")}
						>
							<option value="" disabled>
								Select
							</option>
							<option value={1}>#1</option>
							<option value={2}>#2</option>
						</NativeSelect>
						<FormHelperText>Select Address</FormHelperText>
					</FormControl>
					<Button
						style={{
							float: "right",
							marginRight: "15px",
							marginTop: "20px"
						}}
						color="secondary"
						variant="outlined"
						onClick={this.placeOrder}
					>
						Place the Order
					</Button>
					<Addresses />
				</div>
			</div>
		);
	}
}

SelectAddress.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectAddress);
