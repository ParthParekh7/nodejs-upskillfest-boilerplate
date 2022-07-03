import { productService } from '../services';
import AWS from 'aws-sdk';
const getProducts = async (req, res) => {
	try {
		const { result, totalCount } = await productService.getProducts();
		console.log(result);
		res.send({
			success: true,
			data: result,
			totalCount: totalCount,
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

const addProduct = async (req, res) => {
	try {
		if (!req.file) {
			throw { message: 'File not provided' };
		}
		// const s3 = new AWS.S3({
		// 	accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
		// 	secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
		// });
		// const params = {
		// 	Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
		// 	Key: req.file.originalname, // Name of the image
		// 	Body: req.file.buffer, // Body which will contain the image in buffer format
		// 	ACL: 'public-read-write', // defining the permissions to get the public link
		// 	ContentType: 'image/jpeg', // Necessary to define the image content-type to view the photo in the browser with the link
		// };
		// const uploadedImage = await s3.upload(params).promise();
		const uploadedImage = { Location :'1.jpg'}

		const result = await productService.saveProduct({ ...req.body, productImage: uploadedImage.Location });
		switch (result.status) {
			case 400:
				res.status(400).send({ success: false, message: result.message });
				break;
			case 404:
				res.status(404).send({ success: false, message: result.message });
				break;
			default:
				res.status(200).send({ success: true, message: result.message });
				break;
		}
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).send({
				success: false,
				message: 'Product Already Exists.',
			});
		} else {
			res.status(500).send({
				success: false,
				message: error.message,
			});
		}
	}
};

const updateProduct = async (req, res) => {
	try {
		const result = await productService.updateProduct(req.params.id, req.body);
		switch (result.status) {
			case 400:
				res.status(400).send({ success: false, message: result.message });
				break;
			case 404:
				res.status(404).send({ success: false, message: result.message });
				break;
			default:
				res.status(200).send({ success: true, message: result.message });
				break;
		}
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).send({
				success: false,
				message: 'Enter Product name Already Exists in category.',
			});
		} else {
			res.status(500).send({
				success: false,
				message: error.message,
			});
		}
	}
};

const deleteProduct = async (req, res) => {
	try {
		const result = await productService.deleteProduct(req.params.id);
		if (result.status === 404) {
			return res.status(result.status).send({ success: false, message: result.message });
		}
		res.status(200).send({ success: true, message: result.message });
	} catch (error) {
		res.status(500).send({
			success: false,
			message: error.message,
		});
	}
};

export default { getProducts, addProduct, updateProduct, deleteProduct };
