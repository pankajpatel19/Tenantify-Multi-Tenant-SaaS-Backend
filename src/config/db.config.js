import mongoose from "mongoose";

async function connectDB(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
export default connectDB;
