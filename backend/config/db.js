import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://arafet:123@cluster0.mzyfwzl.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log(`MongoDB Connect: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
