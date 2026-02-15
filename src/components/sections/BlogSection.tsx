'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, X, ArrowLeft, Send, Loader2 } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface Post {
  id: string
  title: string
  titleEn: string | null
  excerpt: string
  excerptEn: string | null
  content: string
  contentEn: string | null
  category: string
  categoryEn: string | null
  author: string
  createdAt: string
  comments: Comment[]
}

interface Comment {
  id: string
  name: string
  email: string
  content: string
  createdAt: string
}

export default function BlogSection() {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) {
        // Try to seed the database
        await fetch('/api/seed')
        const retryResponse = await fetch('/api/posts')
        if (retryResponse.ok) {
          const data = await retryResponse.json()
          setPosts(data)
        }
      } else {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTitle = (post: Post) => language === 'es' ? post.title : (post.titleEn || post.title)
  const getExcerpt = (post: Post) => language === 'es' ? post.excerpt : (post.excerptEn || post.excerpt)
  const getContent = (post: Post) => language === 'es' ? post.content : (post.contentEn || post.content)
  const getCategory = (post: Post) => language === 'es' ? post.category : (post.categoryEn || post.category)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!commentForm.name.trim()) {
      newErrors.name = t('validation.nameRequired')
    }
    
    if (!commentForm.email.trim()) {
      newErrors.email = t('validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commentForm.email)) {
      newErrors.email = t('validation.emailInvalid')
    }
    
    if (!commentForm.content.trim()) {
      newErrors.content = t('validation.commentRequired')
    } else if (commentForm.content.trim().length < 10) {
      newErrors.content = t('validation.commentMin')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm() || !selectedPost) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentForm)
      })
      
      if (response.ok) {
        const newComment = await response.json()
        setSelectedPost(prev => prev ? {
          ...prev,
          comments: [newComment, ...prev.comments]
        } : prev)
        setCommentForm({ name: '', email: '', content: '' })
        toast.success(t('validation.success'))
      } else {
        toast.error(t('validation.error'))
      }
    } catch (error) {
      toast.error(t('validation.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4A418] mx-auto" />
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 pattern-mayan opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            <span className="text-gradient-gold">{t('blog.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="bg-[#141414] border-[#2A2A2A] overflow-hidden h-full flex flex-col card-hover cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-[#D4A418]/20 text-[#D4A418] rounded-full">
                      {getCategory(post)}
                    </span>
                    <span className="text-gray-500 text-xs">{post.comments.length} {t('blog.comments')}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                    {getTitle(post)}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {getExcerpt(post)}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.createdAt)}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#141414] border border-[#2A2A2A] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-[#141414] border-b border-[#2A2A2A] p-4 flex items-center justify-between z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('blog.backToList')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="p-6">
                    {/* Article */}
                    <article>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-[#D4A418]/20 text-[#D4A418] rounded-full">
                          {getCategory(selectedPost)}
                        </span>
                      </div>
                      
                      <h1 className="text-2xl font-bold text-white mb-4">
                        {getTitle(selectedPost)}
                      </h1>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {t('blog.by')} {selectedPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedPost.createdAt)}
                        </div>
                      </div>
                      
                      <div 
                        className="prose prose-invert prose-sm max-w-none mb-8"
                        dangerouslySetInnerHTML={{ __html: getContent(selectedPost) }}
                      />
                    </article>

                    {/* Comments Section */}
                    <div className="border-t border-[#2A2A2A] pt-8">
                      <h3 className="text-xl font-semibold text-white mb-6">
                        {t('blog.comments')} ({selectedPost.comments.length})
                      </h3>

                      {/* Comment Form */}
                      <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
                        <h4 className="text-lg font-medium text-white">{t('blog.leaveComment')}</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-300">{t('blog.name')} *</Label>
                            <Input
                              id="name"
                              value={commentForm.name}
                              onChange={e => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                              className={`bg-[#1A1A1A] border-[#2A2A2A] text-white ${errors.name ? 'border-red-500' : ''}`}
                              placeholder={t('blog.name')}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </div>
                          
                          <div>
                            <Label htmlFor="email" className="text-gray-300">{t('blog.email')} *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={commentForm.email}
                              onChange={e => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                              className={`bg-[#1A1A1A] border-[#2A2A2A] text-white ${errors.email ? 'border-red-500' : ''}`}
                              placeholder={t('blog.email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="content" className="text-gray-300">{t('blog.comment')} *</Label>
                          <Textarea
                            id="content"
                            value={commentForm.content}
                            onChange={e => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                            className={`bg-[#1A1A1A] border-[#2A2A2A] text-white min-h-[100px] ${errors.content ? 'border-red-500' : ''}`}
                            placeholder={t('blog.comment')}
                          />
                          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        </div>
                        
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-[#D4A418] to-[#E8B91F] text-black font-semibold"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {t('blog.loading')}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              {t('blog.submit')}
                            </>
                          )}
                        </Button>
                      </form>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {selectedPost.comments.length === 0 ? (
                          <p className="text-gray-500 text-center py-8">{t('blog.noComments')}</p>
                        ) : (
                          selectedPost.comments.map(comment => (
                            <div key={comment.id} className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-white">{comment.name}</span>
                                <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{comment.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
