import { useEffect, useState } from 'react';
import { MaterialIcon } from '@/components/common';
import { api } from '@/services/api';

export function TopBar() {
  const [tasaBCV, setTasaBCV] = useState<string>('Cargando...');
  const [tasaError, setTasaError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasa = async () => {
      try {
        const response = await api.get<{ tasa_usd_ves: number }>('/tasa-cambio/actual');
        // Formatear la tasa: 914.0218 -> 914,02
        const tasaFormateada = new Intl.NumberFormat('es-VE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(response.body.tasa_usd_ves);
        setTasaBCV(`${tasaFormateada} VES`);
        setTasaError(false);
      } catch (error) {
        console.error('Error al obtener tasa BCV:', error);
        setTasaBCV('No disponible');
        setTasaError(true);
      }
    };

    fetchTasa();
  }, []);

  return (
    <div className="bg-text-primary text-surface-bright">
      {/* Top Info Bar */}
      <div className="container-main h-10 flex items-center justify-between text-body-sm">
        {/* Left: Location & Hours (Desktop only) */}
        <div className="hidden lg:flex items-center gap-space-xl">
          <span className="flex items-center gap-space-xs text-secondary-fixed">
            <MaterialIcon
              name="location_on"
              size={15}
              className="text-primary-container"
              aria-hidden
            />
            Av. Los Cedros, Maracay, Aragua
          </span>
          <span className="flex items-center gap-space-xs text-secondary-fixed">
            <MaterialIcon
              name="schedule"
              size={15}
              className="text-primary-container"
              aria-hidden
            />
            Lun-Vie 8:00am - 5:00pm
          </span>
        </div>

        {/* Right: BCV Rate + Instagram - Mobile: space-between, Desktop: grouped */}
        <div className="flex items-center gap-space-xl lg:justify-end justify-between w-full lg:w-auto">
          {/* BCV Rate - Desktop: full, Mobile: compact */}
          <div className="hidden lg:flex items-center gap-space-xs bg-inverse-surface px-space-sm py-0.5 rounded">
            <MaterialIcon
              name="currency_exchange"
              size={14}
              className="text-fitment-success"
              aria-hidden
            />
            <span className="font-label-md text-label-md text-on-tertiary-container">
              Tasa Oficial BCV:
            </span>
            <span className="font-label-md text-label-md text-surface-bright font-mono">
              {tasaBCV}
            </span>
            {tasaError && (
              <MaterialIcon
                name="warning"
                size={14}
                className="text-destructive"
                aria-label="Error al cargar tasa"
              />
            )}
          </div>

          <div className="lg:hidden flex items-center gap-1.5 bg-inverse-surface px-3 py-1.5 rounded">
            <MaterialIcon
              name="currency_exchange"
              size={14}
              className="text-fitment-success"
              aria-hidden
            />
            <span className="font-label-md text-label-md text-surface-bright font-mono">
              {tasaBCV}
            </span>
            {tasaError && (
              <MaterialIcon
                name="warning"
                size={14}
                className="text-destructive"
                aria-label="Error al cargar tasa"
              />
            )}
          </div>

          {/* Instagram - Desktop & Mobile: icon + name */}
          <a
            href="https://www.instagram.com/solucionesgomaflex"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-surface-subtle hover:text-surface-bright transition-colors font-label-md text-label-md"
            title="Síguenos en Instagram"
            aria-label="Instagram GOMAFLEX"
          >
            <svg className="w-4 h-4 text-primary-container fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0 3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="hover:underline">@solucionesgomaflex</span>
          </a>
        </div>
      </div>
    </div>
  );
}