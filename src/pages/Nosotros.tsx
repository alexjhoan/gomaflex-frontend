import { MaterialIcon } from '@/components/common';
import {
  Header,
  TrustPillars,
  WhatsAppBanner,
  Footer,
  FeedbackModal,
  MobileFAB,
} from '@/components/home';
import { FeedbackProvider } from '@/context/FeedbackContext';

export function Nosotros() {
  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-surface">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="w-full pt-[164px] bg-surface min-h-screen">
          {/* Hero Banner - Nuestra Historia */}
          <section className="relative bg-gradient-to-br from-text-primary via-inverse-surface to-text-primary text-surface-bright overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-tech-grid" />
            <div className="absolute -right-32 top-0 w-[680px] h-[680px] bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container-main relative z-10 py-16 lg:py-24">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 text-primary-container font-label-md text-label-md uppercase tracking-wider mb-6 animate-fade-in">
                  <MaterialIcon name="auto_awesome" size={18} aria-hidden />
                  Nuestra Historia
                </span>
                
                {/* Main Title */}
                <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight text-surface-bright mb-4 animate-slide-up">
                  La experiencia evoluciona.
                  <br />
                  <span className="text-primary-container">La confianza permanece.</span>
                </h1>
                
                {/* Subtitle */}
                <p className="font-body-lg text-body-lg text-surface-subtle/90 max-w-2xl mx-auto mb-10 animate-slide-up">
                  Soluciones GOMAFLEX nace con una visión clara: transformar la manera de encontrar y comprar autopartes en Venezuela.
                </p>
              </div>
            </div>
            
            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-text-primary to-transparent pointer-events-none" />
          </section>

          {/* Content Sections */}
          <section className="container-main py-16 lg:py-24">
            {/* Experiencia */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
              <div className="order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary-container font-label-sm text-label-sm uppercase tracking-wider mb-4">
                  <MaterialIcon name="history_edu" size={16} aria-hidden />
                  Experiencia
                </span>
                <h2 className="font-headline-lg text-headline-lg tracking-tight text-text-primary mb-6">
                  Más de <span className="text-primary-container">18 años</span> en el sector
                </h2>
                <div className="space-y-4 text-text-muted">
                  <p className="font-body-lg text-body-lg leading-relaxed">
                    Nuestro proyecto se apoya en una trayectoria de más de 18 años de experiencia comercial en el sector de componentes de goma automotriz, desarrollada a través de <span className="font-semibold text-text-primary">El Mundo de la Goma</span>, en Maracay, estado Aragua.
                  </p>
                  <p className="font-body-lg text-body-lg leading-relaxed">
                    Conocemos la importancia de encontrar el repuesto adecuado, contar con asesoría especializada y mantener los vehículos en funcionamiento.
                  </p>
                  <p className="font-body-lg text-body-lg leading-relaxed font-semibold text-primary-container">
                    Hoy queremos llevar esa experiencia a una nueva etapa, integrando tecnología, comercio electrónico y una oferta de productos cada vez más amplia.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-primary-subtle rounded-xl border border-primary-container/20 flex items-center gap-3">
                  <MaterialIcon name="verified" size={24} className="text-primary-container" aria-hidden />
                  <span className="font-headline-sm text-headline-sm text-primary-container">
                    Soluciones GOMAFLEX. Flexibilidad que conecta.
                  </span>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-container/20 to-inverse-surface/20 border border-surface-border">
                  <div className="absolute inset-0 bg-gradient-to-t from-text-primary via-text-primary/20 to-transparent opacity-30" />
                  <div className="relative h-full flex items-center justify-center p-8">
                    <MaterialIcon name="engineering" size={120} className="text-primary-container/30" aria-hidden />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-text-primary/90 backdrop-blur rounded-xl text-surface-bright">
                    <p className="font-label-md text-label-md text-primary-container uppercase tracking-wider">18+ Años</p>
                    <p className="font-headline-sm text-headline-sm">Experiencia Comercial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Propósito */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fitment-success/20 text-fitment-success font-label-sm text-label-sm uppercase tracking-wider mb-4">
                  <MaterialIcon name="favorite" size={16} aria-hidden />
                  Nuestro Propósito
                </span>
                <h2 className="font-headline-xl text-headline-xl uppercase tracking-tight text-text-primary mb-4">
                  Conectar vehículos, personas y soluciones.
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Card 1 */}
                <div className="group relative p-6 bg-surface-canvas rounded-2xl border border-surface-border hover:border-primary-container/50 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-container/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon name="family_restroom" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-3">Familias en movimiento</h3>
                    <p className="font-body-md text-body-md text-text-muted flex-1">
                      Detrás de cada repuesto hay una necesidad: mantener una familia en movimiento, ayudar a un profesional a realizar su trabajo o permitir que un negocio continúe operando.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-6 bg-surface-canvas rounded-2xl border border-surface-border hover:border-primary-container/50 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-container/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon name="build" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-3">Profesionales en su trabajo</h3>
                    <p className="font-body-md text-body-md text-text-muted flex-1">
                      Queremos ir más allá de vender productos: ofrecer soluciones que generen confianza, ahorren tiempo y mantengan a Venezuela en movimiento.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="group relative p-6 bg-surface-canvas rounded-2xl border border-surface-border hover:border-primary-container/50 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-container/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative flex flex-col h-full">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon name="business" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-3">Negocios operativos</h3>
                    <p className="font-body-md text-body-md text-text-muted flex-1">
                      Buscamos ofrecer soluciones que generen confianza, ahorren tiempo y mantengan a Venezuela en movimiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-text-primary via-inverse-surface to-text-primary">
              <div className="absolute inset-0 opacity-5 bg-tech-grid" />
              <div className="container-main relative z-10 py-16 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 text-primary-container font-label-md text-label-md uppercase tracking-wider mb-6">
                    <MaterialIcon name="visibility" size={18} aria-hidden />
                    Nuestra Visión
                  </span>
                  <h2 className="font-headline-xl text-headline-xl uppercase tracking-tight text-surface-bright mb-8">
                    Convertirnos en la <span className="text-primary-container">plataforma de referencia</span> para el comercio de autopartes en Venezuela.
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-12">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-surface-canvas/50 rounded-xl border border-surface-border/50">
                        <div className="w-12 h-12 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="eco" size={24} className="text-primary-container" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Ecosistema comercial y tecnológico</h3>
                          <p className="font-body-md text-body-md text-surface-subtle">
                            Conectar clientes, talleres, distribuidores y proveedores mediante una experiencia de compra moderna, transparente, accesible y eficiente.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-surface-canvas/50 rounded-xl border border-surface-border/50">
                        <div className="w-12 h-12 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="devices" size={24} className="text-primary-container" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Omnicanal y accesible</h3>
                          <p className="font-body-md text-body-md text-surface-subtle">
                            Que encontrar y comprar una autoparte en Venezuela sea cada vez más sencillo, desde cualquier lugar y dispositivo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-surface-canvas/50 rounded-xl border border-surface-border/50">
                        <div className="w-12 h-12 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="handshake" size={24} className="text-primary-container" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Transparencia y confianza</h3>
                          <p className="font-body-md text-body-md text-surface-subtle">
                            Información clara, precios justos, disponibilidad real y asesoría especializada en cada interacción.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-surface-canvas/50 rounded-xl border border-surface-border/50">
                        <div className="w-12 h-12 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="rocket_launch" size={24} className="text-primary-container" aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md text-surface-bright mb-2">Innovación continua</h3>
                          <p className="font-body-md text-body-md text-surface-subtle">
                            Integración de tecnología, datos y logística para reducir tiempos y mejorar la experiencia de compra.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 p-6 bg-surface-canvas/10 backdrop-blur rounded-2xl border border-primary-container/30">
                    <p className="font-headline-lg text-headline-lg text-surface-bright text-center mb-2">
                      Queremos que encontrar y comprar una autoparte en Venezuela
                    </p>
                    <p className="font-headline-lg text-headline-lg text-primary-container text-center">
                      sea cada vez más sencillo, desde cualquier lugar y dispositivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Pillars */}
          <TrustPillars />

          {/* WhatsApp Banner */}
          <WhatsAppBanner />
        </main>

        {/* Footer */}
        <Footer />

        {/* Feedback Modal */}
        <FeedbackModal />

        {/* Mobile FAB */}
        <MobileFAB />
      </div>
    </FeedbackProvider>
  );
}