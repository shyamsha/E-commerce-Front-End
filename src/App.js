import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Categories from "./comoponents/categories";
import AddCategory from "./comoponents/CategoriesNew";
import Product from "./comoponents/products/products";
import ProductNew from "./comoponents/products/Productnew";
import CategoryShow from "./comoponents/CateegoryShow";
import CategoryEdit from "./comoponents/CategoryEdit";

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
					<h1>welcome to Amazon</h1>
					<Link to="/categories"> Categories</Link>
					{"|"}
					<Link to="/products">Products</Link>
					{"|"}

					<Switch>
						<Route path="/categories" component={Categories} exact={true} />
						<Route path="/categories/add" component={AddCategory} />
						<Route
							path="/categories/:id"
							component={CategoryShow}
							exact={true}
						/>
						<Route path="/categories/edit/:id" component={CategoryEdit} />
						<Route path="/products" component={Product} exact={true} />
						<Route path="/products/add" component={ProductNew} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
