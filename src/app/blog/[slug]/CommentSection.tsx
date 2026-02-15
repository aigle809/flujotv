'use client'

import { useState } from 'react'
import { Send, Loader2, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface Comment {
  id: string
  name: string
  email: string
  content: string
  createdAt: Date
}

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export default function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'El comentario es requerido'
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'El comentario debe tener al menos 10 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        const newComment = await response.json()
        setComments(prev => [newComment, ...prev])
        setFormData({ name: '', email: '', content: '' })
        toast.success('Comentario enviado exitosamente')
      } else {
        toast.error('Error al enviar el comentario')
      }
    } catch {
      toast.error('Error al enviar el comentario')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#111111] rounded-2xl border border-[#2A2A2A] p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Comentarios ({comments.length})
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h3 className="text-lg font-medium text-white">Deja un comentario</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`bg-[#1A1A1A] border-[#2A2A2A] text-white ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Tu nombre"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-300">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`bg-[#1A1A1A] border-[#2A2A2A] text-white ${errors.email ? 'border-red-500' : ''}`}
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>
        
        <div>
          <Label htmlFor="content" className="text-gray-300">Comentario *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
            className={`bg-[#1A1A1A] border-[#2A2A2A] text-white min-h-[100px] ${errors.content ? 'border-red-500' : ''}`}
            placeholder="Escribe tu comentario..."
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-black font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Enviar Comentario
            </>
          )}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay comentarios aún. Sé el primero en comentar.
          </p>
        ) : (
          comments.map(comment => (
            <div 
              key={comment.id} 
              className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{comment.name}</span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
