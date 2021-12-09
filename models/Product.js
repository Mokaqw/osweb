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
  uploadfile: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Unavialible",
    enum: ["Unavialible", "avialible"]
  }
 // countInStock:{
  //  type: String,
  //  required: true
 // }
});
export default mongoose.models.Product ||
 mongoose.model("Product", ProductSchema);
  //const Product = mongoose.model('Product', ProductSchema);
//module.exports = Product; 