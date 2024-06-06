import mongoose from "mongoose";

const connectDB = (mongoURL, dbName) => {
  mongoose
    .connect(mongoURL, { dbName: dbName })
    .then(() => console.log("Connection to MongoDB succeed !"))
    .catch((error) => console.log(error));
  mongoose.set("bufferCommands", false);
};

export default connectDB;
