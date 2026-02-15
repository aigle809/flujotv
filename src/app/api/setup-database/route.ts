import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection by trying to query posts
    await db.$queryRaw`SELECT 1 as test`
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully!' 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database not connected. Make sure Vercel Postgres is linked to your project.',
      details: String(error)
    }, { status: 500 })
  }
}
