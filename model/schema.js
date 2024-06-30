const mongoose = require("mongoose");

// ! User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
  civil: { type: String, required: true, trim: true },
  location: [
    {
      country: { type: String, required: true, trim: true },
      region: { type: String, required: true, trim: true },
      district: { type: String, required: true, trim: true },
      municipality: { type: String, required: true, trim: true },
      barangay: { type: String, required: true, trim: true },
      zone: { type: Number, required: true, trim: true },
      zip: { type: Number, required: true, trim: true },
    },
  ],
  dateOfBirth: {
    year: { type: Number, required: true, trim: true },
    month: { type: String, required: true, trim: true },
    day: { type: Number, required: true, trim: true },
  },
  gender: { type: String, required: true, trim: true },
  mobileNumber: { type: Number, required: true },
  email: { type: String, required: true, trim: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
});

// ! item schema
const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  barcode: { type: String, required: true },
  description: { type: String, default: undefined },
  price: { type: Number, required: true },
  category: { type: String, default: undefined },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  size: {
    mass: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
  },
  quantity: { type: Number, default: 0 },
  minimum: { type: Number, default: 100 },
  maximum: { type: Number, default: 0 },
  seller: { type: String, required: true },
});

module.exports = { userSchema, itemSchema };
