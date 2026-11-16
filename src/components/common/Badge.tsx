import { cn } from '@/utils/cn'
import { MaterialIcon } from './MaterialIcon'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  iconPosition?: 'left' | 'right'
  pill?: boolean
  uppercase?: boolean
}

const variantStyles = {
  default: 'bg-surface-subtle text-text-primary border border-surface-border',
  primary: 'bg-primary-container text-primary-foreground',
  success: 'bg-fitment-success text-on-primary',
  warning: 'bg-fitment-warning text-on-primary',
  error: 'bg-destructive text-destructive-foreground',
  info: 'bg-primary-subtle text-primary-container',
  dark: 'bg-inverse-surface text-inverse-on-surface',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-label-sm gap-1',
  md: 'px-2.5 py-1 text-label-md gap-1.5',
  lg: 'px-3 py-1.5 text-label-lg gap-1.5',
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  pill = true,
  uppercase = false,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        pill && 'rounded-full',
        uppercase && 'uppercase tracking-wider',
        className,
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <MaterialIcon name={icon} size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} aria-hidden />}
      {children}
      {icon && iconPosition === 'right' && <MaterialIcon name={icon} size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} aria-hidden />}
    </span>
  )
}

/* Convenience components */
export const StatusBadge = ({ status, ...props }: { status: 'verified' | 'pending' | 'check' | 'warning' } & Omit<BadgeProps, 'variant' | 'icon'>) => {
  const variants = {
    verified: { variant: 'success' as const, icon: 'verified' },
    pending: { variant: 'warning' as const, icon: 'schedule' },
    check: { variant: 'primary' as const, icon: 'check_circle' },
    warning: { variant: 'warning' as const, icon: 'warning' },
  }
  const config = variants[status]
  return <Badge {...config} {...props} />
}