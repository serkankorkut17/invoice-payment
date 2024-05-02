import mongoose from 'mongoose';

const MONGODB_URL =
  'your_mongodb_link';

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection failed');
  }
};

export default connectDatabase;
