import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Plus,
  Calculator,
  Leaf,
  Droplets,
  Layout as WindowIcon,
  Grid3X3,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface BrokersProps {
  show: boolean;
  onClose: () => void;
}

const formatCLP = (val: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(val);

export const Brokers: React.FC<BrokersProps> = ({ show, onClose }) => {
  const [brokerConfig, setBrokerConfig] = useState({
    includeGarden: true,
    gardenSize: 1000,
    gardenComplexity: 1,
    includePool: true,
    poolSize: 6,
    poolState: 1,
    includeWindows: true,
    windowPanes: 40,
    windowHeight: 1,
    includePavement: true,
    pavementM2: 30,
    pavementDirt: 1,
  });

  const brokerPrices = {
    gardenBase: 110000,
    poolBase: 50000,
    windowBase: 110000,
    pavementBase: 130000,
  };

  const brokerCalculation = useMemo(() => {
    let totalMarket = 0;
    if (brokerConfig.includeGarden) {
      totalMarket +=
        brokerPrices.gardenBase *
        (brokerConfig.gardenSize / 1000) *
        brokerConfig.gardenComplexity;
    }
    if (brokerConfig.includePool) {
      totalMarket +=
        brokerPrices.poolBase *
        (brokerConfig.poolSize / 6) *
        brokerConfig.poolState;
    }
    if (brokerConfig.includeWindows) {
      totalMarket +=
        brokerPrices.windowBase *
        (brokerConfig.windowPanes / 40) *
        brokerConfig.windowHeight;
    }
    if (brokerConfig.includePavement) {
      totalMarket +=
        brokerPrices.pavementBase *
        (brokerConfig.pavementM2 / 30) *
        brokerConfig.pavementDirt;
    }

    const discount = totalMarket * 0.25;
    const finalPrice = totalMarket - discount;

    return { totalMarket, discount, finalPrice };
  }, [brokerConfig]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 md:p-12 bg-stone-950/90 backdrop-blur-xl overflow-y-auto scroll-smooth"
        >
          <div className="w-full max-w-5xl bg-stone-900 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12 pb-24">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                      <Building2 size={32} />
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-white">
                      Convenio para{" "}
                      <span className="text-blue-400">Corredoras</span>
                    </h2>
                  </div>
                  <p className="text-stone-400 max-w-xl">
                    Soluciones integrales para la entrega y recepción de
                    propiedades. Asegura una primera impresión impecable para
                    tus clientes con nuestro estándar de excelencia.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-4 bg-stone-800 rounded-full hover:bg-stone-700 transition-all text-white"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                  <div className="p-8 bg-stone-800/50 rounded-[32px] border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                      <Calculator size={20} className="text-blue-400" />
                      Configurador de Entrega
                    </h3>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${brokerConfig.includeGarden ? "bg-emerald-500/20 text-emerald-400" : "bg-stone-700 text-stone-500"}`}
                            >
                              <Leaf size={18} />
                            </div>
                            <span className="font-bold text-white">
                              Puesta a Punto Jardín
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setBrokerConfig({
                                ...brokerConfig,
                                includeGarden: !brokerConfig.includeGarden,
                              })
                            }
                            className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includeGarden ? "bg-emerald-500" : "bg-stone-700"}`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includeGarden ? "right-1" : "left-1"}`}
                            />
                          </button>
                        </div>
                        {brokerConfig.includeGarden && (
                          <div className="pl-11 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                <span>Superficie Terreno</span>
                                <span className="text-white">
                                  {brokerConfig.gardenSize} m²
                                </span>
                              </div>
                              <input
                                type="range"
                                min="250"
                                max="2500"
                                step="250"
                                value={brokerConfig.gardenSize}
                                onChange={(e) =>
                                  setBrokerConfig({
                                    ...brokerConfig,
                                    gardenSize: parseInt(e.target.value),
                                  })
                                }
                                className="w-full accent-emerald-500"
                              />
                            </div>
                            <div className="flex gap-2">
                              {[
                                { label: "Estándar", val: 1 },
                                { label: "Complejo", val: 1.25 },
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  onClick={() =>
                                    setBrokerConfig({
                                      ...brokerConfig,
                                      gardenComplexity: opt.val,
                                    })
                                  }
                                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.gardenComplexity === opt.val ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-stone-800 border-white/5 text-stone-500"}`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${brokerConfig.includePool ? "bg-blue-500/20 text-blue-400" : "bg-stone-700 text-stone-500"}`}
                            >
                              <Droplets size={18} />
                            </div>
                            <span className="font-bold text-white">
                              Recuperación Piscina
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setBrokerConfig({
                                ...brokerConfig,
                                includePool: !brokerConfig.includePool,
                              })
                            }
                            className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includePool ? "bg-blue-500" : "bg-stone-700"}`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includePool ? "right-1" : "left-1"}`}
                            />
                          </button>
                        </div>
                        {brokerConfig.includePool && (
                          <div className="pl-11 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                <span>Largo Piscina</span>
                                <span className="text-white">
                                  {brokerConfig.poolSize} metros
                                </span>
                              </div>
                              <input
                                type="range"
                                min="3"
                                max="12"
                                step="1"
                                value={brokerConfig.poolSize}
                                onChange={(e) =>
                                  setBrokerConfig({
                                    ...brokerConfig,
                                    poolSize: parseInt(e.target.value),
                                  })
                                }
                                className="w-full accent-blue-500"
                              />
                            </div>
                            <div className="flex gap-2">
                              {[
                                { label: "Mantención", val: 1 },
                                { label: "Recuperación", val: 1.4 },
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  onClick={() =>
                                    setBrokerConfig({
                                      ...brokerConfig,
                                      poolState: opt.val,
                                    })
                                  }
                                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.poolState === opt.val ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-stone-800 border-white/5 text-stone-500"}`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${brokerConfig.includeWindows ? "bg-sky-500/20 text-sky-400" : "bg-stone-700 text-stone-500"}`}
                            >
                              <WindowIcon size={18} />
                            </div>
                            <span className="font-bold text-white">
                              Limpieza de Vidrios
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setBrokerConfig({
                                ...brokerConfig,
                                includeWindows: !brokerConfig.includeWindows,
                              })
                            }
                            className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includeWindows ? "bg-sky-500" : "bg-stone-700"}`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includeWindows ? "right-1" : "left-1"}`}
                            />
                          </button>
                        </div>
                        {brokerConfig.includeWindows && (
                          <div className="pl-11 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                <span>Cantidad de Paños</span>
                                <span className="text-white">
                                  {brokerConfig.windowPanes} paños
                                </span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="80"
                                step="5"
                                value={brokerConfig.windowPanes}
                                onChange={(e) =>
                                  setBrokerConfig({
                                    ...brokerConfig,
                                    windowPanes: parseInt(e.target.value),
                                  })
                                }
                                className="w-full accent-sky-500"
                              />
                            </div>
                            <div className="flex gap-2">
                              {[
                                { label: "Altura Simple", val: 1 },
                                { label: "Doble Altura", val: 1.3 },
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  onClick={() =>
                                    setBrokerConfig({
                                      ...brokerConfig,
                                      windowHeight: opt.val,
                                    })
                                  }
                                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.windowHeight === opt.val ? "bg-sky-500/20 border-sky-500 text-sky-400" : "bg-stone-800 border-white/5 text-stone-500"}`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${brokerConfig.includePavement ? "bg-stone-500/20 text-stone-400" : "bg-stone-700 text-stone-500"}`}
                            >
                              <Grid3X3 size={18} />
                            </div>
                            <span className="font-bold text-white">
                              Lavado de Adoquines
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setBrokerConfig({
                                ...brokerConfig,
                                includePavement: !brokerConfig.includePavement,
                              })
                            }
                            className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includePavement ? "bg-stone-500" : "bg-stone-700"}`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includePavement ? "right-1" : "left-1"}`}
                            />
                          </button>
                        </div>
                        {brokerConfig.includePavement && (
                          <div className="pl-11 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                <span>Superficie Pavimento</span>
                                <span className="text-white">
                                  {brokerConfig.pavementM2} m²
                                </span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                step="5"
                                value={brokerConfig.pavementM2}
                                onChange={(e) =>
                                  setBrokerConfig({
                                    ...brokerConfig,
                                    pavementM2: parseInt(e.target.value),
                                  })
                                }
                                className="w-full accent-stone-500"
                              />
                            </div>
                            <div className="flex gap-2">
                              {[
                                { label: "Suciedad Leve", val: 1 },
                                { label: "Suciedad Pesada", val: 1.2 },
                              ].map((opt) => (
                                <button
                                  key={opt.label}
                                  onClick={() =>
                                    setBrokerConfig({
                                      ...brokerConfig,
                                      pavementDirt: opt.val,
                                    })
                                  }
                                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.pavementDirt === opt.val ? "bg-stone-500/20 border-stone-500 text-stone-400" : "bg-stone-800 border-white/5 text-stone-500"}`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-stone-800/50 rounded-2xl border border-white/5">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-blue-400" />{" "}
                        Agendamiento Prioritario
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        Atención en menos de 48 horas para cierres de negocio
                        urgentes.
                      </p>
                    </div>
                    <div className="p-6 bg-stone-800/50 rounded-2xl border border-white/5">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-blue-400" />{" "}
                        Reporte de Entrega
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        Registro fotográfico del antes y después para tu cliente
                        final.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 order-1 lg:order-2">
                  <div className="aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl mb-6">
                    <img
                      src="/images/broker-handover.png"
                      alt="Entrega de llaves profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[32px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <ShieldCheck size={120} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-6">
                      Resumen de Cotización
                    </h3>
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-200">Valor Mercado</span>
                        <span className="text-white font-bold">
                          {formatCLP(brokerCalculation.totalMarket)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-300">
                          Descuento Convenio (25%)
                        </span>
                        <span className="text-emerald-300 font-bold">
                          -{formatCLP(brokerCalculation.discount)}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">
                              Precio Final Corredora
                            </p>
                            <p className="text-4xl font-black text-white">
                              {formatCLP(brokerCalculation.finalPrice)}
                            </p>
                          </div>
                          <p className="text-[10px] text-blue-200 mb-1">
                            + IVA
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-4 bg-white text-blue-600 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2">
                      Solicitar Pack <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xl font-black text-white">
                    Beneficios del Convenio
                  </h4>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Facturación Centralizada",
                        desc: "Emitimos factura única por todos los servicios.",
                      },
                      {
                        title: "Tarifa Plana",
                        desc: "Sin sorpresas. Valor unificado para casas de hasta 1.000m2.",
                      },
                      {
                        title: "Garantía de Satisfacción",
                        desc: "Si el cliente final no está conforme, volvemos sin costo.",
                      },
                    ].map((benefit, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <h5 className="text-white font-bold text-sm mb-1">
                            {benefit.title}
                          </h5>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 bg-stone-800 rounded-3xl border border-white/5">
                  <h4 className="text-lg font-bold text-white mb-4">
                    ¿Eres corredor autónomo o agencia?
                  </h4>
                  <p className="text-sm text-stone-400 mb-6">
                    Inscríbete para acceder a las tarifas preferenciales y
                    agendamiento VIP.
                  </p>
                  <button className="w-full py-4 bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/20">
                    Solicitar Activación de Convenio
                  </button>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/5 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-stone-800 text-stone-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-stone-700 hover:text-white transition-all"
                >
                  Cerrar Ventana
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
