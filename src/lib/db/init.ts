import { connectToDatabase } from './connection';

/**
 * Initialize the database connection
 * This function should be called when the app starts
 */
export async function initDatabase(): Promise<void> {
  try {
    await connectToDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    // In a production environment, you might want to exit the process
    // process.exit(1);
  }
}
