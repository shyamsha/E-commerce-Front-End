import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Categories from "./components/categories";
import CategoryShow from "./components/CateegoryShow";
import CategoryEdit from "./components/CategoryEdit";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Product from "./components/products/products";
import AddProduct from "./components/products/ProductAdd";
import ProductEdit from "./components/products/ProductEdit";
import ProductShow from "./components/products/ProductShow";
import NewCategory from "./components/CategoryAdd";
import Logout from "./components/users/Logout";
import Home from "./components/Home/Home";
import Notfound from "./components/Home/NotFound";
import Carts from "./components/Cart/Carts";
import MonthlyCarts from "./components/MonthlyCart/MonthlyCart";
import OrderHistory from "./components/Orders/OrdersHistory";
// import axios from "./config/config";
import "./App.css";
import Addresses from "./components/Addresses/Addresses";
import AddAddress from "./components/Addresses/AddAddress";
import AddressEdit from "./components/Addresses/AddressEdit";
import ReviewAdd from "./components/Reviews/ReviewAdd";
import SelectAddress from "./components/Addresses/Select";
import Help from "./components/Help/Help";
// import decode from "jwt-decode";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role: "",
			search: "",
			admin: false,
			user: false,
			isAuth: false
		};
	}

	handleLogin = () => {
		this.setState(() => ({
			// isAuth: true
		}));
	};
	handleLogout = () => {
		this.setState(() => ({
			// isAuth: false
		}));
	};

	searchHandle = e => {};
	render() {
		let login = false;
		let logout = false;
		if (localStorage.getItem("token")) {
			login = true;
		} else {
			logout = true;
		}
		return (
			<BrowserRouter>
				<div>
					<div id="navBar">
						<div id="topHalf">
							<div id="logoWrapper">
								<img
									id="logo"
									src="http://www.userlogos.org/files/logos/ArkAngel06/Amazon.png"
									alt="logo"
								/>
							</div>
							<input
								id="in"
								type="text"
								value={this.state.search}
								placeholder="Search"
								onChange={this.searchHandle}
							/>
							<img id="backToSchool" src="/" alt="Offer" />
						</div>

						<div id="bottomHalf">
							<div id="sections">
								<div className="section">
									<Link
										className="a"
										style={{ color: "white", textDecoration: "none" }}
										to="/home"
									>
										Home
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/categories"
									>
										Shop by Categories
									</Link>
								</div>
								{/* <div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/deals"
									>
										Today Deal's
									</Link>
								</div> */}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/products"
									>
										Products
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/help"
									>
										Help
									</Link>
								</div>
							</div>
							<div id="accountStuff">
								{logout && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/register"
										>
											Register
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/orders"
									>
										Orders
									</Link>
								</div>
								{logout && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/login"
										>
											Login
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/addresses"
									>
										Your Addresses
									</Link>
								</div>
								{login && (
									<div className="section">
										<Link
											style={{ color: "white", textDecoration: "none" }}
											to="/user/logout"
										>
											Logout
										</Link>
									</div>
								)}
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/cart"
									>
										Cart
									</Link>
								</div>
								<div className="section">
									<Link
										style={{ color: "white", textDecoration: "none" }}
										to="/user/monthlycart"
									>
										MonthlyCart
									</Link>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="navigation">
						<Link to="/home">Home</Link>
						<Link to="/categories"> Categories</Link>
						<Link to="/products">Products</Link>
						<Link to="/user/cart">Cart</Link>
						<Link to="/user/register">Register</Link>
						<Link to="/user/login">Login</Link>
						<Link to="/user/logout">Logout</Link>
					</div> */}

					<Switch>
						<Route path="/categories" component={Categories} exact={true} />
						<Route path="/categories/add" component={NewCategory} />
						<Route
							path="/categories/:id"
							component={CategoryShow}
							exact={true}
						/>
						<Route path="/categories/edit/:id" component={CategoryEdit} />
						<Route path="/products" component={Product} exact={true} />
						<Route path="/products/add" component={AddProduct} exact={true} />
						<Route path="/products/:id" component={ProductShow} exact={true} />
						<Route path="/product/edit/:id" component={ProductEdit} />
						<Route path="/user/register" component={Register} exact />
						<Route path="/user/orders" component={OrderHistory} exact />
						<Route
							path="/user/login"
							render={props => {
								return <Login {...props} handleLogin={this.handleLogin} />;
							}}
						/>
						<Route path="/user/addresses" component={Addresses} exact />
						<Route path="/user/addresses/add" component={AddAddress} />
						<Route path="/user/addresses/edit/:id" component={AddressEdit} />
						<Route path="/user/select/addresses" component={SelectAddress} />
						<Route
							path="/user/logout"
							render={props => {
								return <Logout {...props} handleLogout={this.handleLogout} />;
							}}
						/>
						<Route path="/user/cart" component={Carts} />
						<Route path="/user/monthlycart" component={MonthlyCarts} />
						<Route
							path="/products/user/reviews/:id"
							component={ReviewAdd}
							exact
						/>
						<Route path="/help" component={Help} exact />
						<Route path="/home" component={Home} exact />
						<Route path="/" component={Home} exact />
						<Route component={Notfound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
