import React from "react";
import axios from "../../config/config";

const Logout = props => {
	axios
		.delete("/users/logout", {
			headers: {
				"x-auth": localStorage.removeItem("token")
			}
		})
		.then(responce => {
			return { statusText: "you have successfully logged out" };
		})
		.catch(err => {
			return { statusText: "somthing went worng" };
		});
	return <div />;
};

export default Logout;
