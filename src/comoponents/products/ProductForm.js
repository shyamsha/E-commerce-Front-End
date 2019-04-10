import React, { Component } from "react";
import axios from "../../config/config";
class ProductForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name ? props.name : "",
			description: props.description ? props.description : "",
			price: props.price ? props.price : "",
			stock: props.stock ? props.stock : "",
			isCod: props.isCod ? props.isCod : "",
			category: props.category ? props.category : "",
			imageUrl: props.imageUrl ? props.imageUrl : null,
			categories: []
		};
	}
	componentDidMount() {
		axios
			.get("/categories")
			.then(response => {
				const categories = response.data;
				this.setState(() => ({ categories: categories }));
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleName = e => {
		e.persist();
		this.setState(() => ({ name: e.target.value }));
	};
	handleDescription = e => {
		e.persist();
		this.setState(() => ({ description: e.target.value }));
	};
	handlePrice = e => {
		e.persist();
		if (e.target.value > 0) {
			this.setState(() => ({ price: e.target.value }));
		}
	};
	handleStock = e => {
		e.persist();
		if (e.target.value >= 0) {
			this.setState(() => ({ stock: e.target.value }));
		}
	};
	handleIsCod = e => {
		e.persist();
		console.log(e.target.value);
		this.setState(() => ({ isCod: e.target.value }));
	};
	handleCategory = e => {
		e.persist();
		const category = e.target.value;

		this.setState(() => ({ category: category }));
	};
	handleFile = e => {
		e.persist();
		const img = e.target.files[0];
		this.setState(() => ({ imageUrl: img }));
	};
	handleSubmit = e => {
		e.preventDefault();
		//when we send the images with text  req.file has body send it img also text also like this way

		const data = new FormData();
		data.append("name", this.state.name);
		data.append("description", this.state.description);
		data.append("price", this.state.price);
		data.append("stock", this.state.stock);
		data.append("isCod", this.state.isCod);
		data.append("category", this.state.category);
		data.append("imageUrl", this.state.imageUrl);
		this.props.handleSubmit(data);
		this.setState(() => ({
			name: "",
			description: "",
			price: "",
			stock: "",
			isCod: "",
			category: ""
		}));
	};
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name Of Product:
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleName}
						/>
						<br />
					</label>
					<label>
						Descprition:
						<textarea
							name="description"
							value={this.state.description}
							onChange={this.handleDescription}
							cols="25"
							rows="5"
						>
							description
						</textarea>
						<br />
					</label>
					<label>
						Price:
						<input
							type="number"
							name="price"
							value={this.state.price}
							onChange={this.handlePrice}
						/>
						<br />
					</label>
					<label>
						Stock:
						<input
							type="number"
							name="stock"
							value={this.state.stock}
							onChange={this.handleStock}
						/>
						<br />
					</label>
					<label>
						Cash On Delivery:
						<input
							type="radio"
							name="isCod"
							value="true"
							checked={this.state.isCod === "true"} //this anthor way of handling radio buttons
							onChange={this.handleIsCod}
							//defaultChecked
						/>
						True
						<input
							type="radio"
							name="isCod"
							value="false"
							checked={this.state.isCod === "false"}
							onChange={this.handleIsCod}
						/>
						False
						<br />
					</label>
					Select Category:
					<select name="categories" onChange={this.handleCategory}>
						<option value="select">select</option>
						{this.state.categories.map(cate => {
							return (
								<option value={cate._id} key={cate._id}>
									{cate.name}
								</option>
							);
						})}
					</select>
					<br />
					<label>
						<input
							type="file"
							name="imageUrl"
							accept="image/*"
							encType="multipart/form-data"
							value={this.state.file}
							onChange={this.handleFile}
						/>
					</label>
					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default ProductForm;
