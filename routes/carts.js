const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Recive a post request to ad an item to a cart

router.post('/cart/products', async (req, res) => {
	// Figure out the cart!
	let cart;
	if (!req.session.cartId) {
		// We dont hava a cart, we need to create one,
		// and store the cart id on the req.session.cartId property

		cart = await cartsRepo.create({ items: [] });

		req.session.cartId = cart.id;
	} else {
		// We have a cart! Lets get it from the repositry
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	console.log(cart);
	// Either increment quantity for existing product
	// OR add new product to items array

	res.send('Product added to cart');
});
// Recive a GET request to show all items in a cart

// Receive a post request to delete on an item from a cart

module.exports = router;
