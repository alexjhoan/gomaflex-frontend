import { ReactNode } from 'react'

interface MainProps {
  children: ReactNode
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex-1" id="main-content" role="main">
      {children}
    </main>
  )
}