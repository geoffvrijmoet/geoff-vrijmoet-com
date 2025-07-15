import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Invalid/Missing environment variable: MONGODB_URI");
}

/**
 * Global is used here to maintain a cached connection across hot reloads in development.
 * This prevents exhausting your database connections.
 */
const globalWithMongo = global as typeof global & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let cached = globalWithMongo._mongoClientPromise;

if (!cached) {
  const client = new MongoClient(uri);
  cached = client.connect();
  globalWithMongo._mongoClientPromise = cached;
}

export const clientPromise = cached; 