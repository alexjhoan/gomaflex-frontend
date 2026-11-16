import {
  Header,
  HeroSlider,
  TrustPillars,
  Categories,
  WhatsAppBanner,
  Footer,
  FeedbackModal,
  MobileFAB,
} from '@/components/home';
import { FeedbackProvider } from '@/context/FeedbackContext';

export function Home() {
  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-surface">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="w-full sm:pt-[15px] lg:pt-[20px] bg-surface min-h-[calc(100vh-164px)]">
          <div className="flex flex-col w-full">
            {/* Hero Section */}
            <HeroSlider />

            {/* Trust Pillars */}
            <TrustPillars />

            {/* Categories */}
            <Categories />

            {/* WhatsApp Banner */}
            <WhatsAppBanner />
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Feedback Modal */}
        <FeedbackModal />

        {/* Mobile FAB - Dropup menu for WhatsApp, Contact, Suggestions */}
        <MobileFAB />
      </div>
    </FeedbackProvider>
  );
}