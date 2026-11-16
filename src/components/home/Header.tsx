import { MainNav } from './MainNav'
import { TopBar } from './TopBar'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBar />
      <MainNav />
    </header>
  )
}