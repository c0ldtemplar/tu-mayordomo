import React from "react";
import {
  Leaf,
  Droplets,
  Car,
  Layout as WindowIcon,
  Grid3X3,
  UserCheck,
} from "lucide-react";

export const Servicios: React.FC = () => {
  return (
    <section id="servicios" className="pt-24 mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          Especialización técnica en cada área para un resultado impecable.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: <Leaf className="text-emerald-600" />,
            title: "Jardinería",
            desc: "Corte de césped, poda, fertilización y control de plagas estacional.",
          },
          {
            icon: <Droplets className="text-blue-500" />,
            title: "Piscinas",
            desc: "Equilibrio químico, limpieza de filtros y aspirado profundo.",
          },
          {
            icon: <Car className="text-amber-500" />,
            title: "Car Detailing",
            desc: "Lavado premium exterior e interior con productos de alta gama.",
          },
          {
            icon: <WindowIcon className="text-blue-400" />,
            title: "Vidrios",
            desc: "Limpieza de ventanales en altura con acabados sin rayas.",
          },
          {
            icon: <Grid3X3 className="text-stone-600" />,
            title: "Adoquines",
            desc: "Hidrolavado a presión y tratamiento anti-musgo.",
          },
          {
            icon: <UserCheck className="text-emerald-500" />,
            title: "Mayordomía",
            desc: "Supervisión integral y reportes de estado de tu propiedad.",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-3xl border border-stone-100 hover:border-emerald-200 transition-all group"
          >
            <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
              {s.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{s.title}</h4>
            <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
