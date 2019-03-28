import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Categories from "./comoponents/categories";

import CategoryShow from "./comoponents/CateegoryShow";
import CategoryEdit from "./comoponents/CategoryEdit";
import Register from "./comoponents/users/Register";
import Login from "./comoponents/users/Login";
import Product from "./comoponents/products/products";
import AddProduct from "./comoponents/products/ProductAdd";
import ProductEdit from "./comoponents/products/ProductEdit";
import ProductShow from "./comoponents/products/ProductShow";
import NewCategory from "./comoponents/CategoryAdd";
import Logout from "./comoponents/users/Logout";
import Home from "./comoponents/Home/Home";

//import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<h4>welcome to your mall</h4>
					<Link to="/home">Home</Link> |{" "}
					<Link to="/categories"> Categories</Link> |{" "}
					<Link to="/products">Products</Link> |{" "}
					<Link to="/user/register">Register</Link> |{" "}
					<Link to="/user/login">Login</Link> |{" "}
					<Link to="/user/logout">Logout</Link> |{" "}
					<Switch>
						<Route path="/categories" component={Categories} exact={true} />
						<Route path="/category/add" component={NewCategory} />
						<Route
							path="/categories/:id"
							component={CategoryShow}
							exact={true}
						/>
						<Route path="/categories/edit/:id" component={CategoryEdit} />
						<Route path="/products" component={Product} exact={true} />
						<Route path="/product/add" component={AddProduct} exact={true} />
						<Route path="/product/:id" component={ProductShow} exact={true} />
						<Route path="/product/edit/:id" component={ProductEdit} />
						<Route path="/user/register" component={Register} />
						<Route path="/user/login" component={Login} />
						<Route path="/user/logout" component={Logout} />
						<Route path="/home" component={Home} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
