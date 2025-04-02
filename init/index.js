const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


const intitDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"67e221c9ca28d7e886b75eb2",}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}

intitDB();  