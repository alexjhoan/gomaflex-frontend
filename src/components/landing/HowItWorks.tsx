import { WhatsAppIcon } from '@/components/common'

const STEPS = [
  'Elige tus productos',
  'Confirmamos disponibilidad y envío',
  'Te enviamos el enlace de pago',
]

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-title" className="container-main mt-8">
      <div className="rounded-lg border border-surface-border bg-white p-4 sm:p-6">
        <h2
          id="como-funciona-title"
          className="font-headline-lg text-headline-lg font-bold italic text-text-primary"
        >
          Así funciona
        </h2>
        <div aria-hidden className="mt-2 h-1 w-14 rounded-full bg-primary-container" />

        <ol className="mt-4 flex flex-col divide-y divide-surface-border lg:flex-row lg:divide-x lg:divide-y-0">
          {STEPS.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 lg:flex-1 lg:flex-col lg:items-center lg:gap-2 lg:px-4 lg:py-1 lg:text-center"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-container text-[12px] font-bold leading-none text-white">
                {index + 1}
              </span>
              <p className="font-body-sm text-body-sm font-medium text-text-primary lg:font-body-md lg:text-body-md">
                {step}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex items-center justify-center gap-2 rounded-md bg-primary-subtle px-3 py-2.5">
          <WhatsAppIcon size={18} className="shrink-0 text-primary-container" />
          <p className="font-body-sm text-body-sm italic text-text-primary">
            Recibe la confirmación por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}
