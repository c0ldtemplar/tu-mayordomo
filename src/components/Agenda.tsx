import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Send,
  X,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Client, Appointment } from '../types';

interface AgendaProps {
  onClose: () => void;
}

export const Agenda: React.FC<AgendaProps> = ({ onClose }) => {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('tm_clients');
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('tm_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState<'calendar' | 'clients'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tm_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('tm_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
    );
  }, [clients, searchQuery]);

  const appointmentsOnSelectedDate = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return appointments.filter(a => a.date === dateStr);
  }, [appointments, selectedDate]);

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newClient: Client = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };
    setClients([...clients, newClient]);
    setShowClientModal(false);
  };

  const handleAddAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAppt: Appointment = {
      id: crypto.randomUUID(),
      clientId: formData.get('clientId') as string,
      serviceType: formData.get('serviceType') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      status: 'pending',
      notified: { whatsapp: false, email: false }
    };
    setAppointments([...appointments, newAppt]);
    setShowAddModal(false);
  };

  const sendWhatsApp = (appt: Appointment) => {
    const client = clients.find(c => c.id === appt.clientId);
    if (!client) return;

    const message = `Hola ${client.name}, te recordamos tu visita de "TU MAYORDOMO" para el servicio de ${appt.serviceType} el día ${appt.date} a las ${appt.time}. ¡Te esperamos!`;
    const url = `https://wa.me/${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setAppointments(prev => prev.map(a => 
      a.id === appt.id ? { ...a, notified: { ...a.notified, whatsapp: true } } : a
    ));
  };

  const sendEmail = (appt: Appointment) => {
    const client = clients.find(c => c.id === appt.clientId);
    if (!client) return;

    const subject = `Recordatorio de Visita - TU MAYORDOMO`;
    const body = `Hola ${client.name},\n\nEste es un recordatorio de tu próxima visita para el servicio de ${appt.serviceType}.\n\nFecha: ${appt.date}\nHora: ${appt.time}\n\nSi necesitas reprogramar, por favor contáctanos.\n\nSaludos,\nEquipo TU MAYORDOMO`;
    const url = `mailto:${client.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');

    setAppointments(prev => prev.map(a => 
      a.id === appt.id ? { ...a, notified: { ...a.notified, email: true } } : a
    ));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
    setAppointments(prev => prev.filter(a => a.clientId !== id));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-5xl h-[90vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-2xl">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-stone-900 uppercase">Agenda Interactiva</h2>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Gestión de Visitas y Notificaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'calendar' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:bg-stone-100'}`}
            >
              Calendario
            </button>
            <button 
              onClick={() => setView('clients')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'clients' ? 'bg-stone-900 text-white' : 'text-stone-400 hover:bg-stone-100'}`}
            >
              Clientes
            </button>
            <div className="w-px h-6 bg-stone-200 mx-2" />
            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {view === 'calendar' ? (
            <>
              {/* Calendar Sidebar */}
              <div className="w-80 border-r border-stone-100 p-6 bg-stone-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-stone-900 uppercase text-sm tracking-widest">Seleccionar Fecha</h3>
                  <div className="flex gap-1">
                    <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))} className="p-1 hover:bg-stone-200 rounded-lg"><ChevronLeft size={16}/></button>
                    <button onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))} className="p-1 hover:bg-stone-200 rounded-lg"><ChevronRight size={16}/></button>
                  </div>
                </div>
                
                {/* Simple Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-8">
                  {['D','L','M','M','J','V','S'].map(d => <div key={d} className="text-[10px] font-black text-stone-400 text-center py-2">{d}</div>)}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() + 1;
                    const isToday = day === new Date().getDate() && selectedDate.getMonth() === new Date().getMonth();
                    const isSelected = day === selectedDate.getDate();
                    const isValid = day > 0 && day <= new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                    
                    return (
                      <button 
                        key={i}
                        disabled={!isValid}
                        onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                        className={`
                          aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all
                          ${!isValid ? 'opacity-0 pointer-events-none' : ''}
                          ${isSelected ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-stone-200 text-stone-600'}
                          ${isToday && !isSelected ? 'border-2 border-emerald-500 text-emerald-600' : ''}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
                >
                  <Plus size={16} />
                  Nueva Visita
                </button>
              </div>

              {/* Day View */}
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter text-stone-900">
                      {new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }).format(selectedDate)}
                    </h3>
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mt-1">
                      {appointmentsOnSelectedDate.length} Visitas Programadas
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {appointmentsOnSelectedDate.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-stone-300">
                      <Clock size={48} strokeWidth={1} className="mb-4" />
                      <p className="font-bold uppercase tracking-widest text-xs">No hay visitas para este día</p>
                    </div>
                  ) : (
                    appointmentsOnSelectedDate.sort((a, b) => a.time.localeCompare(b.time)).map(appt => {
                      const client = clients.find(c => c.id === appt.clientId);
                      return (
                        <motion.div 
                          layout
                          key={appt.id}
                          className="group p-6 bg-stone-50 rounded-[24px] border border-stone-100 hover:border-emerald-500/30 hover:bg-white hover:shadow-xl transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-stone-200 rounded-2xl flex items-center justify-center text-stone-500 font-black text-lg">
                                {appt.time}
                              </div>
                              <div>
                                <h4 className="font-black text-stone-900 text-lg leading-tight">{client?.name || 'Cliente Desconocido'}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[9px] font-black uppercase tracking-widest">
                                    {appt.serviceType}
                                  </span>
                                  <div className="flex items-center gap-1 text-stone-400 text-[10px] font-bold">
                                    <MapPin size={10} />
                                    {client?.address}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => sendWhatsApp(appt)}
                                className={`p-3 rounded-xl transition-all ${appt.notified.whatsapp ? 'bg-emerald-500 text-white' : 'bg-white border border-stone-200 text-stone-400 hover:text-emerald-500 hover:border-emerald-500'}`}
                                title="Enviar WhatsApp"
                              >
                                <MessageCircle size={18} />
                              </button>
                              <button 
                                onClick={() => sendEmail(appt)}
                                className={`p-3 rounded-xl transition-all ${appt.notified.email ? 'bg-blue-500 text-white' : 'bg-white border border-stone-200 text-stone-400 hover:text-blue-500 hover:border-blue-500'}`}
                                title="Enviar Correo"
                              >
                                <Mail size={18} />
                              </button>
                              <button 
                                onClick={() => deleteAppointment(appt.id)}
                                className="p-3 bg-white border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-500 rounded-xl transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Clients View */
            <div className="flex-1 p-8 overflow-y-auto bg-stone-50/30">
              <div className="flex items-center justify-between mb-8">
                <div className="relative w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar cliente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <button 
                  onClick={() => setShowClientModal(true)}
                  className="px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Plus size={16} />
                  Nuevo Cliente
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClients.map(client => (
                  <motion.div 
                    layout
                    key={client.id}
                    className="p-6 bg-white rounded-[24px] border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-stone-900 leading-tight">{client.name}</h4>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{client.phone}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Mail size={14} className="text-stone-300" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <MapPin size={14} className="text-stone-300" />
                        {client.address}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => deleteClient(client.id)}
                        className="flex-1 py-2 bg-stone-50 text-stone-400 hover:bg-red-50 hover:text-red-500 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[110] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-stone-900 mb-6 uppercase tracking-tighter">Programar Visita</h3>
              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Cliente</label>
                  <select name="clientId" required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="">Seleccionar cliente...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Servicio</label>
                  <select name="serviceType" required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                    <option value="Jardinería">Jardinería</option>
                    <option value="Piscina">Piscina</option>
                    <option value="Lavado de Auto">Lavado de Auto</option>
                    <option value="Vidrios">Vidrios</option>
                    <option value="Adoquines">Adoquines</option>
                    <option value="Fumigación">Fumigación</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Fecha</label>
                    <input type="date" name="date" required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Hora</label>
                    <input type="time" name="time" required className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 bg-stone-100 text-stone-500 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancelar</button>
                  <button type="submit" className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">Guardar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showClientModal && (
          <div className="fixed inset-0 z-[110] bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-black text-stone-900 mb-6 uppercase tracking-tighter">Nuevo Cliente</h3>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Nombre Completo</label>
                  <input type="text" name="name" required placeholder="Ej: Juan Pérez" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Correo Electrónico</label>
                  <input type="email" name="email" required placeholder="juan@ejemplo.com" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">WhatsApp (con código de país)</label>
                  <input type="tel" name="phone" required placeholder="Ej: 56912345678" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Dirección</label>
                  <input type="text" name="address" required placeholder="Ej: Av. Las Condes 1234" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowClientModal(false)} className="flex-1 py-4 bg-stone-100 text-stone-500 rounded-2xl font-black uppercase tracking-widest text-[10px]">Cancelar</button>
                  <button type="submit" className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">Crear Cliente</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
