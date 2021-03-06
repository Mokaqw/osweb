import mongoose from "mongoose";

const { ObjectId,} = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
    user: {
        type: ObjectId, //ObjectId is sufficient. We do not need to write name, email etc for the user.
        ref: "User"
    },
    products: [
        {//An array of products is attached to every cart.
            product: {
                type: ObjectId,
                ref: "Product"
            }
        }
    ]
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);