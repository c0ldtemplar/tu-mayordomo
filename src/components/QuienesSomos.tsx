import React from "react";
import { motion } from "motion/react";
import { Target, Eye, Users, ShieldCheck } from "lucide-react";

export const QuienesSomos: React.FC = () => {
  return (
    <section id="quienes-somos" className="pt-24 mb-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Quiénes Somos
          </h2>
          <p className="text-stone-600 leading-relaxed">
            En <strong>TU MAYORDOMO</strong>, redefinimos el mantenimiento del
            hogar en Colina. Nacimos de la necesidad de ofrecer un servicio de
            excelencia, coordinado y profesional para las residencias más
            exigentes de la zona.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <Target className="text-emerald-500 mb-3" size={24} />
              <h4 className="font-bold mb-2">Misión</h4>
              <p className="text-xs text-stone-500">
                Proporcionar tranquilidad y excelencia a través de servicios
                integrales personalizados.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
              <Eye className="text-emerald-500 mb-3" size={24} />
              <h4 className="font-bold mb-2">Visión</h4>
              <p className="text-xs text-stone-500">
                Ser el referente de mayordomía de hogares en Chile, destacando
                por innovación y calidad.
              </p>
            </div>
          </div>

          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-emerald-600" size={24} />
              <h4 className="font-bold text-emerald-900">
                Equipo y Estrategia
              </h4>
            </div>
            <p className="text-sm text-emerald-800 leading-relaxed">
              Contamos con un equipo de especialistas en paisajismo,
              mantenimiento técnico de piscinas y detailing automotriz. Nuestra
              estrategia se basa en la <strong>integración vertical</strong>: un
              solo equipo altamente capacitado que conoce cada rincón de tu
              hogar.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=1000"
              alt="Equipo trabajando"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-[240px]">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-emerald-500" size={20} />
              <span className="font-bold text-sm">Garantía Total</span>
            </div>
            <p className="text-[10px] text-stone-500">
              Si un servicio no cumple tu expectativa, lo repetimos sin costo
              adicional.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
