import React from "react";
import axios from "../../config/config";

const Logout = props => {
	axios
		.delete("/users/logout", {
			headers: {
				"x-auth": localStorage.getItem("token")
			}
		})
		.then(responce => {
			console.log(responce.data);
		})
		.catch(err => {
			return "somthing went worng";
		});
	props.history.push("/user/Login/");
	return <div />;
};

export default Logout;
