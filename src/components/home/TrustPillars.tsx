import { MaterialIcon } from '@/components/common'

interface TrustPillar {
  icon: string
  title: string
  description: string
  iconBgColor: string
}

const pillars: TrustPillar[] = [
  {
    icon: 'verified',
    title: 'Calidad y Confiabilidad',
    description: 'Trae tu muestra: comparamos diámetro interno y curva al instante.',
    iconBgColor: 'bg-primary-subtle text-primary-container',
  },
  {
    icon: 'directions_car',
    title: 'Amplio Surtido',
    description: '+180 aplicaciones para vehículos japoneses, americanos y europeos.',
    iconBgColor: 'bg-primary-subtle text-primary-container',
  },
  {
    icon: 'inventory_2',
    title: 'Stock Real en Mostrador',
    description: 'Inventario físico en Sede Maracay listo para entrega inmediata.',
    iconBgColor: 'bg-primary-subtle text-primary-container',
  },
  {
    icon: 'local_shipping',
    title: 'Despacho Diario',
    description: 'Envíos asegurados por Zoom, Tealca, MRW y mototaxi local.',
    iconBgColor: 'bg-primary-subtle text-primary-container',
  },
]

export function TrustPillars() {
  return (
    <section className="bg-surface-canvas shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative z-20">
      <div className="container-main py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBgColor}`}>
                <MaterialIcon name={pillar.icon} size={28} aria-hidden />
              </div>
              <div className="flex flex-col">
                <h4 className="font-headline-sm text-headline-sm text-text-primary">
                  {pillar.title}
                </h4>
                <p className="font-body-sm text-body-sm text-text-muted leading-tight mt-0.5">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}