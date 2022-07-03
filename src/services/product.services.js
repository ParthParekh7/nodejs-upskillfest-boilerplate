import { productModel } from '../models';
import { productSchema } from '../utils/validationSchema';

const saveProduct = async (product) => {
	const { error } = productSchema.validate(product);
	if (error) {
		return { status: 400, message: error.message };
	}
	const data = new productModel(product);
	await data.save();
	return { status: 200, message: 'Product Added.' };
};

const getProducts = async () => {
	const result = await productModel.find({ isDeleted: false, isVerified: true }).select('-isDeleted');
	const totalCount = await productModel.find().countDocuments();
	return { result, totalCount };
};

const updateProduct = async (id, product) => {
	const { error } = productSchema.validate(product);
	if (error) {
		return { status: 400, message: error.message };
	}
	const result = await productModel.findByIdAndUpdate({ _id: id }, product, { new: true });
	if (!result) {
		return { status: 404, message: 'Product not found.' };
	}
	return { status: 200, message: 'Product Updated.' };
};

const deleteProduct = async (id) => {
	const result = await productModel.findByIdAndDelete(id);
	if (!result) {
		return { status: 404, message: 'Product not found.' };
	}
	return { status: 200, message: 'Product Deleted.' };
};

export default { saveProduct, getProducts, updateProduct, deleteProduct };
