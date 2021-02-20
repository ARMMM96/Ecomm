const express = require('express');

const router = express.Router();

// Recive a post request to ad an item to a cart

router.post('/cart/products', (req, res) => {
	console.log(req.body.productId);

	res.send('Product added to cart');
});
// Recive a GET request to show all items in a cart

// Receive a post request to delete on an item from a cart

module.exports = router;
