const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Order"
		},
		parcelId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "Parcel"
		},
		long: {
			type: Schema.Types.Number,
			required: true
		},
		lat: {
			type: Schema.Types.String,
			required: true
		},
		threshold: {
			type: Schema.Types.Number
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Log", LogSchema);
