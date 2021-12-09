import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Wishlist from "../../models/Wishlist";
import connectDb from "../../utils/connectDb";

connectDb();

const { ObjectId } = mongoose.Types;

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method}  not allowed`);
            break;
    }
};

async function handleGetRequest(req, res) {

    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token");
    }
   
    try {
        //verify the json web token
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
       
        const wishlist = await Wishlist.findOne({ user: userId }).populate({
            path: "products.product",
            model: "Product"
        });
        res.status(200).json(wishlist.products);
    } catch (error) {
        console.error(error);
        //Invalid token
        res.status(403).send("Please login again");
    }
}
async function handlePutRequest(req, res){
    const  { quantity, productId } = req.body;
    if( !("authorization" in req.headers) ){
        return res.status(401).send("No authorization token");
    }
    try {
        //verify the token
        const { userId } = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
       
        const wishlist = await Wishlist.findOne({ user: userId });
      
        const productExistsInwishlist = wishlist.products.some(doc => ObjectId(productId).equals(doc.product));
     
        if(productExistsInwishlist){
        
            await Wishlist.findOneAndUpdate(
                {_id: Wishlist._id, "products.product": productId},
                { $inc: {"products.$.quantity": quantity }}
            );
        }
        else {
           
            const newProduct = { quantity, product: productId };
            await Wishlist.findOneAndUpdate(
                {_id: wishlist._id},
                {$addToSet: { products: newProduct }}
            );
        }
        res.status(200).send("Wishlist updated");
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}

async function handleDeleteRequest(req, res){
    const {productId} = req.query;
    if(!("authorization" in req.headers)){
        return res.status(401).send("No authorization token");
    }
    try {
     
        const {userId} = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        const uppdatedWishlist = await Wishlist.findOneAndUpdate(
            {user: userId},
            { $pull: { products: { product: productId } } },
            { new: true }
        ).populate({
            path: "products.product",
            model: "Product"
        });
        res.status(200).json(uppdatedWishlist.products);
    } catch (error) {
        console.error(error);
        res.status(403).send("Please log in again");
    }
}