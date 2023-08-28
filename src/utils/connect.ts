import mongoose from "mongoose";
import config from "config";
import log from "./logger";


const connectToMongo = async () => {
    const uri = config.get<string>("mongoUri");
    try {
        await mongoose.connect(uri);
        
        log.info("Connected to MongoDB");

    } catch (error) {
        log.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

export default connectToMongo;