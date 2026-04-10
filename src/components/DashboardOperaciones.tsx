import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Target,
  Users,
  ShieldCheck,
  Leaf,
  Waves,
  Smartphone,
  CheckCircle2,
  Calculator,
  Instagram,
} from "lucide-react";
import { SimConfig, ChecklistState, ChecklistItem } from "../types";

interface DashboardOperacionesProps {
  show: boolean;
  simConfig: SimConfig;
  setSimConfig: React.Dispatch<React.SetStateAction<SimConfig>>;
  calculation: any; // Using any here for simplicity, ideally we'd export the ReturnType of calculatePlanMetrics
  checklist: ChecklistState;
  toggleChecklistItem: (category: keyof ChecklistState, id: string) => void;
}

export const DashboardOperaciones: React.FC<DashboardOperacionesProps> = ({
  show,
  simConfig,
  setSimConfig,
  calculation,
  checklist,
  toggleChecklistItem,
}) => {
  const formatCLP = (val: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(val);

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          id="operaciones-panel"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-24 bg-stone-900 text-white rounded-[3rem] p-12 overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-400">
                Panel de Operaciones (Interno)
              </h2>
              <p className="text-stone-400 text-sm mt-2">
                Métricas de capacidad y tiempos estimados para equipo de 3
                personas.
              </p>
            </div>
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Confidencial
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">
                Capacidad del Equipo
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">160</span>
                <span className="text-stone-400 text-sm mb-1">Horas/Mes</span>
              </div>
              <p className="text-xs text-stone-500 mt-4 leading-relaxed">
                Basado en 40h semanales de servicio efectivo (trabajo en bloque).
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">
                Carga del Plan Actual
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-emerald-400">
                  {calculation.avgMonthlyOpHours.toFixed(1)}
                </span>
                <span className="text-stone-400 text-sm mb-1">Horas/Mes</span>
              </div>
              <p className="text-xs text-stone-500 mt-4 leading-relaxed">
                Promedio mensual de horas requeridas para este cliente
                específico.
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">
                Capacidad de Clientes
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-emerald-400">
                  {Math.floor(160 / calculation.avgMonthlyOpHours)}
                </span>
                <span className="text-stone-400 text-sm mb-1">
                  Clientes/Equipo
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-4 leading-relaxed">
                Número máximo de clientes similares que este equipo puede
                atender.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Target size={20} className="text-emerald-400" />
                Mix de Trabajo (Horas Hombre / Mes)
              </h3>
              <div className="space-y-4">
                {[
                  {
                    label: "Jardinería",
                    hours: calculation.avgMonthlyOpHoursPerService.garden,
                    color: "bg-emerald-500",
                  },
                  {
                    label: "Piscinas",
                    hours: calculation.avgMonthlyOpHoursPerService.pool,
                    color: "bg-blue-500",
                  },
                  {
                    label: "Car Detailing",
                    hours: calculation.avgMonthlyOpHoursPerService.car,
                    color: "bg-amber-500",
                  },
                  {
                    label: "Vidrios",
                    hours: calculation.avgMonthlyOpHoursPerService.windows,
                    color: "bg-blue-400",
                  },
                  {
                    label: "Adoquines",
                    hours: calculation.avgMonthlyOpHoursPerService.pavement,
                    color: "bg-stone-500",
                  },
                  {
                    label: "Especiales",
                    hours: calculation.avgMonthlyOpHoursPerService.extras,
                    color: "bg-pink-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-300">{item.label}</span>
                      <span className="font-black text-emerald-400">
                        {item.hours.toFixed(1)}h
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-full transition-all duration-500`}
                        style={{
                          width: `${(item.hours / calculation.avgMonthlyOpHours) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm font-bold">Total Mix Mensual</span>
                  <span className="text-lg font-black text-emerald-400">
                    {calculation.avgMonthlyOpHours.toFixed(1)}h
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Users size={20} className="text-emerald-400" />
                Capacidad por Tipo de Plan
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Plan Básico</span>
                    <span className="text-xs text-stone-400">~18.5h / mes</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: "11.5%" }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-2">
                    Capacidad: 8-9 clientes por equipo.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Plan Estándar</span>
                    <span className="text-xs text-stone-400">~20.5h / mes</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: "12.8%" }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-2">
                    Capacidad: 7-8 clientes por equipo.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Plan Premium</span>
                    <span className="text-xs text-stone-400">~24.5h / mes</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: "15.3%" }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-stone-500 mt-2">
                    Capacidad: 6-7 clientes por equipo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  Checklist Digital de Visita
                </h3>
              </div>
              <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">
                Protocolo de Excelencia Operativa
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {(
                Object.entries(checklist) as [
                  keyof ChecklistState,
                  ChecklistItem[],
                ][]
              ).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-white/5 p-6 rounded-3xl border border-white/10"
                >
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                    {category === "presencia" && <Users size={12} />}
                    {category === "seguridad" && <ShieldCheck size={12} />}
                    {category === "jardin" && <Leaf size={12} />}
                    {category === "piscina" && <Waves size={12} />}
                    {category === "reporte" && <Smartphone size={12} />}
                    {category}
                  </h4>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleChecklistItem(category, item.id)}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group ${
                          item.checked
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : "bg-white/5 border border-transparent hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            item.checked
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-stone-600 group-hover:border-stone-400"
                          }`}
                        >
                          {item.checked && (
                            <CheckCircle2 size={12} className="text-stone-900" />
                          )}
                        </div>
                        <span
                          className={`text-[11px] leading-tight transition-colors ${
                            item.checked
                              ? "text-emerald-400 font-bold"
                              : "text-stone-400"
                          }`}
                        >
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">
                Simulador de Mix y Personal
              </h3>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                    Total de Casas Proyectadas
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={simConfig.totalHouses}
                      onChange={(e) =>
                        setSimConfig({
                          ...simConfig,
                          totalHouses: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 accent-emerald-500"
                    />
                    <span className="text-2xl font-black w-16 text-center">
                      {simConfig.totalHouses}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                    Eficiencia Operativa (%)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={simConfig.efficiency}
                      onChange={(e) =>
                        setSimConfig({
                          ...simConfig,
                          efficiency: parseInt(e.target.value),
                        })
                      }
                      className="flex-1 accent-emerald-500"
                    />
                    <span className="text-2xl font-black w-16 text-center">
                      {simConfig.efficiency}%
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    Ajusta el tiempo dedicado por casa (menor % = más
                    rápido/eficiente).
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    Variables Marketplace
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-stone-400">Tasa de Adopción (%)</span>
                      <span className="text-white">
                        {simConfig.marketplaceAttachRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={simConfig.marketplaceAttachRate}
                      onChange={(e) =>
                        setSimConfig({
                          ...simConfig,
                          marketplaceAttachRate: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <p className="text-xs font-black uppercase tracking-widest text-stone-500">
                    Mix de Planes (%)
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Básico</span>
                      <span>{simConfig.basicPct}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={simConfig.basicPct}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const remaining = 100 - val;
                        const ratio =
                          simConfig.standardPct + simConfig.premiumPct === 0
                            ? 0.5
                            : simConfig.standardPct /
                              (simConfig.standardPct + simConfig.premiumPct);
                        setSimConfig({
                          ...simConfig,
                          basicPct: val,
                          standardPct: Math.round(remaining * ratio),
                          premiumPct: 100 - val - Math.round(remaining * ratio),
                        });
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-stone-900 p-8 rounded-3xl border border-white/5">
                  <h4 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-8">
                    Estado de Resultados (Proyectado)
                  </h4>
                  <div className="space-y-6">
                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">
                          Utilidad Neta Inversionista
                        </p>
                        <p className="text-4xl font-black text-emerald-400">
                          {formatCLP(
                            calculation.simResults.financials.netProfit,
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">
                          Margen Neto
                        </p>
                        <p className="text-xl font-bold text-white">
                          {calculation.simResults.financials.margin.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 bg-stone-900 p-8 rounded-3xl border border-white/5">
                  <h4 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-8">
                    Proyección Anual de Crecimiento
                  </h4>
                  <div className="h-[300px] w-full mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={calculation.simResults.financials.projection}
                      >
                        <defs>
                          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="month" stroke="#78716c" fontSize={10} tickFormatter={(val) => `Mes ${val}`} />
                        <YAxis stroke="#78716c" fontSize={10} tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#1c1917", border: "1px solid #444", borderRadius: "12px" }}
                          itemStyle={{ fontSize: "12px" }}
                          formatter={(value: any) => [formatCLP(value), "Utilidad"]}
                          labelFormatter={(label) => `Mes ${label}`}
                        />
                        <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};