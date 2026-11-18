export function HeroBanner() {
  return (
    <section aria-labelledby="hero-title" className="container-main mt-4">
      <div className="relative flex min-h-[180px] items-center overflow-hidden rounded-lg bg-automotive-gradient sm:min-h-[240px] lg:min-h-[320px]">
        {/* Textura técnica + glow decorativos */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-tech-grid opacity-[0.06]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary-container/30 blur-3xl"
        />

        {/* Banda diagonal roja (decorativa) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-primary-container [clip-path:polygon(38%_0,72%_0,34%_100%,0_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-2/5 bg-primary-container/50 [clip-path:polygon(82%_0,94%_0,58%_100%,46%_100%)]"
        />

        <div className="relative z-10 w-full max-w-[600px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <h1
            id="hero-title"
            className="font-headline-xl text-headline-xl-mobile font-extrabold uppercase italic text-white md:text-headline-xl"
          >
            Encuentra lo que tu vehículo necesita
          </h1>
          <p className="mt-2 font-body-lg text-body-lg text-white/90">Autopartes y soluciones</p>
          <div aria-hidden className="mt-3 h-1 w-16 rounded-full bg-primary-container" />
        </div>
      </div>
    </section>
  )
}
