import { useState } from 'react';
import { MaterialIcon, Button, Autocomplete } from '@/components/common';
import { cn } from '@/utils/cn';
import { HeroCarousel } from './HeroCarousel';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface VehicleData {
  id: number;
  name: string;
  brand: string;
  image: string;
  parts: string;
  badgeText: string;
  badgeIcon: string;
  statLabel: string;
  statValue: string;
}

const vehicles: VehicleData[] = [
  {
    id: 1,
    name: 'Toyota Corolla 2020',
    brand: 'Toyota',
    image:
      'https://lh3.googleusercontent.com/aida/ALJJyrBWbRSdTcqVGATLo-eixWEx08mDkmRiMZOJvU738Iar_VclTbmbbkId_8FXsIrdKDm66KH4WbDY1E9k-6KY8Xj5-RNgoxT-oDiC_2eapxtZXxbC8FVF7UHK9E5F4N0Rj5BPVMWl2T3vWBkRnBDYyU56gAyIlkEwQaA8eZO2OjTgz9d6vJco_XYKC57D2rzIjD1qHVO8CPD7zX7IGSOFbKQ_munuCI-I1gG4ZGdAHFEN',
    parts: 'Mangueras EPDM, Bujes & Soportes',
    badgeText: 'CALIDAD OEM',
    badgeIcon: 'directions_car',
    statLabel: 'Stock Activo',
    statValue: '+1,200 Pzas',
  },
  {
    id: 2,
    name: 'Ford Fiesta Move / Titanium',
    brand: 'Ford',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBqdOjO74uIF0X_dy0zi-3ZOctDmvy2VeYhLq7xTAsyn97V7Tik5VKYsqgw2U393LjJFW6f20yW927_flXOaFHP6ZR70ET-X-MF4-nv3lfUPatg-0zsSs2mYq0XPffmvDyVbsdnijDaFpptDRGUUMb4jhjBtrm6V0yWjfMywIV5vOVmxT_x6OcCtSwHi_GdeDxshJwqc_wardT-TAtMwqrtVvFf_j7wvPKlbODX6Y0',
    parts: 'Mangueras Radiador, Calefacción & Bujes',
    badgeText: 'CALIDAD OEM',
    badgeIcon: 'minor_crash',
    statLabel: 'Despacho Rápido',
    statValue: '+850 Pzas',
  },
  {
    id: 3,
    name: 'Chevrolet Aveo 1.6',
    brand: 'Chevrolet',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7DE5mj9UWRRWykv6eUV1UHU3oabDEl_2opxwk2kNru4u86qDJN3PtgqEVHHRR1ViLcGCxEIzOR3zVH4JGS9LZPa7WgQC_PK_tc0mcKSrh3HxWEldmGX3y2V_cLOlW6ZdWt1Pi4n8hz5DBuQ9J_Q3XvWbi2mfXJQfseOgHzH-OBu4krzNw4ZnV3qEPu4Sh5wx7K4FB6_BiI1w6RRlrra_JtsvFVYDUiSf_YfMZbyU',
    parts: 'Bujes Meseta, Guardapolvos & Radiador',
    badgeText: 'CALIDAD OEM',
    badgeIcon: 'build_circle',
    statLabel: 'Calce Verificado',
    statValue: 'En Mostrador',
  },
  {
    id: 4,
    name: 'Chery Orinoco 1.8',
    brand: 'Chery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGU9O9tLip-ZL-hqsJ3Jve6VVtOT95bHEzdB5SjP9VjwBnVAPa1t_MScNiKyP1WF80vhBm3y-ZAqOyX6NFASgP3RL-02xqhqljEE-4jOdju1yn_t7NXK2zPJ3QcuLCa23rQFzwMlo1DU9DYjIuYxa0rcfIw4z9Kt1UF1bK4ip1DZ6cPwV1h4H8Wbdknw3kpW3R4vBKG7SVQkLSyPzOGWjhXDHvtILeVHKx1AhToEs',
    parts: 'Bujes, Mangueras de Agua & Guardapolvos',
    badgeText: 'CALIDAD OEM',
    badgeIcon: 'verified',
    statLabel: 'Compatibilidad',
    statValue: '100% OEM',
  },
];

