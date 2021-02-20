module.exports = ({ products }) => {
	const renderProducts = products
		.map((products) => {
			return `
        <li> ${products.title} - ${products.price}</li>
        `;
		})
		.join('');

	return `
            <ul>
            ${renderProducts}
            </ul>
        `;
};
