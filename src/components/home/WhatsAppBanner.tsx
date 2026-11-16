import { MaterialIcon , Button } from '@/components/common'

export function WhatsAppBanner() {
  return (
    <section className="w-full">
      <div className="container-main py-6">
        <div className="bg-gradient-to-r from-text-primary via-inverse-surface to-text-primary text-surface-bright rounded-2xl p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Decorative Gauge Overlay */}
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
            <svg className="w-80 h-80 text-surface-canvas" fill="none" stroke="currentColor" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="42" strokeDasharray="4 2" strokeWidth="2" />
              <path d="M50 20 L50 50 L75 50" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>

          <div className="relative z-10 flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-fitment-success text-on-primary flex items-center justify-center shrink-0 shadow-lg">
              <MaterialIcon name="chat" size={36} aria-hidden />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase bg-fitment-success/20 text-fitment-success px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-fitment-success" aria-hidden />
                  {'Respuesta < 15 Min'}
                </span>
                <span className="font-label-sm text-label-sm text-surface-dim uppercase">Especialistas en Maracay</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-surface-bright uppercase">
                ¿Tienes la muestra en la mano o dudas con la curva?
              </h3>
              <p className="font-body-md text-body-md text-surface-subtle/80 max-w-2xl mt-1">
                Envíanos una foto con una regla al lado o el código de tu repuesto viejo. Nuestro equipo de mostrador verifica el diámetro exacto y te manda video del producto real.
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <Button
              variant="success"
              size="xl"
              leftIcon="support_agent"
              onClick={() => window.open('https://wa.me/', '_blank', 'noopener,noreferrer')}
            >
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}