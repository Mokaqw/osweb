const mongoose = require('mongoose');
 
const { String, Number } = mongoose.Schema.Types;
 
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  school_of: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exampleUrl: {
    type: String,
    required: true
  },
  uploadurl: {
    type: String,
    required: true,
  },
});
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);