import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// This endpoint creates the database tables
export async function GET() {
  try {
    // Create Post table
    await db.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Post" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" TEXT NOT NULL,
        "titleEn" TEXT,
        "excerpt" TEXT NOT NULL,
        "excerptEn" TEXT,
        "content" TEXT NOT NULL,
        "contentEn" TEXT,
        "image" TEXT,
        "category" TEXT NOT NULL,
        "categoryEn" TEXT,
        "author" TEXT NOT NULL,
        "published" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create Comment table
    await db.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Comment" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "postId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `

    // Create ContactMessage table
    await db.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    return NextResponse.json({ 
      success: true, 
      message: 'Tables created successfully!' 
    })
  } catch (error) {
    console.error('Error creating tables:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create tables',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
