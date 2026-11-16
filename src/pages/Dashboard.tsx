import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  const stats = [
    { label: 'Órdenes activas', value: '12', icon: '🔧' },
    { label: 'Vehículos en taller', value: '8', icon: '🚗' },
    { label: 'Clientes este mes', value: '45', icon: '👥' },
    { label: 'Ingresos estimados', value: '$125,000', icon: '💰' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenido, usuario. Aquí tienes un resumen de tu taller.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <span className="text-2xl" role="img" aria-hidden="true">
                {stat.icon}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}