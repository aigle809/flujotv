'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  message?: string
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline'
  children?: React.ReactNode
}

export default function WhatsAppButton({
  message = 'Hola, me interesa conocer más sobre Flujo TV',
  className,
  size = 'default',
  variant = 'default',
  children
}: WhatsAppButtonProps) {
  const phoneNumber = '212651372731'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        'font-semibold gap-2',
        variant === 'default' && 'whatsapp-btn',
        variant === 'outline' && 'border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10',
        className
      )}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-4 h-4" />
        {children || 'WhatsApp'}
      </a>
    </Button>
  )
}
