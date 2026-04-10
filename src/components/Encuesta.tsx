import React from "react";
import { Star } from "lucide-react";

export const Encuesta: React.FC = () => {
  return (
    <section id="encuesta" className="pt-24 mb-24">
      <div className="bg-emerald-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 border border-emerald-500/30">
              Tu Opinión nos Importa
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">
              Encuesta de Satisfacción
            </h2>
            <p className="text-emerald-100/70 max-w-xl mx-auto">
              Ayúdanos a mantener la excelencia. Tu feedback es fundamental para
              seguir mejorando nuestro servicio premium.
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-stone-900 shadow-2xl">
            <form
              className="space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "¡Gracias por tu feedback! Lo procesaremos de inmediato.",
                );
              }}
            >
              {/* Overall Satisfaction */}
              <div className="space-y-6">
                <label className="block text-center text-sm font-black uppercase tracking-widest text-stone-400">
                  ¿Cómo calificarías tu experiencia general?
                </label>
                <div className="flex justify-center gap-4 md:gap-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="group flex flex-col items-center gap-2 transition-all hover:scale-110"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-300 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
                        <Star size={28} fill="currentColor" strokeWidth={0} />
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        {star === 1 ? "Pobre" : star === 5 ? "Excelente" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Specific Aspects */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                      Profesionalismo del Equipo
                    </label>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className="w-10 h-10 rounded-xl border-2 border-stone-100 flex items-center justify-center text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all"
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                      Puntualidad y Cumplimiento
                    </label>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          className="w-10 h-10 rounded-xl border-2 border-stone-100 flex items-center justify-center text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all"
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Services Used */}
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                    Servicios Evaluados
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Jardinería",
                      "Piscinas",
                      "Car Detailing",
                      "Vidrios",
                      "Adoquines",
                    ].map((s) => (
                      <label
                        key={s}
                        className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-xs font-bold text-stone-600">
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* NPS */}
              <div className="space-y-6 pt-6 border-t border-stone-100">
                <label className="block text-center text-sm font-black uppercase tracking-widest text-stone-500">
                  ¿Qué tan probable es que nos recomiendes a un amigo o vecino?
                </label>
                <div className="flex justify-between gap-1 max-w-2xl mx-auto">
                  {Array.from({ length: 11 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="flex-1 aspect-square rounded-lg border border-stone-100 flex items-center justify-center text-xs font-bold hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
                    >
                      {i}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest px-2">
                  <span>Nada Probable</span>
                  <span>Muy Probable</span>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-4">
                <label className="block text-xs font-black uppercase tracking-widest text-stone-500">
                  Comentarios Adicionales
                </label>
                <textarea
                  className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32 transition-all"
                  placeholder="Cuéntanos más sobre tu experiencia..."
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-6 border-t border-stone-100">
                <p className="text-[10px] text-stone-400 max-w-xs leading-relaxed">
                  Al enviar esta encuesta, nos autorizas a procesar tus datos
                  para mejorar nuestro servicio. Tu privacidad es nuestra
                  prioridad.
                </p>
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-4 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20 active:scale-95"
                >
                  Enviar Encuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
