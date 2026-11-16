import { useState } from 'react';
import { MaterialIcon, WhatsAppIcon } from '@/components/common';
import { useFeedback } from '@/context/FeedbackContext';
import { cn } from '@/utils/cn';

interface FabAction {
  icon: string;
  isWhatsApp?: boolean;
  label: string;
  onClick?: () => void;
  href?: string;
}

const actions: FabAction[] = [
  {
    icon: 'wechat',
    isWhatsApp: true,
    label: 'WhatsApp Ventas',
    href: 'https://wa.me/5841206259521',
  },
  {
    icon: 'contact_phone',
    label: 'Contacto',
    href: '/contacto',
  },
  {
    icon: 'rate_review',
    label: 'Sugerencias',
    onClick: () => {},
  },
];

export function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openFeedback } = useFeedback();

  const handleActionClick = (action: FabAction) => {
    setIsOpen(false);
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      if (action.href.startsWith('http')) {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      } else {
        // For internal links, we could use router but window.location works
        window.location.href = action.href;
      }
    }
  };

  // Handle suggestions click specially
  const handleSuggestionClick = () => {
    setIsOpen(false);
    openFeedback();
  };

  return (
    <>
      {/* FAB Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-20 right-4 z-50 lg:hidden w-14 h-14 rounded-full',
          'bg-primary-container text-on-primary flex items-center justify-center',
          'shadow-xl transition-all duration-300',
          'hover:bg-primary-hover hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2',
          isOpen && 'rotate-45 bg-primary-hover'
        )}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de contacto'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <WhatsAppIcon size={28} aria-hidden />
      </button>

      {/* Dropup Menu */}
      {isOpen && (
        <div className="fixed bottom-72 right-4 z-40 lg:hidden animate-fade-in">
          <div className="flex flex-col-reverse gap-3">
            {actions.map((action, index) => (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  if (action.label === 'Sugerencias') {
                    handleSuggestionClick();
                  } else {
                    handleActionClick(action);
                  }
                }}
                className={cn(
                  'flex items-center gap-3 w-auto px-4 py-3 rounded-xl',
                  'bg-surface-canvas text-text-primary shadow-xl',
                  'hover:bg-surface-subtle transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-container',
                  'group'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-primary-subtle text-primary-container',
                  'group-hover:bg-primary-container group-hover:text-on-primary',
                  'transition-colors flex-shrink-0'
                )}>
                  {action.isWhatsApp ? (
                    <WhatsAppIcon size={22} aria-hidden />
                  ) : (
                    <MaterialIcon name={action.icon} size={22} aria-hidden />
                  )}
                </span>
                <span className="font-label-md text-label-md whitespace-nowrap">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-text-primary/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}