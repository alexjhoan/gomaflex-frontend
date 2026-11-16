import { useState, FormEvent } from 'react'
import { MaterialIcon, Button } from '@/components/common'
import { useFeedback } from '@/context/FeedbackContext'
import { cn } from '@/utils/cn'

export function FeedbackModal() {
  const { isOpen, close } = useFeedback()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [formData, setFormData] = useState({
    type: 'repuesto',
    text: '',
    contact: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', formData)
    setStep('success')
    setTimeout(() => {
      setStep('form')
      setFormData({ type: 'repuesto', text: '', contact: '' })
      close()
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  return (
    <div
      id="feedback-modal"
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/80 backdrop-blur-sm transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
      onClick={close}
    >
      <div
        id="feedback-modal-card"
        className={cn(
          'bg-surface-canvas rounded-2xl w-full max-w-lg shadow-2xl border border-surface-border overflow-hidden transform transition-transform duration-300',
          isOpen ? 'scale-100' : 'scale-95'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-text-primary text-surface-bright p-5 px-6 flex items-center justify-between border-b border-surface-border/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
              <MaterialIcon name="rate_review" size={22} aria-hidden />
            </div>
            <div>
              <h3 id="feedback-modal-title" className="font-headline-sm text-headline-sm uppercase text-surface-bright leading-tight">
                Tu opinión mejora a GOMAFLEX
              </h3>
              <p className="font-body-sm text-[12px] text-surface-dim">
                Buzón oficial de clientes y talleres mecánicos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            className="w-8 h-8 rounded-full bg-inverse-surface hover:bg-primary-container text-surface-bright flex items-center justify-center transition-colors"
            aria-label="Cerrar modal"
          >
            <MaterialIcon name="close" size={20} aria-hidden />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {step === 'form' && (
            <form id="feedback-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="font-body-sm text-body-sm text-text-muted">
                Cuéntanos qué repuesto buscas, qué podemos mejorar en la web o déjanos tu sugerencia para atenderte mejor en mostrador:
              </p>

              <div>
                <label htmlFor="feedback-type" className="block font-label-md text-label-md text-text-primary mb-1.5">
                  Tipo de comentario:
                </label>
                <select
                  id="feedback-type"
                  value={formData.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  className="w-full bg-surface-subtle border border-surface-border rounded-lg px-3 py-2 font-body-sm text-body-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-container cursor-pointer"
                >
                  <option value="repuesto">Sugerencia de repuesto / catálogo</option>
                  <option value="web">Mejora en la web o cotizador</option>
                  <option value="atencion">Experiencia de atención en mostrador</option>
                  <option value="otra">Otra sugerencia</option>
                </select>
              </div>

              <div>
                <label htmlFor="feedback-text" className="block font-label-md text-label-md text-text-primary mb-1.5">
                  Mensaje o sugerencia <span className="text-primary">*</span>:
                </label>
                <textarea
                  id="feedback-text"
                  rows={3}
                  required
                  value={formData.text}
                  onChange={(e) => handleChange('text', e.target.value)}
                  placeholder="Escribe aquí tu idea, repuesto que necesitas o sugerencia..."
                  className="w-full bg-surface-subtle border border-surface-border rounded-lg p-3 font-body-sm text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-container resize-none"
                />
              </div>

              <div>
                <label htmlFor="feedback-contact" className="block font-label-md text-label-md text-text-primary mb-1.5">
                  WhatsApp o Correo (Opcional):
                </label>
                <input
                  id="feedback-contact"
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleChange('contact', e.target.value)}
                  placeholder="Ej: 0414-1234567 o correo@ejemplo.com"
                  className="w-full bg-surface-subtle border border-surface-border rounded-lg px-3 py-2 font-body-sm text-body-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-container"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button type="button" variant="secondary" onClick={close}>
                  Cancelar
                </Button>
                <Button type="submit" leftIcon="send" variant="primary">
                  Enviar Sugerencia
                </Button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div id="feedback-success" className="flex flex-col items-center justify-center text-center py-6 gap-3">
              <div className="w-14 h-14 rounded-full bg-fitment-success/20 text-fitment-success flex items-center justify-center">
                <MaterialIcon name="check_circle" size={36} aria-hidden />
              </div>
              <h4 className="font-headline-md text-headline-md text-text-primary">
                ¡Gracias por tu aporte!
              </h4>
              <p className="font-body-md text-body-md text-text-muted max-w-sm">
                Tu sugerencia ha sido recibida por el equipo de GOMAFLEX Maracay para seguir mejorando nuestro servicio.
              </p>
              <Button onClick={close} className="mt-2">
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}