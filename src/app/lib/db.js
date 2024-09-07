import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://trushitgadhavi99133:wrv7hc53gCoNLyPK@cluster.8mydilr.mongodb.net/hisabichopdo?retryWrites=true&w=majority&appName=cluster";
console.log(MONGODB_URI);

if (!MONGODB_URI) {
  console.log(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
