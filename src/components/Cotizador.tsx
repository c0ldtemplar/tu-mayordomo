import React from "react";
import {
  Calculator,
  Calendar,
  Sun,
  Snowflake,
  Leaf,
  Droplets,
  Car,
  Layout as WindowIcon,
  Grid3X3,
  Wrench,
  Waves,
  Trash2,
  SunMedium,
  Bug,
  Flame,
  CheckCircle2,
  Plus,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  PlanType,
  Period,
  GardenSize,
  VehicleSegment,
  WindowPanes,
  ExtraService,
  ServiceConfig,
  UNIT_PRICES,
  DISCOUNTS,
} from "../types";

interface CotizadorProps {
  config: ServiceConfig;
  setConfig: React.Dispatch<React.SetStateAction<ServiceConfig>>;
  calculation: any;
}

export const Cotizador: React.FC<CotizadorProps> = ({
  config,
  setConfig,
  calculation,
}) => {
  const formatCLP = (val: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(val);

  return (
    <div id="planes" className="pt-24 scroll-mt-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
          Cotizador de Planes
        </h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          Arma tu paquete a medida y visualiza tu ahorro inmediato.
        </p>
      </div>
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-7 space-y-6">
          <section className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <Calculator size={24} />
              </div>
              <h2 className="text-2xl font-bold">Configura tu Plan</h2>
            </div>

            <div className="space-y-8">
              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                  Nivel de Servicio
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(PlanType).map((type) => (
                    <button
                      key={type}
                      onClick={() => setConfig({ ...config, plan: type })}
                      className={`py-4 px-2 rounded-2xl border-2 transition-all text-center ${
                        config.plan === type
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold"
                          : "border-stone-100 hover:border-stone-200 text-stone-600"
                      }`}
                    >
                      {type}
                      <div className="text-[10px] font-normal opacity-70 mt-1">
                        {DISCOUNTS[type] * 100}% Dcto.
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Period Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                    Periodo de Contratación
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[Period.QUARTER, Period.SEMESTER, Period.ANNUAL].map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setConfig({ ...config, period: p })}
                          className={`py-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 ${
                            config.period === p
                              ? "border-stone-900 bg-stone-900 text-white font-bold"
                              : "border-stone-100 hover:border-stone-200 text-stone-600"
                          }`}
                        >
                          <Calendar size={16} />
                          {p}
                        </button>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                    Fecha de Inicio
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={config.startMonth}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          startMonth: parseInt(e.target.value),
                          startDay: 1,
                        })
                      }
                      className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {[
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                      ].map((m, i) => (
                        <option key={i} value={i}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={config.startDay}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          startDay: parseInt(e.target.value),
                        })
                      }
                      className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Seasonality Legend */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
                  Estacionalidad
                </p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                      <Sun size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Verano</p>
                      <p className="text-[10px] text-stone-500">
                        Octubre - Marzo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                      <Snowflake size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Invierno</p>
                      <p className="text-[10px] text-stone-500">
                        Abril - Septiembre
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-stone-100 my-8"></div>

              {/* Service Specifics - Cards Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Garden Card */}
                <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                      <Leaf size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Jardín</h4>
                      <p className="text-xs text-stone-500">
                        Mantenimiento y poda
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <select
                      value={config.gardenSize}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          gardenSize: e.target.value as GardenSize,
                        })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.values(GardenSize).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                          Frecuencia Fija
                        </p>
                        <p className="text-xs font-bold text-stone-600">
                          Verano: 4x/mes | Invierno: 2x/mes
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                          Valor Visita
                        </p>
                        <p className="text-xs font-bold text-emerald-600">
                          {formatCLP(UNIT_PRICES.GARDEN[config.gardenSize])}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 space-y-4">
                    <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>Desglose Mensual ({config.period})</span>
                      <span className="font-bold text-stone-600">
                        {calculation.visits.gardenVisits} visitas totales
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {calculation.serviceBreakdown.garden.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100"
                        >
                          <div className="flex items-center gap-3">
                            <p className="text-[10px] font-bold text-stone-400 uppercase w-8">
                              {item.month}
                            </p>
                            <div className="flex items-center gap-1">
                              {item.isSummer ? (
                                <Sun size={10} className="text-amber-500" />
                              ) : (
                                <Snowflake size={10} className="text-blue-400" />
                              )}
                              <span className="text-[10px] font-bold text-stone-600">
                                {item.isSummer ? "4v" : "2v"}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-bold text-emerald-600">
                            {formatCLP(item.cost)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm font-bold pt-2 text-emerald-600 border-t border-stone-50">
                      <span>Total Base Jardín</span>
                      <span>{formatCLP(calculation.costs.garden)}</span>
                    </div>
                  </div>
                </div>

                {/* Pool Card */}
                <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                      <Droplets size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Piscina</h4>
                      <p className="text-xs text-stone-500">
                        Químicos y limpieza
                      </p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 mb-6 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                        Frecuencia Fija
                      </p>
                      <p className="text-xs font-bold text-stone-600">
                        Verano: 4x/mes | Invierno: 2x/mes
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                        Valor Visita
                      </p>
                      <p className="text-xs font-bold text-blue-600">
                        {formatCLP(UNIT_PRICES.POOL)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 space-y-4">
                    <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>Desglose Mensual ({config.period})</span>
                      <span className="font-bold text-stone-600">
                        {calculation.visits.poolVisits} visitas totales
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {calculation.serviceBreakdown.pool.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100"
                        >
                          <div className="flex items-center gap-3">
                            <p className="text-[10px] font-bold text-stone-400 uppercase w-8">
                              {item.month}
                            </p>
                            <div className="flex items-center gap-1">
                              {item.isSummer ? (
                                <Sun size={10} className="text-amber-500" />
                              ) : (
                                <Snowflake size={10} className="text-blue-400" />
                              )}
                              <span className="text-[10px] font-bold text-stone-600">
                                {item.isSummer ? "4v" : "2v"}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs font-bold text-blue-600">
                            {formatCLP(item.cost)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm font-bold pt-2 text-blue-600 border-t border-stone-50">
                      <span>Total Base Piscina</span>
                      <span>{formatCLP(calculation.costs.pool)}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicles Card */}
                <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                      <Car size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Vehículos</h4>
                      <p className="text-xs text-stone-500">
                        Lavado full a domicilio
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500 uppercase">
                        Vehículos:
                      </span>
                      <button
                        onClick={() =>
                          setConfig({
                            ...config,
                            vehicles: [
                              ...config.vehicles,
                              VehicleSegment.MEDIUM,
                            ],
                          })
                        }
                        className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
                      >
                        <Plus size={14} /> Agregar Auto
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                      {config.vehicles.map((v, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-50 rounded-xl p-3 border border-stone-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <select
                                value={v}
                                onChange={(e) => {
                                  const newVehicles = [...config.vehicles];
                                  newVehicles[idx] = e.target
                                    .value as VehicleSegment;
                                  setConfig({
                                    ...config,
                                    vehicles: newVehicles,
                                  });
                                }}
                                className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                              >
                                {Object.values(VehicleSegment).map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => {
                                  const newVehicles = config.vehicles.filter(
                                    (_, i) => i !== idx,
                                  );
                                  setConfig({
                                    ...config,
                                    vehicles: newVehicles,
                                  });
                                }}
                                className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 leading-none mb-1">
                                Valor Visita
                              </p>
                              <p className="text-xs font-bold text-amber-600">
                                {formatCLP(UNIT_PRICES.CAR_WASH[v])}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between text-[10px] text-stone-500 uppercase tracking-wider">
                            <span>
                              Total Mensual (
                              {config.plan === PlanType.BASIC ? "2v" : "4v"})
                            </span>
                            <span className="font-bold">
                              {formatCLP(
                                UNIT_PRICES.CAR_WASH[v] *
                                  (config.plan === PlanType.BASIC ? 2 : 4),
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                      {config.vehicles.length === 0 && (
                        <p className="text-xs text-stone-400 italic text-center py-4 border-2 border-dashed border-stone-100 rounded-xl">
                          No hay vehículos seleccionados
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 space-y-4">
                    <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>Desglose Mensual ({config.period})</span>
                      <span className="font-bold text-stone-600">
                        {calculation.visits.carWashes} lavados totales
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {calculation.serviceBreakdown.car.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase w-8">
                            {item.month}
                          </p>
                          <p className="text-xs font-bold text-amber-600">
                            {formatCLP(item.cost)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm font-bold pt-2 text-amber-600 border-t border-stone-50">
                      <span>Total Base Vehículos</span>
                      <span>{formatCLP(calculation.costs.car)}</span>
                    </div>
                  </div>
                </div>

                {/* Windows Card */}
                <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-500">
                      <WindowIcon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Vidrios</h4>
                      <p className="text-xs text-stone-500">
                        Limpieza de paños
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <select
                      value={config.windowPanes}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          windowPanes: e.target.value as WindowPanes,
                        })
                      }
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.values(WindowPanes).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                        Frecuencia Incluida
                      </p>
                      <p className="text-xs font-bold text-stone-600">
                        {config.plan === PlanType.PREMIUM
                          ? "2 veces por trimestre (6 al año)"
                          : "1 vez por trimestre (4 al año)"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 space-y-4">
                    <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>Desglose Mensual ({config.period})</span>
                      <span className="font-bold text-stone-600">
                        {calculation.visits.windowCleanings} limpiezas totales
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {calculation.serviceBreakdown.windows.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase w-8">
                            {item.month}
                          </p>
                          <p className="text-xs font-bold text-blue-500">
                            {formatCLP(item.cost)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm font-bold pt-2 text-blue-500 border-t border-stone-50">
                      <span>Total Base Vidrios</span>
                      <span>{formatCLP(calculation.costs.windows)}</span>
                    </div>
                    <p className="text-[10px] text-stone-400 italic text-center mt-2">
                      * El valor mensual es el costo total del servicio
                      prorrateado en{" "}
                      {config.period === Period.ANNUAL
                        ? 12
                        : config.period === Period.SEMESTER
                          ? 6
                          : 3}{" "}
                      meses.
                    </p>
                  </div>
                </div>

                {/* Pavement Card */}
                <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-stone-100 rounded-xl text-stone-600">
                      <Grid3X3 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">
                        Hidrolavado de Adoquines
                      </h4>
                      <p className="text-xs text-stone-500">
                        Limpieza profunda a presión
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center justify-between bg-stone-50 p-4 rounded-xl">
                      <span className="text-sm font-bold text-stone-500 uppercase">
                        Superficie:
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            setConfig({
                              ...config,
                              pavementM2: Math.max(25, config.pavementM2 - 5),
                            })
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="w-16 text-center font-bold text-lg">
                          {config.pavementM2} m²
                        </span>
                        <button
                          onClick={() =>
                            setConfig({
                              ...config,
                              pavementM2: config.pavementM2 + 5,
                            })
                          }
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">
                        Frecuencia Incluida
                      </p>
                      <p className="text-xs font-bold text-stone-600">
                        1 vez por trimestre (4 al año)
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-50 space-y-4">
                    <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                      <span>Desglose Mensual ({config.period})</span>
                      <span className="font-bold text-stone-600">
                        {calculation.visits.pavementCleanings} servicios totales
                      </span>
                    </div>

                    <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                      {calculation.serviceBreakdown.pavement.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100"
                        >
                          <p className="text-[10px] font-bold text-stone-400 uppercase w-8">
                            {item.month}
                          </p>
                          <p className="text-xs font-bold text-stone-900">
                            {formatCLP(item.cost)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                      <p className="text-sm font-bold text-stone-600">
                        Total Base Hidrolavado
                      </p>
                      <p className="text-xl font-bold text-stone-900">
                        {formatCLP(calculation.costs.pavement)}
                      </p>
                    </div>
                    <p className="text-[10px] text-stone-400 italic text-center mt-2">
                      * El valor mensual es el costo total del servicio
                      prorrateado en{" "}
                      {config.period === Period.ANNUAL
                        ? 12
                        : config.period === Period.SEMESTER
                          ? 6
                          : 3}{" "}
                      meses.
                    </p>
                  </div>
                </div>

                {/* Extra Services Card */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-stone-100 rounded-xl text-stone-600">
                      <Wrench size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Servicios a Pedido</h4>
                      <p className="text-xs text-stone-500">
                        Contratación independiente por evento
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {[
                      {
                        id: ExtraService.IRRIGATION,
                        icon: <Waves size={16} />,
                        label: "Revisión Sistema de Riego",
                        unit: "Zonas",
                        step: 1,
                        min: 1,
                      },
                      {
                        id: ExtraService.GUTTERS,
                        icon: <Trash2 size={16} />,
                        label: "Limpieza de Canaletas",
                        unit: "Metros",
                        step: 5,
                        min: 5,
                      },
                      {
                        id: ExtraService.SOLAR,
                        icon: <SunMedium size={16} />,
                        label: "Limpieza Paneles Solares",
                        unit: "Paneles",
                        step: 2,
                        min: 2,
                      },
                      {
                        id: ExtraService.PEST_HOME,
                        icon: <Bug size={16} />,
                        label: "Fumigación Hogar (Int/Ext)",
                        unit: "m² Construcción",
                        step: 10,
                        min: 50,
                      },
                      {
                        id: ExtraService.PEST_TREES,
                        icon: <Bug size={16} />,
                        label: "Fumigación Árboles/Frutales",
                        unit: "Árboles",
                        step: 1,
                        min: 1,
                      },
                      {
                        id: ExtraService.BBQ_CLEANING,
                        icon: <Flame size={16} />,
                        label: "Limpieza Parrilla y Quincho",
                        unit: "Servicios",
                        step: 1,
                        min: 1,
                      },
                    ].map((service) => {
                      const isSelected = config.extras.some(
                        (e) => e.service === service.id,
                      );
                      const extra = config.extras.find(
                        (e) => e.service === service.id,
                      );

                      return (
                        <div
                          key={service.id}
                          className={`p-5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-50/30"
                              : "border-stone-100 bg-stone-50/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`${isSelected ? "text-emerald-500" : "text-stone-400"}`}
                              >
                                {service.icon}
                              </div>
                              <span className="text-xs font-black uppercase tracking-tight">
                                {service.label}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                const newExtras = isSelected
                                  ? config.extras.filter(
                                      (e) => e.service !== service.id,
                                    )
                                  : [
                                      ...config.extras,
                                      {
                                        service: service.id,
                                        dimension: service.min,
                                      },
                                    ];
                                setConfig({ ...config, extras: newExtras });
                              }}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "bg-emerald-500 text-white"
                                  : "bg-stone-200 text-stone-500 hover:bg-stone-300"
                              }`}
                            >
                              {isSelected ? (
                                <CheckCircle2 size={16} />
                              ) : (
                                <Plus size={16} />
                              )}
                            </button>
                          </div>

                          {isSelected && (
                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => {
                                    const newExtras = config.extras.map((e) =>
                                      e.service === service.id
                                        ? {
                                            ...e,
                                            dimension: Math.max(
                                              service.min,
                                              e.dimension - service.step,
                                            ),
                                          }
                                        : e,
                                    );
                                    setConfig({ ...config, extras: newExtras });
                                  }}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100"
                                >
                                  -
                                </button>
                                <div className="text-center">
                                  <p className="text-lg font-black text-stone-900 leading-none">
                                    {extra?.dimension}
                                  </p>
                                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                    {service.unit}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    const newExtras = config.extras.map((e) =>
                                      e.service === service.id
                                        ? {
                                            ...e,
                                            dimension:
                                              e.dimension + service.step,
                                          }
                                        : e,
                                    );
                                    setConfig({ ...config, extras: newExtras });
                                  }}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-emerald-600">
                                  {formatCLP(
                                    UNIT_PRICES.EXTRAS[service.id] *
                                      (extra?.dimension || 0),
                                  )}
                                </p>
                                <p className="text-[9px] font-bold text-stone-400 uppercase">
                                  Total Servicio
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 border-t border-stone-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">
                          Total a Pedido
                        </p>
                        <p className="text-2xl font-black text-stone-900">
                          {formatCLP(calculation.onDemandCosts)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-stone-400 italic leading-tight">
                          * Pago único por evento.
                          <br />
                          No incluido en mensualidad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Summary Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 space-y-6">
            <section className="bg-stone-900 text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Calculator size={120} />
              </div>

              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Resumen del Plan {config.plan}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-stone-400 text-xs uppercase tracking-widest">
                  <span>Estacionalidad ({config.period})</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Sun size={12} className="text-amber-500" />{" "}
                      {calculation.seasonality.summerMonths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Snowflake size={12} className="text-blue-400" />{" "}
                      {calculation.seasonality.winterMonths}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-y border-white/10 py-4 my-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">
                    Desglose Individual
                  </p>
                  <div className="flex justify-between items-center text-stone-400 text-xs">
                    <span>
                      Mantenimiento Jardín ({formatCLP(UNIT_PRICES.GARDEN[config.gardenSize])}/v)
                    </span>
                    <span>{formatCLP(calculation.costs.garden)}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400 text-xs">
                    <span>
                      Mantenimiento Piscina ({formatCLP(UNIT_PRICES.POOL)}/v)
                    </span>
                    <span>{formatCLP(calculation.costs.pool)}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400 text-xs">
                    <span>
                      Lavado Automotriz ({formatCLP(calculation.costs.car / calculation.visits.carWashes)}/v)
                    </span>
                    <span>{formatCLP(calculation.costs.car)}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-400 text-xs">
                    <span>
                      Limpieza de Vidrios ({formatCLP(UNIT_PRICES.WINDOWS[config.windowPanes])}/v)
                    </span>
                    <span>{formatCLP(calculation.costs.windows)}</span>
                  </div>
                  {calculation.costs.pavement > 0 && (
                    <div className="flex justify-between items-center text-stone-400 text-xs">
                      <span>Hidrolavado Adoquines</span>
                      <span>{formatCLP(calculation.costs.pavement)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-stone-400 text-sm">
                  <span>Subtotal Individual ({config.period})</span>
                  <span>{formatCLP(calculation.totalIndividual)}</span>
                </div>
                <div className="flex justify-between items-center text-stone-500 text-[10px] uppercase tracking-wider mb-4">
                  <span>Promedio Mensual Individual</span>
                  <span>
                    {formatCLP(calculation.individualMonthlyAverage)} / mes
                  </span>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 text-sm">
                      Descuento Pack {config.plan} ({calculation.discounts.plan * 100}%)
                    </span>
                    <span className="text-emerald-400 text-sm">
                      -{formatCLP(calculation.totalIndividual * calculation.discounts.plan)}
                    </span>
                  </div>

                  {calculation.discounts.period > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 text-sm">
                        Descuento Permanencia {config.period} ({calculation.discounts.period * 100}%)
                      </span>
                      <span className="text-emerald-400 text-sm">
                        -{formatCLP(calculation.totalIndividual * (1 - calculation.discounts.plan) * calculation.discounts.period)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10 my-4"></div>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">
                      Total {config.period}
                    </p>
                    <p className="text-4xl font-bold">
                      {formatCLP(calculation.totalPlan)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    Promedio Mensual Pack
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {formatCLP(calculation.monthlyEquivalent)} / mes
                  </span>
                </div>

                {calculation.onDemandCosts > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">
                      Servicios a Pedido (Opcionales)
                    </p>
                    <div className="space-y-2">
                      {config.extras.map((extra, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-stone-400">
                            {extra.service} ({extra.dimension})
                          </span>
                          <span className="text-stone-300">
                            {formatCLP(UNIT_PRICES.EXTRAS[extra.service] * extra.dimension)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5 font-bold">
                        <span className="text-stone-300">Total a Pedido</span>
                        <span className="text-emerald-400">
                          {formatCLP(calculation.onDemandCosts)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-emerald-500/60 text-center mt-2 font-medium">
                  ¡Ahorras {formatCLP(calculation.individualMonthlyAverage - calculation.monthlyEquivalent)} cada mes comparado con el precio individual!
                </p>

                {/* Monthly Payment Schedule */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">
                    Cronograma de Pagos Mensuales
                  </p>
                  <div className="space-y-3">
                    {calculation.monthlyPayments.map((payment: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${payment.isSummer ? "bg-amber-500" : "bg-blue-400"}`}
                          ></div>
                          <span className="text-sm font-medium capitalize">
                            {payment.monthName}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-emerald-400">
                          {formatCLP(payment.total)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-stone-500 mt-4 italic">
                    * Los valores varían según la estacionalidad (Verano: 4
                    visitas, Invierno: 2 visitas) y servicios programados.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-stone-300">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>
                    {calculation.visits.gardenVisits} Visitas de Jardín
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-300">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>
                    {calculation.visits.poolVisits} Mantenciones de Piscina
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-300">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>
                    {calculation.visits.carWashes} Lavados de Auto
                  </span>
                </div>
                {calculation.visits.windowCleanings > 0 && (
                  <div className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>
                      {calculation.visits.windowCleanings} Limpiezas de Vidrios
                    </span>
                  </div>
                )}
                {calculation.visits.pavementCleanings > 0 && (
                  <div className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>
                      {calculation.visits.pavementCleanings} Hidrolavados
                      Adoquines ({config.pavementM2} m²)
                    </span>
                  </div>
                )}
              </div>

              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 group">
                Contratar Ahora
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </section>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
              <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Nota:</strong> Los precios son estimados según el
                metraje y segmentación seleccionada. Sujeto a factibilidad
                técnica y validación en terreno.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};