export function HeroSlider() {
  const [activeSearchTab, setActiveSearchTab] = useState<'universal' | 'vehicle'>('universal');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      await api.post('/sugerencias', {
        tipo: 'repuesto',
        mensaje: query,
        contacto: '',
      });
      toast.success('Búsqueda registrada. Nuestro equipo revisará tu solicitud.');
    } catch (error) {
      toast.error('Error al registrar la búsqueda. Inténtalo de nuevo.');
    } finally {
      setIsSearching(false);
    }
  };

  // Sample data for autocomplete - will be replaced with DB data
  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: '2014', label: '2014' },
    { value: '2013', label: '2013' },
    { value: '2012', label: '2012' },
    { value: '2011', label: '2011' },
    { value: '2010', label: '2010' },
  ];
  const makeOptions = [
    { value: 'chevrolet', label: 'Chevrolet' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'ford', label: 'Ford' },
    { value: 'hyundai', label: 'Hyundai' },
    { value: 'renault', label: 'Renault' },
    { value: 'cherry', label: 'Chery' },
    { value: 'fiat', label: 'Fiat' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'nissan', label: 'Nissan' },
    { value: 'peugeot', label: 'Peugeot' },
  ];
  const modelOptions = [
    { value: 'aveo', label: 'Aveo' },
    { value: 'corsa', label: 'Corsa' },
    { value: 'onix', label: 'Onix' },
    { value: 'tracker', label: 'Tracker' },
    { value: 'corolla', label: 'Corolla' },
    { value: 'hilux', label: 'Hilux' },
    { value: 'yaris', label: 'Yaris' },
    { value: 'fiesta', label: 'Fiesta' },
    { value: 'focus', label: 'Focus' },
    { value: 'ranger', label: 'Ranger' },
    { value: 'ecosport', label: 'EcoSport' },
  ];

  return (
    <section className="relative bg-text-primary text-surface-bright overflow-hidden pt-[88px] lg:pt-[124px]">
      {/* Background Technical Grid & Automotive Light Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-tech-grid" />
      <div className="absolute -right-32 top-0 w-[680px] h-[680px] bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[520px] lg:w-[650px] pointer-events-none select-none z-0 overflow-hidden flex items-center justify-center"
        style={{ mixBlendMode: 'screen', maxWidth: '90%' }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlycqiHAnntcYkz3HNW7L9_WKOOc9gKDnO_x8z0DXo-VTOcLbubeuYdVwgEDHsTx9c-n_NlFXLV_zNCwjGwZfpD-E9p06ycsjz1MSeRMq6tMDK5zuoUJNITjUzcMRvZPV84qLO5xJUwYWWlkVmRed7X92-EvbLjNGWKugdGIAjy9mZb64ErnPw1ljwJfG50DpjgU_9wGRQN2xgdZL58d6q_mbxBAaE4xY5Fh7-gKqkEteb6PbsYzaa"
          alt="GOMAFLEX GF Monogram Watermark"
          className="w-full h-auto object-contain transform rotate-[-6deg] scale-110"
          style={{ opacity: 0.3 }}
        />
      </div>

      <div className="container-main relative z-10 py-8 lg:py-12">
        {/* Mobile/Tablet: Simple Search - TOP of banner, above carousel */}
        <div className="lg:hidden mb-6">
          <div className="bg-surface-canvas rounded-lg p-1 shadow-xl text-text-primary">
            <div className="flex flex-col md:flex-row gap-3 bg-surface-subtle p-1.5 rounded-lg">
              <div className="flex-1 flex items-center px-3 py-2 gap-2">
                <MaterialIcon name="search" size={22} className="text-text-muted" aria-hidden />
                <input
                  type="text"
                  className="input-base w-full"
                  placeholder="Ej: Manguera superior Corsa 1.6, Buje meseta Aveo, Guardapolvo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
              </div>
              <Button
                size="lg"
                rightIcon="arrow_forward"
                className="shrink-0 md:w-auto w-full"
                onClick={() => handleSearch(searchQuery)}
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Status Pills & Counter */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider">
                <span
                  className="w-2 h-2 rounded-full bg-surface-canvas animate-pulse"
                  aria-hidden
                />
                Flexibilidad que conecta
              </span>
              <span className="inline-flex items-center gap-1 text-surface-subtle font-label-md text-label-md bg-inverse-surface px-2.5 py-1 rounded">
                <MaterialIcon
                  name="verified"
                  size={14}
                  className="text-fitment-success"
                  aria-hidden
                />
                Sede Maracay
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1">
              <h1 className="tracking-tight uppercase text-surface-bright leading-none select-none">
                <span className="block text-[34px] sm:text-[44px] lg:text-[48px] font-black italic tracking-tight font-headline-xl text-surface-bright drop-shadow-sm">
                  Soluciones en
                </span>
                <span className="inline-block my-1.5 py-1 px-4 bg-primary-container text-surface-bright font-black italic text-[32px] sm:text-[42px] lg:text-[46px] rounded tracking-tight transform skew-x-[-12deg] shadow-lg shadow-primary-container/30">
                  <span className="inline-block transform skew-x-[12deg]">Autopartes y</span>
                </span>
                <span className="block text-[36px] sm:text-[46px] lg:text-[50px] font-black italic tracking-tight font-headline-xl text-surface-bright drop-shadow-md">
                  Goma Automotriz
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-surface-subtle/90 max-w-xl pt-3 leading-relaxed">
                Componentes de calidad para el mantenimiento y rendimiento de tu vehículo. Amplio
                surtido con tolerancia de presión y temperatura OEM.
              </p>
            </div>

            {/* Search - Desktop: Complete with tabs & autocomplete */}
            <div className="hidden lg:block bg-surface-canvas rounded-xl p-5 shadow-xl text-text-primary mt-2">
              {/* Tab Switcher - styled like the reference image */}
              <div
                className="flex items-center gap-1 pb-4 border-b border-surface-border"
                role="tablist"
                aria-label="Modo de búsqueda"
              >
                <button
                  role="tab"
                  aria-selected={activeSearchTab === 'universal'}
                  aria-controls="panel-universal"
                  id="tab-universal"
                  onClick={() => setActiveSearchTab('universal')}
                  className={cn(
                    'flex items-center gap-1.5 px-5 py-3 rounded-t-lg font-label-md text-label-md transition-all border-b-2',
                    activeSearchTab === 'universal'
                      ? 'bg-surface-canvas text-primary-container border-primary-container'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-subtle border-transparent'
                  )}
                >
                  <MaterialIcon name="search" size={18} aria-hidden />
                  <span>Buscar por Repuesto o Medida</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeSearchTab === 'vehicle'}
                  aria-controls="panel-vehicle"
                  id="tab-vehicle"
                  onClick={() => setActiveSearchTab('vehicle')}
                  className={cn(
                    'flex items-center gap-1.5 px-5 py-3 rounded-t-lg font-label-md text-label-md transition-all border-b-2',
                    activeSearchTab === 'vehicle'
                      ? 'bg-surface-canvas text-primary-container border-primary-container'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-subtle border-transparent'
                  )}
                >
                  <MaterialIcon name="directions_car" size={18} className="text-primary-container" aria-hidden />
                  <span>Por Vehículo</span>
                </button>
              </div>

              {/* Panel 1: Universal Search - Simple like mobile but wider */}
              <div
                id="panel-universal"
                role="tabpanel"
                aria-labelledby="tab-universal"
                hidden={activeSearchTab !== 'universal'}
                className="mt-4 flex flex-col gap-3"
              >
                <div className="flex flex-col md:flex-row items-stretch gap-3 bg-surface-subtle p-2 rounded-xl">
                  <div className="flex-1 flex items-center px-4 py-3 gap-3 bg-surface-canvas rounded-lg border border-surface-border">
                    <MaterialIcon name="search" size={24} className="text-text-muted" aria-hidden />
                    <input
                      type="text"
                      className="input-base w-full bg-transparent"
                      placeholder="Ej: Manguera superior Corsa 1.6, Buje meseta Aveo, Guardapolvo..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    />
                  </div>
                  <Button
                    size="lg"
                    rightIcon="arrow_forward"
                    className="shrink-0 whitespace-nowrap"
                    onClick={() => handleSearch(searchQuery)}
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    {isSearching ? 'Buscando...' : 'Buscar'}
                  </Button>
                </div>
                <p className="font-body-sm text-body-sm text-fitment-success flex items-center gap-1.5">
                  <MaterialIcon name="verified_user" size={14} aria-hidden />
                  Calce 100% Verificado por Especialistas en Mostrador
                </p>
              </div>

              {/* Panel 2: Vehicle Search - With Autocomplete fields */}
              <div
                id="panel-vehicle"
                role="tabpanel"
                aria-labelledby="tab-vehicle"
                hidden={activeSearchTab !== 'vehicle'}
                className="mt-4 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Year Autocomplete */}
                  <Autocomplete
                    label="Año"
                    placeholder="Seleccionar año"
                    options={yearOptions}
                    value={vehicleYear}
                    onChange={setVehicleYear}
                    ariaLabel="Seleccionar año del vehículo"
                    required
                  />
                  {/* Make Autocomplete */}
                  <Autocomplete
                    label="Marca"
                    placeholder="Seleccionar marca"
                    options={makeOptions}
                    value={vehicleMake}
                    onChange={setVehicleMake}
                    ariaLabel="Seleccionar marca del vehículo"
                    required
                  />
                  {/* Model Autocomplete */}
                  <Autocomplete
                    label="Modelo"
                    placeholder="Seleccionar modelo"
                    options={modelOptions}
                    value={vehicleModel}
                    onChange={setVehicleModel}
                    ariaLabel="Seleccionar modelo del vehículo"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" rightIcon="search" className="min-w-[180px]">
                    Buscar por Vehículo
                  </Button>
                </div>
                <p className="font-body-sm text-body-sm text-fitment-success flex items-center justify-center gap-1.5">
                  <MaterialIcon name="verified_user" size={14} aria-hidden />
                  Calce 100% Verificado por Especialistas en Mostrador
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase - Hero Carousel */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full">
              <HeroCarousel
                slides={vehicles}
                autoSlideInterval={5000}
                transitionDuration={300}
                showIndicators={true}
                showThumbnails={true}
                showArrows={false}
                className="h-[380px] lg:h-[450px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
