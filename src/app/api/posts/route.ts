import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, titleEn, excerpt, excerptEn, content, contentEn, image, category, categoryEn, author } = body

    const post = await db.post.create({
      data: {
        title,
        titleEn,
        excerpt,
        excerptEn,
        content,
        contentEn,
        image,
        category,
        categoryEn,
        author: author || 'Flujo TV Team'
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
