import connectDb from '../../utils/connectDb'
import Product from '../../models/Product'
connectDb()
 export default  (req, res)=> {
    (async () => {
   const products = await Product.find()
  res.status(200).json(products)
})();
};
