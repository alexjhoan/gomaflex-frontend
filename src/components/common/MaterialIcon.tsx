import { cn } from '@/utils/cn'

interface MaterialIconProps {
  name: string
  size?: number | string
  className?: string
  'aria-hidden'?: boolean
}

/**
 * Material Symbols Outlined icon component
 * Uses Google's Material Symbols font (loaded in index.html)
 */
export function MaterialIcon({
  name,
  size = 24,
  className,
  'aria-hidden': ariaHidden = true,
}: MaterialIconProps) {
  return (
    <span
      className={cn('material-symbols-outlined', className)}
      style={{ fontSize: typeof size === 'number' ? `${size}px` : size }}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  )
}