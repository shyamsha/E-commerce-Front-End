import React from "react";
import axios from "../../config/config";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: false
		};
	}
	componentDidMount() {
		axios
			.get("/products")
			.then(response => {
				this.setState(() => ({ products: response.data, loading: true }));
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				{this.state.loading && (
					<div>
						<img src="#" alt="logo" style={{ float: "left" }} /> <br />
						<p>welcome back online mall</p>
						<h1>Affordable Products</h1>
						{this.state.products.map(product => {
							if (product.price <= 500) {
								return (
									<div key={product._id}>
										<h3>{product.name}</h3>
										<img
											src={product.imageUrl}
											alt="productImg"
											width="100"
											hight="100"
										/>
									</div>
								);
							} else {
								return "";
							}
						})}
					</div>
				)}
			</div>
		);
	}
}

export default Home;
