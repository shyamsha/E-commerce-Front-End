import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/config";

class Addresses extends Component {
	constructor() {
		super();
		this.state = {
			addresses: []
		};
	}
	componentDidMount() {
		axios
			.get("/addresses", {
				headers: {
					"x-auth": localStorage.getItem("token")
				}
			})
			.then(response => {
				const addresses = response.data;

				this.setState(() => ({ addresses: addresses }));
			});
	}

	render() {
		return (
			<div>
				<h3>Your Addresses</h3>
				{this.state.addresses.map(address => {
					return (
						<div key={address._id}>
							<p>{address.fullname}</p>
							<div>
								<p>
									{address.street} <br />
									{address.landmark} <br />
									{address.city} <br />
									{address.postalCode} <br />
									A.P <br />
									India <br />
									{address.mobile}
								</p>
								<Link to={`addresses/edit/${address._id}`}>Edit</Link>
								<br />
								{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}

								<a
									// eslint-disable-next-line no-script-url
									href="javascript:void(0)"
									target="_self"
									rel="noopener noreferrer"
									onClick={() => {
										axios
											.delete(`addresses/${address._id}`, {
												headers: {
													"x-auth": localStorage.getItem("token")
												}
											})
											.then(response => {
												let updateAddress = this.state.addresses.filter(
													addressId => addressId._id !== address._id
												);
												this.setState(() => ({
													addresses: updateAddress
												}));
											})
											.catch(err => {
												console.log(err);
											});
									}}
								>
									Delete
								</a>
							</div>
						</div>
					);
				})}

				<Link to="/user/addresses/add">Add Address</Link>
			</div>
		);
	}
}

export default Addresses;
