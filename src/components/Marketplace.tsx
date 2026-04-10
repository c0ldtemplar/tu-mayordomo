import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store,
  Plus,
  Zap,
  Droplets,
  Construction,
  Wind,
  Flame,
  Stethoscope,
  Baby,
  Hammer,
  Smartphone,
} from "lucide-react";

interface MarketplaceProps {
  show: boolean;
  onClose: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ show, onClose }) => {
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
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                      <Store size={32} />
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter text-white">
                      Marketplace de{" "}
                      <span className="text-emerald-400">Ecosistema</span>
                    </h2>
                  </div>
                  <p className="text-stone-400 max-w-xl">
                    Conectamos a nuestros clientes con proveedores certificados
                    en servicios complementarios. Una plataforma de confianza
                    para todo lo que tu hogar necesita.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-4 bg-stone-800 rounded-full hover:bg-stone-700 transition-all text-white"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    icon: <Zap />,
                    title: "Electricidad",
                    desc: "Instalaciones, reparaciones y certificación SEC.",
                  },
                  {
                    icon: <Droplets />,
                    title: "Gasfitería",
                    desc: "Filtraciones, mantención de calefont y redes.",
                  },
                  {
                    icon: <Construction />,
                    title: "Construcción",
                    desc: "Terrazas, ampliaciones y remodelaciones.",
                  },
                  {
                    icon: <Wind />,
                    title: "Climatización",
                    desc: "Instalación y mantención de Aire Acondicionado.",
                  },
                  {
                    icon: <Flame />,
                    title: "Parrillas",
                    desc: "Limpieza profunda y mantención de parrillas a gas.",
                  },
                  {
                    icon: <Stethoscope />,
                    title: "Veterinaria",
                    desc: "Atención médica y vacunas a domicilio.",
                  },
                  {
                    icon: <Baby />,
                    title: "Baby Sitter",
                    desc: "Cuidado infantil con personal verificado.",
                  },
                  {
                    icon: <Hammer />,
                    title: "Multiservicios",
                    desc: "Reparaciones menores y armado de muebles.",
                  },
                  {
                    icon: <Smartphone />,
                    title: "Tecnología",
                    desc: "Redes, cámaras de seguridad y domótica.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-stone-800/50 border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400 group-hover:text-emerald-400 mb-4 transition-all">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[32px]">
                <div>
                  <h4 className="text-xl font-black text-white mb-2">
                    ¿Eres un proveedor de servicios?
                  </h4>
                  <p className="text-sm text-stone-400">
                    Únete a nuestra red y llega a cientos de hogares premium en
                    la zona.
                  </p>
                </div>
                <button className="px-8 py-4 bg-emerald-500 text-stone-900 font-black uppercase tracking-widest text-xs rounded-full hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                  Postular como Proveedor
                </button>
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
