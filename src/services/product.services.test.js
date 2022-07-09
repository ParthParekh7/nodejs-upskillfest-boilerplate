import { productService } from '../services';
describe('Prdocut Test cases', () => {
	test('add product to database success',async() => {
		const result = await productService.saveProduct({ name: 'product-1', price: 100, qty: 500 });
		expect(result).toBe({});
	});
});
