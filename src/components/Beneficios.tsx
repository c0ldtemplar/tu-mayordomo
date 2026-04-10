import React from "react";
import { Users, Gift, Trophy, MessageCircle } from "lucide-react";

export const Beneficios: React.FC = () => {
  return (
    <section id="beneficios" className="pt-24 mb-24">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 border border-emerald-100">
          Crezcamos Juntos
        </span>
        <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
          Club de Beneficios & Referidos
        </h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          En Tu Mayordomo premiamos tu confianza. Refiere a tus vecinos y amigos
          para obtener beneficios exclusivos en tu plan mensual.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
            Refiere a un Vecino
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Por cada vecino que contrate un plan anual por tu recomendación,
            ambos reciben un{" "}
            <span className="text-emerald-600 font-bold">15% de descuento</span>{" "}
            en su próxima mensualidad.
          </p>
          <div className="pt-6 border-t border-stone-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
              Beneficio Inmediato
            </span>
          </div>
        </div>

        <div className="bg-stone-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
          <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6">
            <Gift size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
            Meta: 3 Referidos
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed mb-6">
            Al alcanzar 3 referidos activos, obtienes un{" "}
            <span className="text-emerald-400 font-bold">Mes Gratis</span> de
            mantenimiento de piscina o Car Detailing Full para un vehículo.
          </p>
          <div className="pt-6 border-t border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              Recompensa Especial
            </span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <Trophy size={28} />
          </div>
          <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">
            Embajador Premium
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Con 5 referidos activos, te conviertes en Embajador. Recibes un{" "}
            <span className="text-amber-600 font-bold">Upgrade de Plan</span>{" "}
            (ej: de Estándar a Premium) sin costo adicional de por vida.
          </p>
          <div className="pt-6 border-t border-stone-50">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
              Estatus Vitalicio
            </span>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-emerald-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
            <MessageCircle size={32} />
          </div>
          <div>
            <h4 className="font-bold text-lg">¿Tienes a alguien en mente?</h4>
            <p className="text-sm text-stone-500">
              Compártenos su contacto y nosotros nos encargamos del resto.
            </p>
          </div>
        </div>
        <button className="px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
          Enviar Referido vía WhatsApp
        </button>
      </div>
    </section>
  );
};
