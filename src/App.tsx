/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  Leaf,
  Droplets,
  CheckCircle2,
  ChevronRight,
  Calendar,
  ArrowRight,
  Instagram,
  Facebook,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Store,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Agenda } from "./components/Agenda";
import {
  PlanType,
  Period,
  GardenSize,
  GardenFrequency,
  VehicleSegment,
  WindowPanes,
  WindowFrequency,
  PavementFrequency,
  ServiceConfig,
  UNIT_PRICES,
  DISCOUNTS,
  ExtraService,
  ChecklistItem,
  ChecklistState,
  SimConfig,
} from "./types";
import { Marketplace } from "./components/Marketplace";
import { Brokers } from "./components/Brokers";
import { Beneficios } from "./components/Beneficios";
import { Encuesta } from "./components/Encuesta";
import { DashboardOperaciones } from "./components/DashboardOperaciones";
import { calculatePlanMetrics } from "./calculations";
import { Cotizador } from "./components/Cotizador";
import { QuienesSomos } from "./components/QuienesSomos";
import { Servicios } from "./components/Servicios";

const Isotype = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Outer Glow */}
    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>

    {/* Diamond Base */}
    <div className="absolute inset-0 bg-stone-900 rounded-xl transform rotate-45 scale-90 border border-white/10 shadow-2xl"></div>

    {/* Inner Diamond with Gradient Border */}
    <div className="absolute inset-0 bg-stone-900 rounded-xl transform rotate-45 scale-[0.82] border border-emerald-500/50 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]"></div>

    {/* Content */}
    <div className="relative flex flex-col items-center justify-center">
      <div className="text-emerald-500 mb-0.5 transform -translate-y-0.5">
        <ShieldCheck size={26} strokeWidth={2.5} />
      </div>
      <div className="absolute bottom-1.5 flex items-center gap-0.5">
        <span className="text-[7px] font-black tracking-[0.3em] uppercase text-white/90">
          Premium
        </span>
      </div>
    </div>

    {/* Accent Dot */}
    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
  </div>
);

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/56912345678"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-emerald-500 text-stone-900 p-4 rounded-full shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all group"
  >
    <div className="relative">
      <MessageCircle size={28} fill="currentColor" className="text-stone-900" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-emerald-500 animate-pulse"></span>
    </div>
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-black uppercase tracking-widest text-xs pr-2">
      Chat WhatsApp
    </span>
  </motion.a>
);

