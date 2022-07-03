import { Schema, model } from 'mongoose';

const productSchema = new Schema(
	{
		name: { type: String, index: true },
		price: { type: Number, index: true },
		qty: { type: Number, index: true },
		category: {
			type: String,
			index: true,
			enum: ['Electronics', 'Accessories', 'Kitchen'],
		},
		productImage: { type: String },
		isDeleted: { type: Boolean, default: false, index: true },
		isVerified: { type: Boolean, default: false, index: true },
	},
	{ timestamps: true, versionKey: false },
);
productSchema.index({ name: 1, category: 1 }, { unique: true });

export const Product = new model('product', productSchema);
