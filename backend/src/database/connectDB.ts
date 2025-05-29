import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log("uri", uri)
               await mongoose.connect(uri!, {
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        });

        console.log('mongoDB connected.');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;