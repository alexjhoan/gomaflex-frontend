import { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Badge } from './Badge'
import { MaterialIcon } from './MaterialIcon'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient' | 'automotive'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantStyles = {
  default: 'bg-surface-canvas border border-surface-border',
  elevated: 'bg-surface-canvas shadow-automotive-card',
  outlined: 'bg-transparent border-1.5 border-surface-border',
  gradient: 'bg-gradient-to-b from-surface-subtle to-surface-canvas border border-surface-border',
  automotive: 'bg-gradient-to-b from-surface-subtle to-surface-canvas border border-surface-border',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'hover:shadow-automotive-floating hover:-translate-y-1 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardHeader = ({ children, className, ...props }: CardSectionProps) => (
  <div className={cn('mb-4', className)} {...props}>{children}</div>
)

export const CardTitle = ({ children, className, ...props }: CardSectionProps) => (
  <h3 className={cn('font-headline-sm text-headline-sm text-text-primary uppercase tracking-tight', className)} {...props}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className, ...props }: CardSectionProps) => (
  <p className={cn('font-body-sm text-body-sm text-text-muted mt-1 leading-relaxed', className)} {...props}>
    {children}
  </p>
)

export const CardContent = ({ children, className, ...props }: CardSectionProps) => (
  <div className={cn('', className)} {...props}>{children}</div>
)

export const CardFooter = ({ children, className, ...props }: CardSectionProps) => (
  <div className={cn('mt-4 pt-4 border-t border-surface-border', className)} {...props}>{children}</div>
)

/* Image card variant for category cards */
export interface ImageCardProps {
  image: string
  alt: string
  badge?: ReactNode
  title: string
  description: string
  linkText: string
  linkHref: string
  accentColor?: 'primary' | 'success' | 'dark'
  onClick?: () => void
}

export function ImageCard({
  image,
  alt,
  badge,
  title,
  description,
  linkText,
  linkHref,
  accentColor = 'primary',
  onClick,
}: ImageCardProps) {
  const accentStyles = {
    primary: 'bg-primary-container',
    success: 'bg-fitment-success',
    dark: 'bg-inverse-surface text-surface-bright',
  }

  return (
    <Card variant="automotive" hover className="flex flex-col justify-between overflow-hidden group">
      <div>
        {badge && (
          <div className="flex items-center justify-between mb-4">
            <Badge variant={accentColor === 'success' ? 'success' : accentColor === 'dark' ? 'dark' : 'primary'} size="sm">
              {badge}
            </Badge>
            <MaterialIcon name="arrow_outward" className="text-text-muted group-hover:text-primary-container transition-colors" aria-hidden />
          </div>
        )}

        <div className="w-full h-44 flex items-center justify-center p-2 mb-4 bg-surface-canvas rounded-xl group-hover:scale-105 transition-transform duration-300">
          <img
            src={image}
            alt={alt}
            className="max-h-36 max-w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="font-headline-sm text-headline-sm text-text-primary uppercase tracking-tight mb-1">
            {title}
          </h3>
          <p className="font-body-sm text-body-sm text-text-muted mb-3 line-clamp-2">
            {description}
          </p>
          <div className={`w-12 h-1 rounded mb-4 group-hover:w-20 transition-all duration-300 ${accentStyles[accentColor]}`} />
        </div>
      </div>

      <a
        href={linkHref}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault()
            onClick()
          }
        }}
        className="w-full py-2.5 px-4 rounded-lg bg-surface-subtle hover:bg-primary-container hover:text-on-primary text-text-primary font-label-md text-label-md uppercase tracking-wider text-center transition-colors"
      >
        {linkText}
      </a>
    </Card>
  )
}