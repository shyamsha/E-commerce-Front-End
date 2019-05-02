import React from "react";
import axios from "../../config/config";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
//import tileData from "./tileData";

const tileData = [
	{
		img: "/static/images/grid-list/breakfast.jpg",
		title: "Breakfast",
		author: "jill111",
		cols: 2,
		featured: true
	},
	{
		img: "/static/images/grid-list/burgers.jpg",
		title: "Tasty burger",
		author: "director90"
	},
	{
		img: "/static/images/grid-list/camera.jpg",
		title: "Camera",
		author: "Danson67"
	},
	{
		img: "/static/images/grid-list/morning.jpg",
		title: "Morning",
		author: "fancycrave1",
		featured: true
	},
	{
		img: "/static/images/grid-list/hats.jpg",
		title: "Hats",
		author: "Hans"
	},
	{
		img: "/static/images/grid-list/honey.jpg",
		title: "Honey",
		author: "fancycravel"
	},
	{
		img: "/static/images/grid-list/vegetables.jpg",
		title: "Vegetables",
		author: "jill111",
		cols: 2
	},
	{
		img: "/static/images/grid-list/plant.jpg",
		title: "Water plant",
		author: "BkrmadtyaKarki"
	},
	{
		img: "/static/images/grid-list/mushroom.jpg",
		title: "Mushrooms",
		author: "PublicDomainPictures"
	},
	{
		img: "/static/images/grid-list/olive.jpg",
		title: "Olive oil",
		author: "congerdesign"
	},
	{
		img: "/static/images/grid-list/star.jpg",
		title: "Sea star",
		cols: 2,
		author: "821292"
	},
	{
		img: "/static/images/grid-list/bike.jpg",
		title: "Bike",
		author: "danfador"
	}
];
const styles = theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		// justifyContent: "space-around",

		overflow: "hidden",
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		flexWrap: "nowrap",
		// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
		transform: "translateZ(0)"
	},
	title: {
		color: theme.palette.primary.dark
	},
	titleBar: {
		background:
			"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
	}
});

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
		const { classes } = this.props;
		return (
			<div>
				<center>
					<Typography
						style={{
							color: "rgb(9, 63, 117)",
							fontSize: "30px",
							marginTop: "50px"
						}}
					>
						site home page under construction <br />
						sorry for the inconvenience <br />
						we will get back soon
					</Typography>
				</center>

				{/* <div className={classes.root}>
					<GridList className={classes.gridList} cols={2.5}>
						{tileData.map(tile => (
							<GridListTile key={tile.img}>
								<img src={tile.img} alt={tile.title} />
								<GridListTileBar
									title={tile.title}
									classes={{
										root: classes.titleBar,
										title: classes.title
									}}
									actionIcon={
										<IconButton>
											<StarBorderIcon className={classes.title} />
										</IconButton>
									}
								/>
							</GridListTile>
						))}
					</GridList>
				</div> */}
			</div>
		);
	}
}
Home.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