export default function App() {
  const [config, setConfig] = useState<ServiceConfig>({
    plan: PlanType.BASIC,
    period: Period.QUARTER,
    startMonth: new Date().getMonth(),
    startDay: new Date().getDate(),
    gardenSize: GardenSize.SMALL,
    gardenFreq: GardenFrequency.STANDARD,
    vehicles: [VehicleSegment.MEDIUM],
    windowPanes: WindowPanes.MEDIUM,
    pavementM2: 25,
    extras: [
      { service: ExtraService.IRRIGATION, dimension: 4 },
      { service: ExtraService.PEST_HOME, dimension: 140 },
      { service: ExtraService.BBQ_CLEANING, dimension: 1 },
    ],
  });

  const [showInternal, setShowInternal] = useState(false);

  const [checklist, setChecklist] = useState<ChecklistState>({
    presencia: [
      { id: "p1", text: "Uniforme completo y limpio", checked: false },
      { id: "p2", text: "Saludo formal al cliente", checked: false },
      { id: "p3", text: "Sin música/celular personal", checked: false },
    ],
    seguridad: [
      { id: "s1", text: "Registro entrada en App", checked: false },
      { id: "s2", text: "Resguardo de mascotas", checked: false },
      { id: "s3", text: "Verificación de cierres/llaves", checked: false },
    ],
    jardin: [
      { id: "j1", text: "Orillado recto y limpio", checked: false },
      { id: "j2", text: "Limpieza total de hojas", checked: false },
      { id: "j3", text: "Revisión de plagas/riego", checked: false },
    ],
    piscina: [
      { id: "pi1", text: "Fondo aspirado", checked: false },
      { id: "pi2", text: "Medición pH y Cloro", checked: false },
      { id: "pi3", text: "Limpieza de skimmers", checked: false },
    ],
    reporte: [
      { id: "r1", text: "Foto ANTES del servicio", checked: false },
      { id: "r2", text: "Foto DESPUÉS del servicio", checked: false },
      { id: "r3", text: "Reporte de novedades enviado", checked: false },
    ],
  });

  const toggleChecklistItem = (category: keyof ChecklistState, id: string) => {
    setChecklist((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    }));
  };
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showBrokers, setShowBrokers] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);

  const [simConfig, setSimConfig] = useState<SimConfig>({
    totalHouses: 22,
    basicPct: 50,
    standardPct: 30,
    premiumPct: 20,
    efficiency: 100,
    salaryBase: 650000,
    salaryLead: 850000,
    suppliesPerHouse: 25000,
    marketingBudget: 300000,
    growthRate: 0.1,
    marketplaceAttachRate: 30, // 30% of houses use marketplace monthly
    avgMarketplaceServiceValue: 85000, // Average service value in CLP
    marketplaceCommissionPct: 12, // 12% commission for the platform
    brokerPacksPerMonth: 4, // 4 handover packs per month
    brokerPackPrice: 299990, // Standard unified price
    brokerPackCost: 180000, // Estimated cost (labor + supplies)
  });

  useEffect(() => {
    if (showInternal) {
      setTimeout(() => {
        const element = document.getElementById("operaciones-panel");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [showInternal]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const calculation = useMemo(
    () => calculatePlanMetrics(config, simConfig),
    [config, simConfig],
  );

  const formatCLP = (val: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(val);

  return (
    <div className="min-h-screen pb-20 bg-stone-50">
      <WhatsAppButton />

      <AnimatePresence>
        {showAgenda && <Agenda onClose={() => setShowAgenda(false)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="bg-stone-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Casa moderna con jardín y adoquines"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
        </div>

        <nav className="max-w-6xl mx-auto relative z-20 flex justify-between items-center mb-16">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("hero")}
          >
            <Isotype className="w-12 h-12" />
            <span className="text-2xl font-black tracking-tighter uppercase">
              Tu Mayordomo
            </span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-stone-300">
            <button
              onClick={() => scrollTo("quienes-somos")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Quiénes Somos
            </button>
            <button
              onClick={() => scrollTo("servicios")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollTo("agenda-section")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollTo("planes")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Planes
            </button>
            <button
              onClick={() => scrollTo("beneficios")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollTo("encuesta")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Encuesta
            </button>
            <button
              onClick={() => scrollTo("contacto")}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAgenda(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              <Calendar size={14} />
              Agenda
            </button>
            <button
              onClick={() => setShowBrokers(!showBrokers)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"
            >
              <Building2 size={14} />
              Corredoras
            </button>
            <button
              onClick={() => setShowMarketplace(!showMarketplace)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all"
            >
              <Store size={14} />
              Marketplace
            </button>
            <button
              onClick={() => setShowInternal(!showInternal)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 border border-white/10 text-stone-400 text-[10px] font-black uppercase tracking-widest hover:bg-stone-700 transition-all"
            >
              <ShieldCheck size={14} />
              Operaciones
            </button>
          </div>
        </nav>

        <Brokers show={showBrokers} onClose={() => setShowBrokers(false)} />
        <Marketplace
          show={showMarketplace}
          onClose={() => setShowMarketplace(false)}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500 text-stone-900 text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
              Excelencia en Colina
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight uppercase">
              Tu Hogar,
              <br />
              <span className="text-emerald-400">Nuestra Misión.</span>
            </h1>
            <p className="text-stone-300 text-xl md:text-2xl max-w-2xl mb-10 font-light leading-relaxed">
              Mantenimiento experto para hogares de alto estándar en Colina.
              Jardines vibrantes, piscinas cristalinas y adoquines impecables.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-500 text-stone-900 font-black uppercase tracking-widest rounded-xl hover:bg-emerald-400 transition-all transform hover:scale-105">
                Ver Planes
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/20 transition-all">
                Cotizar Personalizado
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-10">
        <QuienesSomos />
        <Servicios />

        {/* Agenda Section - New for better discoverability */}
        <section id="agenda-section" className="mb-24">
          <div className="bg-stone-900 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 text-emerald-500">
              <Calendar size={240} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-emerald-500 text-stone-900 text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                Herramienta de Gestión
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tighter">
                Tu Agenda <span className="text-emerald-400">Interactiva</span>
              </h2>
              <p className="text-stone-400 text-lg mb-10 leading-relaxed">
                Gestiona tus visitas, mantén tu base de datos de clientes y
                envía recordatorios automáticos por WhatsApp y Email con un solo
                clic.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowAgenda(true)}
                  className="px-8 py-4 bg-emerald-500 text-stone-900 font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/20"
                >
                  <Calendar size={20} />
                  Abrir Agenda Ahora
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-stone-900 bg-stone-800 flex items-center justify-center overflow-hidden"
                      >
                        <img
                          src={`https://picsum.photos/seed/${i + 10}/100/100`}
                          alt="User"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Utilizada por +50 administradores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Cotizador
          config={config}
          setConfig={setConfig}
          calculation={calculation}
        />

        {/* Advantages Section */}
        <section className="mt-32 mb-32">
          <div className="bg-stone-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-3xl font-black uppercase mb-8 text-emerald-400">
                  Ventajas del Plan vs Individual
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Banknote className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Ahorro Económico</h4>
                      <p className="text-sm text-stone-400">
                        Hasta un 25% de descuento real al paquetizar servicios
                        versus contrataciones sueltas.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Smartphone className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Gestión Centralizada</h4>
                      <p className="text-sm text-stone-400">
                        Un solo contacto por WhatsApp para coordinar todo. Sin
                        múltiples agendas.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">
                        Mantenimiento Preventivo
                      </h4>
                      <p className="text-sm text-stone-400">
                        Al tener visitas regulares, detectamos problemas antes
                        de que se conviertan en reparaciones costosas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-bold mb-6">Comparativa de Valor</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-stone-400">
                      <th className="text-left pb-4 font-medium">Servicio</th>
                      <th className="text-right pb-4 font-medium">
                        Individual
                      </th>
                      <th className="text-right pb-4 font-medium text-emerald-400">
                        En Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-200">
                    <tr className="border-b border-white/5">
                      <td className="py-4">Jardín (Visita)</td>
                      <td className="text-right">$40.000</td>
                      <td className="text-right text-emerald-400">$30.000</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4">Piscina (Visita)</td>
                      <td className="text-right">$25.000</td>
                      <td className="text-right text-emerald-400">$18.750</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-4">Auto (Lavado Full)</td>
                      <td className="text-right">$15.000</td>
                      <td className="text-right text-emerald-400">$11.250</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold">Ahorro Promedio</td>
                      <td className="text-right text-stone-500">-</td>
                      <td className="text-right font-bold text-emerald-400">
                        15% - 25%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <Beneficios />
        <Encuesta />

        <DashboardOperaciones
          show={showInternal}
          simConfig={simConfig}
          setSimConfig={setSimConfig}
          calculation={calculation}
          checklist={checklist}
          toggleChecklistItem={toggleChecklistItem}
        />

        {/* Contact & Social Section */}
        <section id="contacto" className="pt-24 mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
                  Contacto
                </h2>
                <p className="text-stone-500">
                  Estamos listos para cuidar tu hogar. Contáctanos por
                  cualquiera de nuestros canales oficiales.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://wa.me/56912345678"
                  target="_blank"
                  className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      WhatsApp Business
                    </p>
                    <p className="text-lg font-bold text-stone-900">
                      +56 9 1234 5678
                    </p>
                  </div>
                  <ArrowRight className="ml-auto text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-200 transition-all"
                  >
                    <Instagram className="text-pink-600" size={20} />
                    <span className="font-bold text-sm">@tumayordomo.cl</span>
                  </a>
                  <a
                    href="#"
                    className="flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-200 transition-all"
                  >
                    <Facebook className="text-blue-600" size={20} />
                    <span className="font-bold text-sm">Tu Mayordomo</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-100">
                <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">
                  Formas de Pago
                </h4>
                <div className="flex flex-wrap gap-6 items-center opacity-60">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} />
                    <span className="text-xs font-bold">
                      Webpay / Transbank
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote size={20} />
                    <span className="text-xs font-bold">
                      Transferencia Bancaria
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone size={20} />
                    <span className="text-xs font-bold">Pago Móvil</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-stone-100">
              <h3 className="text-xl font-bold mb-6">Envíanos un mensaje</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="+56 9..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">
                    Mensaje
                  </label>
                  <textarea
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>
                <button className="w-full py-4 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors">
                  Enviar Solicitud
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Features Grid (Existing, moved below) */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              ¿Por qué elegir nuestros packs?
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Simplificamos el mantenimiento de tu hogar en Colina con un
              servicio profesional y coordinado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Un solo proveedor",
                desc: "Olvida coordinar con 5 empresas distintas. Una sola agenda, un solo pago.",
                icon: <CheckCircle2 className="text-emerald-500" />,
              },
              {
                title: "Ahorro Garantizado",
                desc: "Nuestros paquetes ofrecen descuentos reales de hasta el 30% versus servicios individuales.",
                icon: <Droplets className="text-blue-500" />,
              },
              {
                title: "Eco-Productos",
                desc: "Utilizamos productos biodegradables para cuidar tu jardín y el medio ambiente local.",
                icon: <Leaf className="text-emerald-600" />,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl border border-stone-100 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-32 pt-24 pb-12 px-6 border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Isotype className="w-12 h-12" />
                <span className="text-2xl font-black tracking-tighter uppercase">
                  Tu Mayordomo
                </span>
              </div>
              <p className="text-stone-500 max-w-sm text-sm leading-relaxed font-medium">
                Servicio premium de mantenimiento integral para hogares de alto
                estándar en Colina y alrededores. Excelencia, confianza y
                tranquilidad en cada visita.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">
                Navegación
              </h4>
              <ul className="space-y-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
                <li>
                  <button
                    onClick={() => scrollTo("hero")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("quienes-somos")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Quiénes Somos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("servicios")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("planes")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Planes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("beneficios")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Beneficios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("encuesta")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Encuesta
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("contacto")}
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">
                Legal
              </h4>
              <ul className="space-y-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Garantía de Servicio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-400">
                © 2026 Tu Mayordomo SpA. Todos los derechos reservados.
              </p>
              <button
                onClick={() => setShowInternal(!showInternal)}
                className="text-[9px] font-black uppercase tracking-[0.2em] text-stone-300 hover:text-emerald-500 transition-colors text-left"
              >
                {showInternal ? "Ocultar" : "Mostrar"} Panel de Operaciones
              </button>
            </div>
            <div className="flex gap-8">
              <a
                href="#"
                className="text-stone-400 hover:text-pink-600 transition-all transform hover:scale-110"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-stone-400 hover:text-blue-600 transition-all transform hover:scale-110"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/56912345678"
                className="text-stone-400 hover:text-emerald-500 transition-all transform hover:scale-110"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
