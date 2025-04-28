import mongoose from 'mongoose';

// Cache the database connection
let cachedConnection: typeof mongoose | null = null;

/**
 * Connect to MongoDB
 * This function implements connection pooling to reuse connections
 * across serverless function invocations
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // If we already have a connection, return it
  if (cachedConnection) {
    return cachedConnection;
  }

  // Get the MongoDB URI from environment variables
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    // Set mongoose options
    const options: mongoose.ConnectOptions = {
      // These options help with connection stability
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Connect to MongoDB
    const connection = await mongoose.connect(MONGODB_URI, options);
    
    // Cache the connection
    cachedConnection = connection;
    
    console.log('Connected to MongoDB');
    
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

/**
 * Disconnect from MongoDB
 * Useful for testing and graceful shutdowns
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('Disconnected from MongoDB');
  }
}
