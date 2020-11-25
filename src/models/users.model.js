const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  street: { type: String },
  number: { type: String },
  neighborhood: { type: String },
  complement: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipcode: { type: String },
});

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4(),
    },
    name: String,
    dateOfBirth: Date,
    docType: String,
    docNumber: String,
    email: String,
    status: String,
    password: String,
    address: [AddressSchema],
  },
  {
    timestamps: {},
  }
);

module.exports = new mongoose.model("User", UserSchema);
