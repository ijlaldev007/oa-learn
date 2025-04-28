import { NextResponse } from 'next/server';

/**
 * Health check endpoint to verify API is functioning
 * @returns JSON response with status and timestamp
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.APP_VERSION || '0.1.0',
  });
}
