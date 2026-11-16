import { useState, FormEvent } from 'react';
import { MaterialIcon, Button, Autocomplete, WhatsAppIcon } from '@/components/common';
import {
  Header,
  TrustPillars,
  WhatsAppBanner,
  Footer,
  FeedbackModal,
  MobileFAB,
} from '@/components/home';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { cn } from '@/utils/cn';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  asunto?: string;
  mensaje?: string;
}

const asuntoOptions = [
  { value: 'cotizacion', label: 'Solicitud de cotización' },
  { value: 'repuesto', label: 'Búsqueda de repuesto específico' },
  { value: 'tecnico', label: 'Asesoría técnica' },
  { value: 'distribuidor', label: 'Ser distribuidor / Alianza comercial' },
  { value: 'queja', label: 'Queja o reclamo' },
  { value: 'otro', label: 'Otro' },
];

export function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (formData.telefono.trim() && !/^[\d\s+\-()]{7,}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingresa un teléfono válido';
    }

    if (!formData.asunto) {
      newErrors.asunto = 'Selecciona un asunto';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setSubmitError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random error for demo (remove in production)
      // if (Math.random() > 0.7) throw new Error('Error del servidor');
      
      setStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    } catch {
      setStatus('error');
      setSubmitError('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setSubmitError('');
  };

  const handleReset = () => {
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    setErrors({});
    setStatus('idle');
    setSubmitError('');
  };

  const isSubmitting = status === 'submitting';

  return (
    <FeedbackProvider>
      <div className="min-h-screen bg-surface">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="w-full pt-[164px] bg-surface min-h-screen">
          {/* Hero Banner */}
          <section className="relative bg-gradient-to-br from-text-primary via-inverse-surface to-text-primary text-surface-bright overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-tech-grid" />
            <div className="absolute -right-32 top-0 w-[680px] h-[680px] bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="container-main relative z-10 py-16 lg:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 text-primary-container font-label-md text-label-md uppercase tracking-wider mb-6 animate-fade-in">
                  <MaterialIcon name="mail" size={18} aria-hidden />
                  Contacto
                </span>
                
                <h1 className="font-headline-xl text-headline-xl uppercase tracking-tight text-surface-bright mb-4 animate-slide-up">
                  ¿Tienes dudas o necesitas<br />
                  <span className="text-primary-container">asesoría personalizada?</span>
                </h1>
                
                <p className="font-body-lg text-body-lg text-surface-subtle/90 max-w-2xl mx-auto animate-slide-up">
                  Nuestro equipo de especialistas en Maracay está listo para ayudarte. 
                  Completa el formulario y te responderemos en menos de 24 horas.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="container-main py-16 lg:py-24">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Info Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-24 space-y-6">
                  {/* Contact Card 1 - WhatsApp */}
                  <div className="bg-surface-canvas rounded-2xl border border-surface-border p-6 shadow-xl hover:border-primary-container/50 hover:shadow-2xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-fitment-success/20 text-fitment-success flex items-center justify-center mb-4">
                      <WhatsAppIcon size={28} aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-2">WhatsApp Ventas</h3>
                    <p className="font-body-md text-body-md text-text-muted mb-4">
                      Respuesta inmediata de nuestros especialistas. Envíanos foto de tu repuesto con regla al lado.
                    </p>
                    <a
                      href="https://wa.me/5841206259521"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-fitment-success hover:bg-fitment-success/90 text-on-primary font-label-md text-label-md uppercase tracking-wider transition-all shadow-lg hover:shadow-fitment-success/30"
                    >
                      <WhatsAppIcon size={20} aria-hidden />
                      Escribir por WhatsApp
                    </a>
                  </div>

                  {/* Contact Card 2 - Phone */}
                  <div className="bg-surface-canvas rounded-2xl border border-surface-border p-6 shadow-xl hover:border-primary-container/50 hover:shadow-2xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4">
                      <MaterialIcon name="phone_in_talk" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-2">Llamar a Sede Maracay</h3>
                    <p className="font-body-md text-body-md text-text-muted mb-4">
                      Lunes a Viernes: 8:00 AM - 5:00 PM
                    </p>
                    <a
                      href="tel:+582432324411"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-container hover:bg-primary-hover text-on-primary font-label-md text-label-md uppercase tracking-wider transition-colors shadow-md hover:shadow-lg"
                    >
                      <MaterialIcon name="phone" size={20} aria-hidden />
                      (0243) 232-4411
                    </a>
                  </div>

                  {/* Contact Card 3 - Location */}
                  <div className="bg-surface-canvas rounded-2xl border border-surface-border p-6 shadow-xl hover:border-primary-container/50 hover:shadow-2xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4">
                      <MaterialIcon name="location_on" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-2">Sede Física Maracay</h3>
                    <address className="font-body-md text-body-md text-text-muted not-italic mb-4 leading-relaxed">
                      Av. Los Cedros c/c calle Mariño<br />
                      Local GOMAFLEX, Maracay, Edo. Aragua
                    </address>
                    <p className="font-body-sm text-body-sm text-text-muted">
                      Lunes a Viernes: 8:00 AM - 5:00 PM
                    </p>
                  </div>

                  {/* Social */}
                  <div className="bg-surface-canvas rounded-2xl border border-surface-border p-6 shadow-xl hover:border-primary-container/50 hover:shadow-2xl transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-primary-subtle text-primary-container flex items-center justify-center mb-4">
                      <MaterialIcon name="alternate_email" size={28} className="text-primary-container" aria-hidden />
                    </div>
                    <h3 className="font-headline-md text-headline-md text-text-primary mb-2">Síguenos</h3>
                    <p className="font-body-md text-body-md text-text-muted mb-4">
                      Novedades, ofertas y tips técnicos
                    </p>
                    <a
                      href="https://instagram.com/gomaflex"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-subtle hover:bg-primary-subtle hover:text-primary-container text-text-primary font-label-md text-label-md transition-colors border border-surface-border"
                    >
                      <svg className="w-5 h-5 text-primary-container fill-current" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>@gomaflex en Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-surface-canvas rounded-2xl border border-surface-border shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-text-primary to-inverse-surface px-6 py-5 border-b border-surface-border/20">
                    <h2 className="font-headline-lg text-headline-lg text-surface-bright uppercase tracking-tight">
                      Envíanos tu mensaje
                    </h2>
                    <p className="font-body-md text-body-md text-surface-subtle mt-1">
                      Completa el formulario y te responderemos a la brevedad
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6" noValidate>
                    {/* Status Messages */}
                    {status === 'submitting' && (
                      <div className="flex items-center gap-3 p-4 bg-primary-subtle border border-primary-container/30 rounded-xl animate-pulse">
                        <div className="w-8 h-8 border-3 border-primary-container border-t-transparent rounded-full animate-spin flex-shrink-0" aria-hidden />
                        <div>
                          <p className="font-label-md text-label-md text-primary-container">Enviando mensaje...</p>
                          <p className="font-body-sm text-body-sm text-primary-container/80">Por favor espera, esto puede tomar unos segundos</p>
                        </div>
                      </div>
                    )}

                    {status === 'success' && (
                      <div className="flex flex-col items-center gap-4 p-6 bg-fitment-success/10 border border-fitment-success/30 rounded-xl animate-fade-in text-center">
                        <div className="w-16 h-16 rounded-full bg-fitment-success/20 text-fitment-success flex items-center justify-center animate-bounce">
                          <MaterialIcon name="check_circle" size={36} aria-hidden />
                        </div>
                        <div>
                          <h3 className="font-headline-lg text-headline-lg text-fitment-success">¡Mensaje enviado!</h3>
                          <p className="font-body-md text-body-md text-fitment-success/90 mt-1">
                            Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderemos a la brevedad.
                          </p>
                        </div>
                        <Button variant="secondary" onClick={handleReset} className="mt-2">
                          <MaterialIcon name="refresh" size={18} aria-hidden />
                          Enviar otro mensaje
                        </Button>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl animate-shake text-left">
                        <div className="w-10 h-10 rounded-full bg-destructive/20 text-destructive flex items-center justify-center flex-shrink-0">
                          <MaterialIcon name="error" size={24} aria-hidden />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-label-lg text-label-lg text-destructive">Error al enviar</h3>
                          <p className="font-body-md text-body-md text-destructive/90 mt-1">
                            {submitError || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'}
                          </p>
                        </div>
                        <Button variant="secondary" onClick={handleRetry} className="flex-shrink-0">
                          <MaterialIcon name="refresh" size={18} aria-hidden />
                          Reintentar
                        </Button>
                      </div>
                    )}

                    {(status === 'idle' || status === 'error') && (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="nombre" className="block font-label-md text-label-md text-text-primary mb-1.5">
                              Nombre completo <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                              <MaterialIcon
                                name="person"
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                                aria-hidden
                              />
                              <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={e => handleChange('nombre', e.target.value)}
                                placeholder="Juan Pérez"
                                className={cn(
                                  'input-base w-full pl-10 pr-4 py-3 bg-surface-subtle border rounded-xl',
                                  'focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent',
                                  'placeholder:text-text-muted',
                                  errors.nombre && 'border-destructive focus:ring-destructive'
                                )}
                                aria-invalid={errors.nombre ? 'true' : 'false'}
                                aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                                disabled={isSubmitting}
                              />
                              {errors.nombre && (
                                <p id="nombre-error" className="mt-1.5 font-body-sm text-body-sm text-destructive flex items-center gap-1">
                                  <MaterialIcon name="error" size={14} aria-hidden />
                                  {errors.nombre}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="email" className="block font-label-md text-label-md text-text-primary mb-1.5">
                              Email <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                              <MaterialIcon
                                name="email"
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                                aria-hidden
                              />
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                placeholder="juan@ejemplo.com"
                                className={cn(
                                  'input-base w-full pl-10 pr-4 py-3 bg-surface-subtle border rounded-xl',
                                  'focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent',
                                  'placeholder:text-text-muted',
                                  errors.email && 'border-destructive focus:ring-destructive'
                                )}
                                aria-invalid={errors.email ? 'true' : 'false'}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                disabled={isSubmitting}
                              />
                              {errors.email && (
                                <p id="email-error" className="mt-1.5 font-body-sm text-body-sm text-destructive flex items-center gap-1">
                                  <MaterialIcon name="error" size={14} aria-hidden />
                                  {errors.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="telefono" className="block font-label-md text-label-md text-text-primary mb-1.5">
                              Teléfono
                            </label>
                            <div className="relative">
                              <MaterialIcon
                                name="phone"
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                                aria-hidden
                              />
                              <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={e => handleChange('telefono', e.target.value)}
                                placeholder="0414-1234567"
                                className={cn(
                                  'input-base w-full pl-10 pr-4 py-3 bg-surface-subtle border rounded-xl',
                                  'focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent',
                                  'placeholder:text-text-muted',
                                  errors.telefono && 'border-destructive focus:ring-destructive'
                                )}
                                aria-invalid={errors.telefono ? 'true' : 'false'}
                                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                                disabled={isSubmitting}
                              />
                              {errors.telefono && (
                                <p id="telefono-error" className="mt-1.5 font-body-sm text-body-sm text-destructive flex items-center gap-1">
                                  <MaterialIcon name="error" size={14} aria-hidden />
                                  {errors.telefono}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="asunto" className="block font-label-md text-label-md text-text-primary mb-1.5">
                              Asunto <span className="text-primary">*</span>
                            </label>
                            <Autocomplete
                              label="Asunto"
                              placeholder="Seleccionar asunto"
                              options={asuntoOptions}
                              value={formData.asunto}
                              onChange={value => handleChange('asunto', value)}
                              onBlur={() => {
                                if (errors.asunto) setErrors(prev => ({ ...prev, asunto: undefined }));
                              }}
                              required
                              ariaLabel="Seleccionar asunto del mensaje"
                              disabled={isSubmitting}
                            />
                            {errors.asunto && (
                              <p id="asunto-error" className="mt-1.5 font-body-sm text-body-sm text-destructive flex items-center gap-1">
                                <MaterialIcon name="error" size={14} aria-hidden />
                                {errors.asunto}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="mensaje" className="block font-label-md text-label-md text-text-primary mb-1.5">
                            Mensaje <span className="text-primary">*</span>
                          </label>
                          <div className="relative">
                            <textarea
                              id="mensaje"
                              name="mensaje"
                              value={formData.mensaje}
                              onChange={e => handleChange('mensaje', e.target.value)}
                              placeholder="Describe tu consulta, repuesto que buscas o cualquier duda..."
                              rows={5}
                              className={cn(
                                'w-full px-4 py-3 bg-surface-subtle border rounded-xl font-body-md text-body-md text-text-primary',
                                'focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent',
                                'placeholder:text-text-muted resize-none',
                                errors.mensaje && 'border-destructive focus:ring-destructive'
                              )}
                              aria-invalid={errors.mensaje ? 'true' : 'false'}
                              aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
                              disabled={isSubmitting}
                            />
                            {errors.mensaje && (
                              <p id="mensaje-error" className="mt-1.5 font-body-sm text-body-sm text-destructive flex items-center gap-1">
                                <MaterialIcon name="error" size={14} aria-hidden />
                                {errors.mensaje}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                          >
                            <MaterialIcon name="refresh" size={18} aria-hidden />
                            Limpiar formulario
                          </Button>
                          <Button
                            type="submit"
                            leftIcon="send"
                            variant="primary"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto min-w-[180px]"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" aria-hidden />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <MaterialIcon name="send" size={20} aria-hidden />
                                Enviar mensaje
                              </>
                            )}
                          </Button>
                        </div>
                      </>
                    )}

                    <p className="font-body-sm text-body-sm text-text-muted text-center pt-4 border-t border-surface-border">
                      <MaterialIcon name="lock" size={14} className="inline" aria-hidden />
                      Tus datos están protegidos según nuestra política de privacidad. No compartimos tu información con terceros.
                    </p>
                  </form>
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