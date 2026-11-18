import { WhatsAppIcon } from '@/components/common'
import { WHATSAPP_URL } from '@/data/catalog'

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-automotive-floating transition-transform duration-200 motion-safe:hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2 lg:bottom-6 lg:right-6"
    >
      <WhatsAppIcon size={28} className="text-white" />
    </a>
  )
}
