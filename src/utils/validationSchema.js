import Joi from 'joi';

export const productSchema = Joi.object({
	name: Joi.string().min(2).max(50).required(),
	price: Joi.number().min(0).required(),
	qty: Joi.number().integer().min(0).required(),
	category: Joi.string().valid('Electronics', 'Accessories', 'Kitchen'),
	isVerified: Joi.boolean().default(false),
	productImage: Joi.string().required(),
});
