import { useState } from 'react'

import {
  CatalogGrid,
  Header,
  HeroBanner,
  HowItWorks,
  LandingFooter,
  MobileTabBar,
  OrderBuilder,
  OrderDrawer,
  SearchBar,
  TrustNote,
  WhatsAppFab,
} from '@/components/landing'
import { OrderProvider } from '@/context/OrderContext'

export function Home() {
  const [orderOpen, setOrderOpen] = useState(false)

  return (
    <OrderProvider>
      <div id="inicio" className="min-h-screen bg-white pb-20 lg:pb-0">
        <Header onOpenOrder={() => setOrderOpen(true)} />

        <main>
          {/* En desktop el buscador vive en el header */}
          <div className="container-main pt-4 lg:hidden">
            <SearchBar />
          </div>

          <HeroBanner />
          <TrustNote />
          <CatalogGrid />
          <OrderBuilder />
          <HowItWorks />
        </main>

        <LandingFooter />
        <MobileTabBar onOpenOrder={() => setOrderOpen(true)} />
        <WhatsAppFab />
        <OrderDrawer open={orderOpen} onOpenChange={setOrderOpen} />
      </div>
    </OrderProvider>
  )
}
