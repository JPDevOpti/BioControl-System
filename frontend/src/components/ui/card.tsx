import { cn } from '@/lib/cn'

interface CardProps {
  title?: string
  description?: string
  footer?: React.ReactNode
  className?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function Card({ title, description, footer, className, children, actions }: CardProps) {
  const hasHeader = title || description || actions
  
  return (
    <div className={cn('surface-card flex flex-col', className)}>
      {hasHeader && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-100/80 p-6 pb-4">
          <div className="space-y-1.5">
            {title ? <h3 className="text-lg font-semibold text-slate-900">{title}</h3> : null}
            {description ? <p className="text-sm text-slate-600">{description}</p> : null}
          </div>
          {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
      )}
      <div className={cn('flex flex-1 flex-col', hasHeader ? 'p-6 pt-0' : 'p-0')}>{children}</div>
      {footer ? <div className="border-t border-slate-200 p-6 pt-4">{footer}</div> : null}
    </div>
  )
}

// Subcomponentes adicionales
export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('text-lg font-semibold leading-none tracking-tight text-slate-900', className)}>{children}</h3>
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('text-sm text-slate-600', className)}>{children}</p>
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function CardFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('flex items-center border-t border-slate-200 p-6 pt-4', className)}>{children}</div>
}

