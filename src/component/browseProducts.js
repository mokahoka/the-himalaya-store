// Browse products module

import React from 'react';
import { getProducts } from '../utils/api.js';
import ProductCard from './productCard.js';
import Cart from './cart.js';

class BrowseProducts extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			products: [],
		};
	}

	fetchProducts = async () => {
		const products = await getProducts();
		this.setState(() => ({
			products,
		}))
	}

	componentDidMount(){	
		this.fetchProducts();
	}

	render(){
		return (
			<div>
				<div className="browse-products">
					<div className="browse-product-header">
						<h1> Browse Products</h1>
					</div>
					<div className="browse-product-body">
						{/* The body for browse products */}
						{ this.state.products && this.state.products.map((product,i) => (
							<ProductCard product={product} key={i}/>
							)) }
					</div>
				</div>
				<Cart history={this.props.history}/>
			</div>
			)
	}
}

export default BrowseProducts;