import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { MaterialIcon } from './MaterialIcon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: string
  rightIcon?: string
  fullWidth?: boolean
  uppercase?: boolean
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-label-sm gap-1',
  md: 'px-4 py-2 text-label-md gap-1.5',
  lg: 'px-6 py-3 text-label-lg gap-2',
  xl: 'px-8 py-4 text-label-lg gap-2',
}

const variantStyles = {
  primary: `
    bg-primary-container hover:bg-primary-hover text-primary-foreground
    shadow-md hover:shadow-lg
  `,
  secondary: `
    bg-surface-subtle hover:bg-surface-variant text-text-primary
    border border-surface-border
  `,
  outline: `
    bg-transparent border-1.5 border-surface-border text-text-primary
    hover:bg-surface-subtle hover:border-text-primary
  `,
  ghost: `
    bg-transparent text-text-primary hover:bg-surface-subtle
  `,
  success: `
    bg-fitment-success hover:bg-fitment-success/90 text-on-primary
    shadow-lg hover:shadow-fitment-success/30
  `,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      uppercase = true,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeStyles[size],
          variantStyles[variant],
          uppercase && 'uppercase tracking-wider',
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <MaterialIcon name={leftIcon} size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} aria-hidden />}
            {children}
            {rightIcon && !isLoading && <MaterialIcon name={rightIcon} size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} aria-hidden />}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'