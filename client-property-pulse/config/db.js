import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery');

  // If database is already connected, don't connect again
  if (connected) {
    console.log('Mongodb is connected.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
