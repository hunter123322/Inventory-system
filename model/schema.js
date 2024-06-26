const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  civil: {
    type: String,
    required: true,
    trim: true,
  },
  location: [
    {
      country: {
        type: String,
        required: true,
        trim: true,
      },
      region: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      municipality: {
        type: String,
        required: true,
        trim: true,
      },
      barangay: {
        type: String,
        required: true,
        trim: true,
      },
      zone: {
        type: Number,
        required: true,
        trim: true,
      },
      zip: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  ],
  dateOfBirt: {
    year: {
      type: Number,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      trim: true,
    },
    day: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const item = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    default: undefined,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: undefined,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    mass: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  quantity: {
    type: Number,
    default: 0,
  },
  minimum: {
    type: Number,
    default: 100,
  },
  maximum: {
    type: Number,
    default: 0,
  },
});
module.exports = { user, item };
