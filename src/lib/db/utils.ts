import mongoose from 'mongoose';
import { connectToDatabase } from './connection';

/**
 * Wrapper function to handle database operations with proper connection management
 * @param operation Function that performs the database operation
 * @returns Result of the database operation
 */
export async function withDatabase<T>(operation: () => Promise<T>): Promise<T> {
  try {
    // Ensure we're connected to the database
    await connectToDatabase();
    
    // Execute the operation
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}

/**
 * Check if a MongoDB ObjectId is valid
 * @param id The ID to check
 * @returns Boolean indicating if the ID is valid
 */
export function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Convert a string to a MongoDB ObjectId
 * @param id The ID string to convert
 * @returns MongoDB ObjectId
 */
export function toObjectId(id: string): mongoose.Types.ObjectId {
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }
  return new mongoose.Types.ObjectId(id);
}
