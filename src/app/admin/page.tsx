'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit, Plus, ArrowLeft, LogOut, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  titleEn: string | null
  excerpt: string
  excerptEn: string | null
  content: string
  contentEn: string | null
  image: string | null
  category: string
  categoryEn: string | null
  author: string
  published: boolean
  createdAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form state
  const [title, setTitle] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [excerptEn, setExcerptEn] = useState('')
  const [content, setContent] = useState('')
  const [contentEn, setContentEn] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('Noticias')
  const [categoryEn, setCategoryEn] = useState('News')
  const [author, setAuthor] = useState('Flujo TV Team')

  const ADMIN_PASSWORD = 'flujotv2026'

  const fetchPosts = async () => {
    try {
      setError('')
      const res = await fetch('/api/posts')
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Could not load posts. Database may not be available.')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchPosts()
    } else {
      setError('Wrong password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPosts([])
    setPassword('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const url = isEditing ? `/api/posts/${isEditing}` : '/api/posts'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleEn: titleEn || null,
          excerpt,
          excerptEn: excerptEn || null,
          content,
          contentEn: contentEn || null,
          image: image || null,
          category,
          categoryEn: categoryEn || null,
          author
        })
      })

      if (res.ok) {
        resetForm()
        fetchPosts()
        alert(isEditing ? 'Post updated!' : 'Post created!')
      } else {
        setError('Error saving post. Database may not be available.')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error saving post. Please try again.')
    }

    setIsLoading(false)
  }

  const handleEdit = (post: Post) => {
    setIsEditing(post.id)
    setTitle(post.title)
    setTitleEn(post.titleEn || '')
    setExcerpt(post.excerpt)
    setExcerptEn(post.excerptEn || '')
    setContent(post.content)
    setContentEn(post.contentEn || '')
    setImage(post.image || '')
    setCategory(post.category)
    setCategoryEn(post.categoryEn || '')
    setAuthor(post.author)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchPosts()
        alert('Post deleted!')
      } else {
        setError('Error deleting post')
      }
    } catch (err) {
      console.error('Error deleting:', err)
      setError('Error deleting post')
    }
  }

  const resetForm = () => {
    setIsEditing(null)
    setTitle('')
    setTitleEn('')
    setExcerpt('')
    setExcerptEn('')
    setContent('')
    setContentEn('')
    setImage('')
    setCategory('Noticias')
    setCategoryEn('News')
    setAuthor('Flujo TV Team')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] p-4">
        <Card className="w-full max-w-md bg-[#1A1A1A] border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-[#FF6B35]">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full bg-[#FF6B35] hover:bg-[#E85A25]">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#FF6B35]">
              Blog Admin
            </h1>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-[#1A1A1A] border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                {isEditing ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {isEditing ? 'Edit Post' : 'New Post'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Title (Spanish)</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Título en español"
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Title (English)</label>
                    <Input
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="Title in English"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Excerpt (Spanish)</label>
                    <Input
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Resumen corto"
                      required
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Excerpt (English)</label>
                    <Input
                      value={excerptEn}
                      onChange={(e) => setExcerptEn(e.target.value)}
                      placeholder="Short excerpt"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Content (Spanish)</label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Contenido del artículo..."
                    required
                    rows={6}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Content (English)</label>
                  <Textarea
                    value={contentEn}
                    onChange={(e) => setContentEn(e.target.value)}
                    placeholder="Article content..."
                    rows={6}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Category (Spanish)</label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Noticias"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Category (English)</label>
                    <Input
                      value={categoryEn}
                      onChange={(e) => setCategoryEn(e.target.value)}
                      placeholder="News"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Author</label>
                    <Input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Flujo TV Team"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-[#FF6B35] hover:bg-[#E85A25]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : isEditing ? 'Update Post' : 'Create Post'}
                  </Button>
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={resetForm}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Card className="bg-[#1A1A1A] border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                All Posts ({posts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {posts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No posts yet</p>
                ) : (
                  posts.map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{post.title}</h3>
                          {post.titleEn && (
                            <p className="text-sm text-gray-400">{post.titleEn}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs bg-[#FF6B35]/20 text-[#FF6B35]">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEdit(post)}
                            className="text-blue-400 hover:bg-blue-400/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
