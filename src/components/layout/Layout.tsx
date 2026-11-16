import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Main } from './Main'

interface LayoutProps {
  children: ReactNode
  showHeader?: boolean
  showFooter?: boolean
  customHeader?: ReactNode
  customFooter?: ReactNode
}

export function Layout({
  children,
  showHeader = true,
  showFooter = true,
  customHeader,
  customFooter,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {showHeader && (customHeader || <Header />)}
      <Main>{children}</Main>
      {showFooter && (customFooter || <Footer />)}
    </div>
  )
}