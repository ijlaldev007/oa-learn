import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

/**
 * Health check endpoint to verify API is functioning
 * @returns JSON response with status and timestamp
 */
export async function GET() {
  try {
    // Check database connection
    const dbStatus = await checkDatabaseConnection();

    // Return health status
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
      version: process.env.APP_VERSION || '0.1.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Check database connection
 * @returns Object with database connection status
 */
async function checkDatabaseConnection() {
  try {
    // Try to connect to the database
    const startTime = Date.now();
    await connectToDatabase();
    const endTime = Date.now();

    // Calculate connection time
    const connectionTime = endTime - startTime;

    return {
      status: 'connected',
      connectionTime: `${connectionTime}ms`,
    };
  } catch (error) {
    console.error('Database connection failed:', error);

    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}
