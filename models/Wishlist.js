import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const WishlistSchema = new mongoose.Schema({
    user: {
        type: ObjectId, //ObjectId is sufficient. We do not need to write name, email etc for the user.
        ref: "User"
    },
    wishlist: [
        {//An array of products is attached to wishlist.
            product: {
                type: ObjectId,
                ref: "Product"
            }
        }
    ]
});

export default mongoose.models.Wishlist || mongoose.model("Wishlist", WishlistSchema);