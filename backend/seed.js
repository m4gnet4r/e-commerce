const dotenv =require("dotenv");
const mongoose =require( "mongoose");
const Product =require("./models/Product");
const generateFakeProducts = require("./data/fakeProducts");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connencted"))
.catch(err => console.log(err));

const seedProducts = async()=>{
    try{
        await Product.deleteMany();

        const products = generateFakeProducts();
        await Product.insertMany(products);
        console.log("Fake products seeded successfully");
        procees.exit(1);
    }catch(err){
        console.error("seeding failed");
        console.log(err);
        process.exit(1);
    }
};
seedProducts();