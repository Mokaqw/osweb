// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb://mosscj4582:moss4582@onesummary-shard-00-00.u68g1.mongodb.net:27017,onesummary-shard-00-01.u68g1.mongodb.net:27017,onesummary-shard-00-02.u68g1.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-yqh7jx-shard-0&authSource=admin&retryWrites=true&w=majority",
    JWT_SECRET: "powquejiofqnsdvbq",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/moss4582/image/upload",
    STRIPE_SECRET_KEY: "sk_test_51K2FI4Cd1y3zx6nGl3S6Dym60NsMHAIiIsk9iDWsjsBX3ScwLDVyVGnK8Az0IiJxjReLSdrxEMmajaHFDLGlMjtX004cdIbAdx"
  }
};
