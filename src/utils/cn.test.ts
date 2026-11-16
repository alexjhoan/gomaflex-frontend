import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should handle conditional classes', () => {
    expect(cn('foo', true && 'bar')).toBe('foo bar')
    expect(cn('foo', false && 'bar')).toBe('foo')
    expect(cn('foo', null)).toBe('foo')
    expect(cn('foo', undefined)).toBe('foo')
  })

  it('should override tailwind classes with tailwind-merge', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    expect(cn('bg-red-500 hover:bg-red-600', 'bg-blue-500')).toBe('hover:bg-red-600 bg-blue-500')
  })

  it('should handle objects', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo')
    expect(cn({ foo: true, bar: true })).toBe('foo bar')
  })

  it('should handle arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn(['foo', false && 'bar'])).toBe('foo')
  })

  it('should handle mixed arguments', () => {
    expect(cn('base', { conditional: true }, ['array', 'classes'])).toBe('base conditional array classes')
  })

  it('should return empty string for no arguments', () => {
    expect(cn()).toBe('')
  })

  it('should handle responsive classes', () => {
    // tailwind-merge preserves order of non-conflicting classes
    expect(cn('md:flex', 'hidden')).toBe('md:flex hidden')
    expect(cn('hidden', 'md:flex')).toBe('hidden md:flex')
  })
})