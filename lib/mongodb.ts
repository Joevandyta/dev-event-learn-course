import mongoose, { Mongoose } from "mongoose";

/**
 * Interface representing the cached Mongoose connection object.
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Declare global namespace to extend globalThis with mongoose cache property.
 * This prevents TypeScript errors when attaching custom properties to `global`.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using Mongoose and caches the connection.
 * @returns {Promise<Mongoose>} The active Mongoose connection instance.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is not already in progress, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the pending connection promise and store the resolved connection
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset promise cache on connection error to allow re-attempts
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
