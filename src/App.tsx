/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  Leaf, 
  Droplets, 
  Car, 
  Layout as WindowIcon, 
  Grid3X3, 
  Calculator, 
  CheckCircle2, 
  ChevronRight,
  Calendar,
  Info,
  ArrowRight,
  UserCheck,
  Instagram,
  Facebook,
  MessageCircle,
  Target,
  Eye,
  Users,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Sun,
  Snowflake,
  Wrench,
  Bug,
  SunMedium,
  Waves,
  Plus,
  Trash2,
  Star,
  Gift,
  Trophy,
  Flame,
  Store,
  Hammer,
  Zap,
  Baby,
  Stethoscope,
  Wind,
  Construction,
  Building2,
  Key,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Agenda } from './components/Agenda';
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
  ExtraService
} from './types';

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
        <span className="text-[7px] font-black tracking-[0.3em] uppercase text-white/90">Premium</span>
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
  interface ChecklistItem {
    id: string;
    text: string;
    checked: boolean;
  }

  interface ChecklistState {
    presencia: ChecklistItem[];
    seguridad: ChecklistItem[];
    jardin: ChecklistItem[];
    piscina: ChecklistItem[];
    reporte: ChecklistItem[];
  }

  const [checklist, setChecklist] = useState<ChecklistState>({
    presencia: [
      { id: 'p1', text: 'Uniforme completo y limpio', checked: false },
      { id: 'p2', text: 'Saludo formal al cliente', checked: false },
      { id: 'p3', text: 'Sin música/celular personal', checked: false },
    ],
    seguridad: [
      { id: 's1', text: 'Registro entrada en App', checked: false },
      { id: 's2', text: 'Resguardo de mascotas', checked: false },
      { id: 's3', text: 'Verificación de cierres/llaves', checked: false },
    ],
    jardin: [
      { id: 'j1', text: 'Orillado recto y limpio', checked: false },
      { id: 'j2', text: 'Limpieza total de hojas', checked: false },
      { id: 'j3', text: 'Revisión de plagas/riego', checked: false },
    ],
    piscina: [
      { id: 'pi1', text: 'Fondo aspirado', checked: false },
      { id: 'pi2', text: 'Medición pH y Cloro', checked: false },
      { id: 'pi3', text: 'Limpieza de skimmers', checked: false },
    ],
    reporte: [
      { id: 'r1', text: 'Foto ANTES del servicio', checked: false },
      { id: 'r2', text: 'Foto DESPUÉS del servicio', checked: false },
      { id: 'r3', text: 'Reporte de novedades enviado', checked: false },
    ]
  });

  const toggleChecklistItem = (category: keyof ChecklistState, id: string) => {
    setChecklist(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };
  const [showMarketplace, setShowMarketplace] = useState(false);
  const [showBrokers, setShowBrokers] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);

  // Broker Configurator State
  const [brokerConfig, setBrokerConfig] = useState({
    includeGarden: true,
    gardenSize: 1000,
    gardenComplexity: 1, // 1: Standard, 1.2: High
    includePool: true,
    poolSize: 6, // meters
    poolState: 1, // 1: Standard, 1.3: Green/Recovery
    includeWindows: true,
    windowPanes: 40,
    windowHeight: 1, // 1: Standard, 1.2: Double Height
    includePavement: true,
    pavementM2: 30,
    pavementDirt: 1 // 1: Light, 1.2: Heavy
  });

  const brokerPrices = {
    gardenBase: 110000, // For 1000m2
    poolBase: 50000, // For 6m pool
    windowBase: 110000, // For 40 panes
    pavementBase: 130000, // For 30m2
  };

  const brokerCalculation = useMemo(() => {
    let totalMarket = 0;
    if (brokerConfig.includeGarden) {
      totalMarket += (brokerPrices.gardenBase * (brokerConfig.gardenSize / 1000)) * brokerConfig.gardenComplexity;
    }
    if (brokerConfig.includePool) {
      totalMarket += (brokerPrices.poolBase * (brokerConfig.poolSize / 6)) * brokerConfig.poolState;
    }
    if (brokerConfig.includeWindows) {
      totalMarket += (brokerPrices.windowBase * (brokerConfig.windowPanes / 40)) * brokerConfig.windowHeight;
    }
    if (brokerConfig.includePavement) {
      totalMarket += (brokerPrices.pavementBase * (brokerConfig.pavementM2 / 30)) * brokerConfig.pavementDirt;
    }

    const discount = totalMarket * 0.25;
    const finalPrice = totalMarket - discount;

    return { totalMarket, discount, finalPrice };
  }, [brokerConfig]);

  const [simConfig, setSimConfig] = useState({
    totalHouses: 22,
    basicPct: 50,
    standardPct: 30,
    premiumPct: 20,
    efficiency: 100,
    salaryBase: 650000,
    salaryLead: 850000,
    suppliesPerHouse: 25000,
    marketingBudget: 300000,
    growthRate: 0.10,
    marketplaceAttachRate: 30, // 30% of houses use marketplace monthly
    avgMarketplaceServiceValue: 85000, // Average service value in CLP
    marketplaceCommissionPct: 12, // 12% commission for the platform
    brokerPacksPerMonth: 4, // 4 handover packs per month
    brokerPackPrice: 299990, // Standard unified price
    brokerPackCost: 180000 // Estimated cost (labor + supplies)
  });

  useEffect(() => {
    if (showInternal) {
      setTimeout(() => {
        const element = document.getElementById('operaciones-panel');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [showInternal]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculation = useMemo(() => {
    let months = 12;
    if (config.period === Period.SEMESTER) months = 6;
    else if (config.period === Period.QUARTER) months = 3;

    // Internal Metrics (Team of 3)
    const WORK_TIMES = {
      GARDEN: { [GardenSize.SMALL]: 1.5, [GardenSize.MEDIUM]: 3, [GardenSize.LARGE]: 5 },
      POOL: 0.75,
      CAR_WASH: 1,
      WINDOWS: { [WindowPanes.SMALL]: 1.5, [WindowPanes.MEDIUM]: 2.5, [WindowPanes.LARGE]: 4 },
      PAVEMENT: 1, // per 50m2
      EXTRAS: {
        [ExtraService.IRRIGATION]: 0.5, // per zone
        [ExtraService.GUTTERS]: 0.05,   // per meter
        [ExtraService.SOLAR]: 0.15,     // per panel
        [ExtraService.PEST_HOME]: 0.005, // per m2
        [ExtraService.PEST_TREES]: 0.25, // per tree
        [ExtraService.BBQ_CLEANING]: 2.5 // per service
      }
    };

    // Seasonality calculation
    // Summer: Oct (9) to Mar (2)
    // Winter: Apr (3) to Sep (8)
    const startMonth = config.startMonth;
    let summerMonths = 0;
    let winterMonths = 0;

    for (let i = 0; i < months; i++) {
      const currentMonth = (startMonth + i) % 12;
      // Verano: Octubre (9) a Marzo (2)
      // Invierno: Abril (3) a Septiembre (8)
      const isSummerMonth = (currentMonth >= 9 || currentMonth <= 2);
      if (isSummerMonth) {
        summerMonths++;
      } else {
        winterMonths++;
      }
    }

    // 1. Garden Visits
    // Rule: 4 visits/month in summer, 2 visits/month in winter
    const gardenSummerVisits = summerMonths * 4;
    const gardenWinterVisits = winterMonths * 2;
    const gardenVisits = gardenSummerVisits + gardenWinterVisits;

    // 2. Pool Visits (Same as garden)
    const poolSummerVisits = summerMonths * 4;
    const poolWinterVisits = winterMonths * 2;
    const poolVisits = poolSummerVisits + poolWinterVisits;

    // 3. Car Washes
    // Basic: 2 washes/car/month. Standard/Premium: 4 washes/car/month.
    const washesPerCarPerMonth = config.plan === PlanType.BASIC ? 2 : 4;
    const carWashes = months * washesPerCarPerMonth * config.vehicles.length;

    // 4. Window Cleanings
    // Basic/Standard: 1 per quarter (3m->1, 6m->2, 12m->4)
    // Premium: 2 per quarter (3m->2, 6m->4, 12m->6)
    let windowCleanings = 0;
    if (config.plan === PlanType.PREMIUM) {
      if (months === 12) windowCleanings = 6;
      else if (months === 6) windowCleanings = 4;
      else windowCleanings = 2;
    } else {
      windowCleanings = Math.ceil(months / 3);
    }

    // 5. Pavement Cleanings
    // All plans: 1 per quarter (3m->1, 6m->2, 12m->4)
    const pavementCleanings = Math.ceil(months / 3);

    // Operational Hours (Team of 3)
    const opHours = {
      garden: gardenVisits * WORK_TIMES.GARDEN[config.gardenSize],
      pool: poolVisits * WORK_TIMES.POOL,
      car: carWashes * WORK_TIMES.CAR_WASH,
      windows: windowCleanings * WORK_TIMES.WINDOWS[config.windowPanes],
      pavement: pavementCleanings * (config.pavementM2 / 50 * WORK_TIMES.PAVEMENT),
      extras: config.extras.reduce((acc, extra) => acc + (WORK_TIMES.EXTRAS[extra.service] * extra.dimension), 0)
    };

    const totalOpHours = Object.values(opHours).reduce((a, b) => a + b, 0);
    const avgMonthlyOpHours = (opHours.garden + opHours.pool + opHours.car + opHours.windows + opHours.pavement) / months;
    const avgMonthlyOpHoursPerService = {
      garden: opHours.garden / months,
      pool: opHours.pool / months,
      car: opHours.car / months,
      windows: opHours.windows / months,
      pavement: opHours.pavement / months,
      extras: opHours.extras // Total hours for on-demand
    };

    const vehicleCosts = config.vehicles.reduce((acc, segment) => {
      return acc + (months * washesPerCarPerMonth * UNIT_PRICES.CAR_WASH[segment]);
    }, 0);

    const costs = {
      garden: gardenVisits * UNIT_PRICES.GARDEN[config.gardenSize],
      pool: poolVisits * UNIT_PRICES.POOL,
      car: vehicleCosts,
      windows: windowCleanings * UNIT_PRICES.WINDOWS[config.windowPanes],
      pavement: pavementCleanings * (config.pavementM2 * UNIT_PRICES.PAVEMENT_PER_M2),
    };

    const onDemandCosts = config.extras.reduce((acc, extra) => {
      return acc + (UNIT_PRICES.EXTRAS[extra.service] * extra.dimension);
    }, 0);

    const totalIndividual = Object.values(costs).reduce((a, b) => a + b, 0);

    const monthlyPayments = [];
    const serviceBreakdown = {
      garden: [] as { month: string, cost: number, isSummer: boolean }[],
      pool: [] as { month: string, cost: number, isSummer: boolean }[],
      car: [] as { month: string, cost: number }[],
      windows: [] as { month: string, cost: number }[],
      pavement: [] as { month: string, cost: number }[]
    };

    // Costos base (sin descuento)
    const monthlyCarCost = costs.car / months;
    const monthlyWindowCost = costs.windows / months;
    const monthlyPavementCost = costs.pavement / months;

    for (let i = 0; i < months; i++) {
      const currentMonth = (startMonth + i) % 12;
      const monthName = new Intl.DateTimeFormat('es-CL', { month: 'short' }).format(new Date(2024, currentMonth));
      const isSummer = (currentMonth >= 9 || currentMonth <= 2);
      
      const gardenVisitsThisMonth = isSummer ? 4 : 2;
      const poolVisitsThisMonth = isSummer ? 4 : 2;
      
      const gardenCost = gardenVisitsThisMonth * UNIT_PRICES.GARDEN[config.gardenSize];
      const poolCost = poolVisitsThisMonth * UNIT_PRICES.POOL;
      
      serviceBreakdown.garden.push({ month: monthName, cost: gardenCost, isSummer });
      serviceBreakdown.pool.push({ month: monthName, cost: poolCost, isSummer });
      serviceBreakdown.car.push({ month: monthName, cost: monthlyCarCost });
      serviceBreakdown.windows.push({ month: monthName, cost: monthlyWindowCost });
      serviceBreakdown.pavement.push({ month: monthName, cost: monthlyPavementCost });

      const totalMonthIndividual = gardenCost + poolCost + monthlyCarCost + monthlyWindowCost + monthlyPavementCost;
      
      monthlyPayments.push({
        monthName: new Intl.DateTimeFormat('es-CL', { month: 'long' }).format(new Date(2024, currentMonth)),
        isSummer,
        total: totalMonthIndividual // Guardamos el total individual por ahora
      });
    }

    const planDiscount = DISCOUNTS[config.plan];
    const periodDiscount = config.period === Period.ANNUAL ? 0.10 : (config.period === Period.SEMESTER ? 0.05 : 0);
    
    const totalPlan = totalIndividual * (1 - planDiscount) * (1 - periodDiscount);
    const savings = totalIndividual - totalPlan;

    // Calculate Simulation Results directly (we are already inside a useMemo)
    const basicHours = 18.5;
    const standardHours = 20.5;
    const premiumHours = 24.5;

    // Estimated Monthly Revenue per Plan (Annualized average)
    const basicRevenue = 148665;
    const standardRevenue = 176880;
    const premiumRevenue = 324225;

    const efficiencyFactor = simConfig.efficiency / 100;

    const housesBasic = (simConfig.totalHouses * simConfig.basicPct) / 100;
    const housesStandard = (simConfig.totalHouses * simConfig.standardPct) / 100;
    const housesPremium = (simConfig.totalHouses * simConfig.premiumPct) / 100;

    const marketplaceRevenue = simConfig.totalHouses * (simConfig.marketplaceAttachRate / 100) * simConfig.avgMarketplaceServiceValue * (simConfig.marketplaceCommissionPct / 100);
    const brokerRevenue = simConfig.brokerPacksPerMonth * simConfig.brokerPackPrice;
    const brokerProfit = simConfig.brokerPacksPerMonth * (simConfig.brokerPackPrice - simConfig.brokerPackCost);
    
    const coreMonthlySales = (housesBasic * basicRevenue) + (housesStandard * standardRevenue) + (housesPremium * premiumRevenue);
    const totalMonthlySales = coreMonthlySales + marketplaceRevenue + brokerRevenue;
    
    const totalMonthlyHours = ((housesBasic * basicHours) + (housesStandard * standardHours) + (housesPremium * premiumHours) + (simConfig.brokerPacksPerMonth * 8)) * efficiencyFactor;
    
    // Capacity: 160 hours per person per month
    const peopleNeeded = Math.ceil(totalMonthlyHours / 160);
    const teamsNeeded = Math.ceil(peopleNeeded / 3);
    const totalCapacityHours = teamsNeeded * 3 * 160;

    // Financials (Investor View)
    const totalSalaries = (teamsNeeded * 2 * simConfig.salaryBase) + (teamsNeeded * simConfig.salaryLead);
    const totalSupplies = simConfig.totalHouses * simConfig.suppliesPerHouse;
    const fixedCosts = 150000 * teamsNeeded; // Fuel, maintenance, insurance per team
    const marketingCost = simConfig.marketingBudget;
    const netProfit = totalMonthlySales - totalSalaries - totalSupplies - fixedCosts - marketingCost;

    // 12-Month Projection (Exponential Growth)
    let currentHouses = simConfig.totalHouses;
    const projection = Array.from({ length: 12 }, (_, i) => {
      if (i > 0) {
        currentHouses = currentHouses * (1 + simConfig.growthRate);
      }
      const monthHouses = Math.round(currentHouses);
      const monthTeams = Math.ceil(monthHouses / 22);
      const monthMarketplaceRevenue = monthHouses * (simConfig.marketplaceAttachRate / 100) * simConfig.avgMarketplaceServiceValue * (simConfig.marketplaceCommissionPct / 100);
      const monthBrokerRevenue = simConfig.brokerPacksPerMonth * simConfig.brokerPackPrice;
      const monthCoreRevenue = (monthHouses / simConfig.totalHouses) * coreMonthlySales;
      const monthRevenue = monthCoreRevenue + monthMarketplaceRevenue + monthBrokerRevenue;
      const monthSalaries = (monthTeams * 2 * simConfig.salaryBase) + (monthTeams * simConfig.salaryLead);
      const monthSupplies = (monthHouses * simConfig.suppliesPerHouse) + (simConfig.brokerPacksPerMonth * 40000); // Extra supplies for broker packs
      const monthFixed = monthTeams * 150000;
      const monthProfit = monthRevenue - monthSalaries - monthSupplies - monthFixed - marketingCost;
      
      return {
        month: i + 1,
        houses: monthHouses,
        revenue: monthRevenue,
        profit: monthProfit,
        teams: monthTeams
      };
    });

    const simResults = {
      houses: { basic: housesBasic, standard: housesStandard, premium: housesPremium },
      totalMonthlyHours,
      totalMonthlySales,
      teamsNeeded,
      peopleNeeded: teamsNeeded * 3, // Always in teams of 3
      utilization: (totalMonthlyHours / totalCapacityHours) * 100,
      financials: {
        totalSalaries,
        totalSupplies,
        fixedCosts,
        marketingCost,
        marketplaceRevenue,
        brokerRevenue,
        brokerProfit,
        coreMonthlySales,
        netProfit,
        margin: (netProfit / totalMonthlySales) * 100,
        projection
      }
    };

    return {
      visits: { 
        gardenVisits, gardenSummerVisits, gardenWinterVisits,
        poolVisits, poolSummerVisits, poolWinterVisits,
        carWashes, windowCleanings, pavementCleanings 
      },
      seasonality: { summerMonths, winterMonths },
      costs,
      opHours,
      totalOpHours,
      avgMonthlyOpHours,
      avgMonthlyOpHoursPerService,
      serviceBreakdown,
      totalIndividual,
      totalPlan,
      onDemandCosts,
      savings,
      discounts: {
        plan: planDiscount,
        period: periodDiscount
      },
      monthlyEquivalent: totalPlan / months,
      individualMonthlyAverage: totalIndividual / months,
      monthlyPayments: monthlyPayments.map(p => ({ ...p, total: p.total * (1 - planDiscount) * (1 - periodDiscount) })),
      simResults
    };

  }, [config, simConfig]);

  const formatCLP = (val: number) => 
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(val);

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
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <Isotype className="w-12 h-12" />
            <span className="text-2xl font-black tracking-tighter uppercase">Tu Mayordomo</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-stone-300">
            <button onClick={() => scrollTo('quienes-somos')} className="hover:text-emerald-400 transition-colors cursor-pointer">Quiénes Somos</button>
            <button onClick={() => scrollTo('servicios')} className="hover:text-emerald-400 transition-colors cursor-pointer">Servicios</button>
            <button onClick={() => scrollTo('agenda-section')} className="hover:text-emerald-400 transition-colors cursor-pointer">Agenda</button>
            <button onClick={() => scrollTo('planes')} className="hover:text-emerald-400 transition-colors cursor-pointer">Planes</button>
            <button onClick={() => scrollTo('beneficios')} className="hover:text-emerald-400 transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollTo('encuesta')} className="hover:text-emerald-400 transition-colors cursor-pointer">Encuesta</button>
            <button onClick={() => scrollTo('contacto')} className="hover:text-emerald-400 transition-colors cursor-pointer">Contacto</button>
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

        {/* Brokers Overlay */}
        <AnimatePresence>
          {showBrokers && (
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
                        <h2 className="text-4xl font-black tracking-tighter text-white">Convenio para <span className="text-blue-400">Corredoras</span></h2>
                      </div>
                      <p className="text-stone-400 max-w-xl">
                        Soluciones integrales para la entrega y recepción de propiedades. 
                        Asegura una primera impresión impecable para tus clientes con nuestro estándar de excelencia.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowBrokers(false)}
                      className="p-4 bg-stone-800 rounded-full hover:bg-stone-700 transition-all text-white"
                    >
                      <Plus className="rotate-45" size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Configurator Column */}
                    <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                      <div className="p-8 bg-stone-800/50 rounded-[32px] border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                          <Calculator size={20} className="text-blue-400" />
                          Configurador de Entrega
                        </h3>

                        <div className="space-y-8">
                          {/* Garden Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${brokerConfig.includeGarden ? 'bg-emerald-500/20 text-emerald-400' : 'bg-stone-700 text-stone-500'}`}>
                                  <Leaf size={18} />
                                </div>
                                <span className="font-bold text-white">Puesta a Punto Jardín</span>
                              </div>
                              <button 
                                onClick={() => setBrokerConfig({...brokerConfig, includeGarden: !brokerConfig.includeGarden})}
                                className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includeGarden ? 'bg-emerald-500' : 'bg-stone-700'}`}
                              >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includeGarden ? 'right-1' : 'left-1'}`} />
                              </button>
                            </div>
                            {brokerConfig.includeGarden && (
                              <div className="pl-11 space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    <span>Superficie Terreno</span>
                                    <span className="text-white">{brokerConfig.gardenSize} m²</span>
                                  </div>
                                  <input 
                                    type="range" min="250" max="2500" step="250" value={brokerConfig.gardenSize}
                                    onChange={(e) => setBrokerConfig({...brokerConfig, gardenSize: parseInt(e.target.value)})}
                                    className="w-full accent-emerald-500"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  {[
                                    { label: 'Estándar', val: 1 },
                                    { label: 'Complejo', val: 1.25 }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      onClick={() => setBrokerConfig({...brokerConfig, gardenComplexity: opt.val})}
                                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.gardenComplexity === opt.val ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-stone-800 border-white/5 text-stone-500'}`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Pool Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${brokerConfig.includePool ? 'bg-blue-500/20 text-blue-400' : 'bg-stone-700 text-stone-500'}`}>
                                  <Droplets size={18} />
                                </div>
                                <span className="font-bold text-white">Recuperación Piscina</span>
                              </div>
                              <button 
                                onClick={() => setBrokerConfig({...brokerConfig, includePool: !brokerConfig.includePool})}
                                className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includePool ? 'bg-blue-500' : 'bg-stone-700'}`}
                              >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includePool ? 'right-1' : 'left-1'}`} />
                              </button>
                            </div>
                            {brokerConfig.includePool && (
                              <div className="pl-11 space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    <span>Largo Piscina</span>
                                    <span className="text-white">{brokerConfig.poolSize} metros</span>
                                  </div>
                                  <input 
                                    type="range" min="3" max="12" step="1" value={brokerConfig.poolSize}
                                    onChange={(e) => setBrokerConfig({...brokerConfig, poolSize: parseInt(e.target.value)})}
                                    className="w-full accent-blue-500"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  {[
                                    { label: 'Mantención', val: 1 },
                                    { label: 'Recuperación', val: 1.4 }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      onClick={() => setBrokerConfig({...brokerConfig, poolState: opt.val})}
                                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.poolState === opt.val ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-stone-800 border-white/5 text-stone-500'}`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Windows Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${brokerConfig.includeWindows ? 'bg-sky-500/20 text-sky-400' : 'bg-stone-700 text-stone-500'}`}>
                                  <WindowIcon size={18} />
                                </div>
                                <span className="font-bold text-white">Limpieza de Vidrios</span>
                              </div>
                              <button 
                                onClick={() => setBrokerConfig({...brokerConfig, includeWindows: !brokerConfig.includeWindows})}
                                className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includeWindows ? 'bg-sky-500' : 'bg-stone-700'}`}
                              >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includeWindows ? 'right-1' : 'left-1'}`} />
                              </button>
                            </div>
                            {brokerConfig.includeWindows && (
                              <div className="pl-11 space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    <span>Cantidad de Paños</span>
                                    <span className="text-white">{brokerConfig.windowPanes} paños</span>
                                  </div>
                                  <input 
                                    type="range" min="10" max="80" step="5" value={brokerConfig.windowPanes}
                                    onChange={(e) => setBrokerConfig({...brokerConfig, windowPanes: parseInt(e.target.value)})}
                                    className="w-full accent-sky-500"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  {[
                                    { label: 'Altura Simple', val: 1 },
                                    { label: 'Doble Altura', val: 1.3 }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      onClick={() => setBrokerConfig({...brokerConfig, windowHeight: opt.val})}
                                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.windowHeight === opt.val ? 'bg-sky-500/20 border-sky-500 text-sky-400' : 'bg-stone-800 border-white/5 text-stone-500'}`}
                                    >
                                      {opt.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Pavement Section */}
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${brokerConfig.includePavement ? 'bg-stone-500/20 text-stone-400' : 'bg-stone-700 text-stone-500'}`}>
                                  <Grid3X3 size={18} />
                                </div>
                                <span className="font-bold text-white">Lavado de Adoquines</span>
                              </div>
                              <button 
                                onClick={() => setBrokerConfig({...brokerConfig, includePavement: !brokerConfig.includePavement})}
                                className={`w-12 h-6 rounded-full transition-all relative ${brokerConfig.includePavement ? 'bg-stone-500' : 'bg-stone-700'}`}
                              >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${brokerConfig.includePavement ? 'right-1' : 'left-1'}`} />
                              </button>
                            </div>
                            {brokerConfig.includePavement && (
                              <div className="pl-11 space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-stone-500">
                                    <span>Superficie Pavimento</span>
                                    <span className="text-white">{brokerConfig.pavementM2} m²</span>
                                  </div>
                                  <input 
                                    type="range" min="10" max="100" step="5" value={brokerConfig.pavementM2}
                                    onChange={(e) => setBrokerConfig({...brokerConfig, pavementM2: parseInt(e.target.value)})}
                                    className="w-full accent-stone-500"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  {[
                                    { label: 'Suciedad Leve', val: 1 },
                                    { label: 'Suciedad Pesada', val: 1.2 }
                                  ].map(opt => (
                                    <button
                                      key={opt.label}
                                      onClick={() => setBrokerConfig({...brokerConfig, pavementDirt: opt.val})}
                                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${brokerConfig.pavementDirt === opt.val ? 'bg-stone-500/20 border-stone-500 text-stone-400' : 'bg-stone-800 border-white/5 text-stone-500'}`}
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
                            <Calendar size={16} className="text-blue-400" />
                            Agendamiento Prioritario
                          </h4>
                          <p className="text-[10px] text-stone-500">Atención en menos de 48 horas para cierres de negocio urgentes.</p>
                        </div>
                        <div className="p-6 bg-stone-800/50 rounded-2xl border border-white/5">
                          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-400" />
                            Reporte de Entrega
                          </h4>
                          <p className="text-[10px] text-stone-500">Registro fotográfico del antes y después para tu cliente final.</p>
                        </div>
                      </div>
                    </div>

                    {/* Summary Column */}
                    <div className="space-y-6 order-1 lg:order-2">
                      <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[32px] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                          <ShieldCheck size={120} />
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-6">Resumen de Cotización</h3>
                        
                        <div className="space-y-4 mb-8">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-200">Valor Mercado</span>
                            <span className="text-white font-bold">{formatCLP(brokerCalculation.totalMarket)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-emerald-300">Descuento Convenio (25%)</span>
                            <span className="text-emerald-300 font-bold">-{formatCLP(brokerCalculation.discount)}</span>
                          </div>
                          <div className="pt-4 border-t border-white/20">
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Precio Final Corredora</p>
                                <p className="text-4xl font-black text-white">{formatCLP(brokerCalculation.finalPrice)}</p>
                              </div>
                              <p className="text-[10px] text-blue-200 mb-1">+ IVA</p>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-4 bg-white text-blue-600 font-black uppercase tracking-widest rounded-2xl hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2">
                          Solicitar Pack Personalizado
                          <ArrowRight size={18} />
                        </button>
                      </div>

                      <div className="p-8 bg-stone-800/50 rounded-[32px] border border-white/5">
                        <h4 className="text-xs font-black uppercase tracking-widest text-stone-500 mb-6">Servicios Seleccionados</h4>
                        <div className="space-y-4">
                          {brokerConfig.includeGarden && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-stone-300">Jardín ({brokerConfig.gardenSize}m² {brokerConfig.gardenComplexity > 1 ? '+ Complejo' : ''})</span>
                              <span className="text-white font-bold">{formatCLP((brokerPrices.gardenBase * (brokerConfig.gardenSize / 1000)) * brokerConfig.gardenComplexity)}</span>
                            </div>
                          )}
                          {brokerConfig.includePool && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-stone-300">Piscina ({brokerConfig.poolSize}m {brokerConfig.poolState > 1 ? '+ Recup.' : ''})</span>
                              <span className="text-white font-bold">{formatCLP((brokerPrices.poolBase * (brokerConfig.poolSize / 6)) * brokerConfig.poolState)}</span>
                            </div>
                          )}
                          {brokerConfig.includeWindows && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-stone-300">Vidrios ({brokerConfig.windowPanes} paños {brokerConfig.windowHeight > 1 ? '+ Doble Alt.' : ''})</span>
                              <span className="text-white font-bold">{formatCLP((brokerPrices.windowBase * (brokerConfig.windowPanes / 40)) * brokerConfig.windowHeight)}</span>
                            </div>
                          )}
                          {brokerConfig.includePavement && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-stone-300">Adoquines ({brokerConfig.pavementM2}m² {brokerConfig.pavementDirt > 1 ? '+ Pesado' : ''})</span>
                              <span className="text-white font-bold">{formatCLP((brokerPrices.pavementBase * (brokerConfig.pavementM2 / 30)) * brokerConfig.pavementDirt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-xl font-black text-white">Beneficios del Convenio</h4>
                      <div className="space-y-6">
                        {[
                          { title: "Facturación Centralizada", desc: "Emitimos factura única por todos los servicios realizados en el mes." },
                          { title: "Tarifa Plana", desc: "Sin sorpresas. Valor unificado para casas de hasta 1.000m2 de terreno." },
                          { title: "Garantía de Satisfacción", desc: "Si el cliente final no está conforme, volvemos sin costo adicional." },
                          { title: "Soporte Post-Venta", desc: "Ofrecemos planes de mantención con descuento para el nuevo propietario." },
                        ].map((benefit, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                              <CheckCircle2 size={20} />
                            </div>
                            <div>
                              <h5 className="text-white font-bold text-sm mb-1">{benefit.title}</h5>
                              <p className="text-xs text-stone-500 leading-relaxed">{benefit.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-8 bg-stone-800 rounded-3xl border border-white/5">
                      <h4 className="text-lg font-bold text-white mb-4">¿Eres corredor autónomo o agencia?</h4>
                      <p className="text-sm text-stone-400 mb-6">Inscríbete para acceder a las tarifas preferenciales y agendamiento VIP.</p>
                      <button className="w-full py-4 bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/20">
                        Solicitar Activación de Convenio
                      </button>
                    </div>
                  </div>

                  <div className="mt-12 pt-12 border-t border-white/5 flex justify-center">
                    <button 
                      onClick={() => setShowBrokers(false)}
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
        <AnimatePresence>
          {showMarketplace && (
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
                        <h2 className="text-4xl font-black tracking-tighter text-white">Marketplace de <span className="text-emerald-400">Ecosistema</span></h2>
                      </div>
                      <p className="text-stone-400 max-w-xl">
                        Conectamos a nuestros clientes con proveedores certificados en servicios complementarios. 
                        Una plataforma de confianza para todo lo que tu hogar necesita.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowMarketplace(false)}
                      className="p-4 bg-stone-800 rounded-full hover:bg-stone-700 transition-all text-white"
                    >
                      <Plus className="rotate-45" size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      { icon: <Zap />, title: "Electricidad", desc: "Instalaciones, reparaciones y certificación SEC." },
                      { icon: <Droplets />, title: "Gasfitería", desc: "Filtraciones, mantención de calefont y redes." },
                      { icon: <Construction />, title: "Construcción", desc: "Terrazas, ampliaciones y remodelaciones." },
                      { icon: <Wind />, title: "Climatización", desc: "Instalación y mantención de Aire Acondicionado." },
                      { icon: <Flame />, title: "Parrillas", desc: "Limpieza profunda y mantención de parrillas a gas." },
                      { icon: <Stethoscope />, title: "Veterinaria", desc: "Atención médica y vacunas a domicilio." },
                      { icon: <Baby />, title: "Baby Sitter", desc: "Cuidado infantil con personal verificado." },
                      { icon: <Hammer />, title: "Multiservicios", desc: "Reparaciones menores y armado de muebles." },
                      { icon: <Smartphone />, title: "Tecnología", desc: "Redes, cámaras de seguridad y domótica." },
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-stone-800/50 border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400 group-hover:text-emerald-400 mb-4 transition-all">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[32px]">
                    <div>
                      <h4 className="text-xl font-black text-white mb-2">¿Eres un proveedor de servicios?</h4>
                      <p className="text-sm text-stone-400">Únete a nuestra red y llega a cientos de hogares premium en la zona.</p>
                    </div>
                    <button className="px-8 py-4 bg-emerald-500 text-stone-900 font-black uppercase tracking-widest text-xs rounded-full hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20">
                      Postular como Proveedor
                    </button>
                  </div>

                  <div className="mt-12 pt-12 border-t border-white/5 flex justify-center">
                    <button 
                      onClick={() => setShowMarketplace(false)}
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
              Tu Hogar,<br/>
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
        {/* Quiénes Somos Section */}
        <section id="quienes-somos" className="pt-24 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-black uppercase tracking-tight">Quiénes Somos</h2>
              <p className="text-stone-600 leading-relaxed">
                En <strong>TU MAYORDOMO</strong>, redefinimos el mantenimiento del hogar en Colina. Nacimos de la necesidad de ofrecer un servicio de excelencia, coordinado y profesional para las residencias más exigentes de la zona.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  <Target className="text-emerald-500 mb-3" size={24} />
                  <h4 className="font-bold mb-2">Misión</h4>
                  <p className="text-xs text-stone-500">Proporcionar tranquilidad y excelencia a través de servicios integrales personalizados.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                  <Eye className="text-emerald-500 mb-3" size={24} />
                  <h4 className="font-bold mb-2">Visión</h4>
                  <p className="text-xs text-stone-500">Ser el referente de mayordomía de hogares en Chile, destacando por innovación y calidad.</p>
                </div>
              </div>

              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="text-emerald-600" size={24} />
                  <h4 className="font-bold text-emerald-900">Equipo y Estrategia</h4>
                </div>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Contamos con un equipo de especialistas en paisajismo, mantenimiento técnico de piscinas y detailing automotriz. Nuestra estrategia se basa en la <strong>integración vertical</strong>: un solo equipo altamente capacitado que conoce cada rincón de tu hogar.
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
                <p className="text-[10px] text-stone-500">Si un servicio no cumple tu expectativa, lo repetimos sin costo adicional.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" className="pt-24 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Nuestros Servicios</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Especialización técnica en cada área para un resultado impecable.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Leaf className="text-emerald-600"/>, title: "Jardinería", desc: "Corte de césped, poda, fertilización y control de plagas estacional." },
              { icon: <Droplets className="text-blue-500"/>, title: "Piscinas", desc: "Equilibrio químico, limpieza de filtros y aspirado profundo." },
              { icon: <Car className="text-amber-500"/>, title: "Car Detailing", desc: "Lavado premium exterior e interior con productos de alta gama." },
              { icon: <WindowIcon className="text-blue-400"/>, title: "Vidrios", desc: "Limpieza de ventanales en altura con acabados sin rayas." },
              { icon: <Grid3X3 className="text-stone-600"/>, title: "Adoquines", desc: "Hidrolavado a presión y tratamiento anti-musgo." },
              { icon: <UserCheck className="text-emerald-500"/>, title: "Mayordomía", desc: "Supervisión integral y reportes de estado de tu propiedad." },
            ].map((s, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-stone-100 hover:border-emerald-200 transition-all group">
                <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{s.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

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
                Gestiona tus visitas, mantén tu base de datos de clientes y envía recordatorios automáticos por WhatsApp y Email con un solo clic.
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
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-stone-900 bg-stone-800 flex items-center justify-center overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="User" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Utilizada por +50 administradores</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planes Section (Calculator) */}
        <div id="planes" className="pt-24 scroll-mt-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Cotizador de Planes</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Arma tu paquete a medida y visualiza tu ahorro inmediato.</p>
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
                  <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Nivel de Servicio</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.values(PlanType).map((type) => (
                      <button
                        key={type}
                        onClick={() => setConfig({ ...config, plan: type })}
                        className={`py-4 px-2 rounded-2xl border-2 transition-all text-center ${
                          config.plan === type 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' 
                          : 'border-stone-100 hover:border-stone-200 text-stone-600'
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
                    <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Periodo de Contratación</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[Period.QUARTER, Period.SEMESTER, Period.ANNUAL].map((p) => (
                        <button
                          key={p}
                          onClick={() => setConfig({ ...config, period: p })}
                          className={`py-3 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 ${
                            config.period === p 
                            ? 'border-stone-900 bg-stone-900 text-white font-bold' 
                            : 'border-stone-100 hover:border-stone-200 text-stone-600'
                          }`}
                        >
                          <Calendar size={16} />
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Fecha de Inicio</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select 
                        value={config.startMonth}
                        onChange={(e) => setConfig({ ...config, startMonth: parseInt(e.target.value), startDay: 1 })}
                        className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((m, i) => (
                          <option key={i} value={i}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={config.startDay}
                        onChange={(e) => setConfig({ ...config, startDay: parseInt(e.target.value) })}
                        className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Seasonality Legend */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">Estacionalidad</p>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                        <Sun size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Verano</p>
                        <p className="text-[10px] text-stone-500">Octubre - Marzo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                        <Snowflake size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-bold">Invierno</p>
                        <p className="text-[10px] text-stone-500">Abril - Septiembre</p>
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
                      <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600"><Leaf size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Jardín</h4>
                        <p className="text-xs text-stone-500">Mantenimiento y poda</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <select 
                        value={config.gardenSize}
                        onChange={(e) => setConfig({...config, gardenSize: e.target.value as GardenSize})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {Object.values(GardenSize).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Frecuencia Fija</p>
                          <p className="text-xs font-bold text-stone-600">Verano: 4x/mes | Invierno: 2x/mes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Valor Visita</p>
                          <p className="text-xs font-bold text-emerald-600">{formatCLP(UNIT_PRICES.GARDEN[config.gardenSize])}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-50 space-y-4">
                      <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                        <span>Desglose Mensual ({config.period})</span>
                        <span className="font-bold text-stone-600">{calculation.visits.gardenVisits} visitas totales</span>
                      </div>
                      
                      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {calculation.serviceBreakdown.garden.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100">
                            <div className="flex items-center gap-3">
                              <p className="text-[10px] font-bold text-stone-400 uppercase w-8">{item.month}</p>
                              <div className="flex items-center gap-1">
                                {item.isSummer ? <Sun size={10} className="text-amber-500"/> : <Snowflake size={10} className="text-blue-400"/>}
                                <span className="text-[10px] font-bold text-stone-600">{item.isSummer ? '4v' : '2v'}</span>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-emerald-600">{formatCLP(item.cost)}</p>
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
                      <div className="p-2 bg-blue-50 rounded-xl text-blue-600"><Droplets size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Piscina</h4>
                        <p className="text-xs text-stone-500">Químicos y limpieza</p>
                      </div>
                    </div>
                    
                    <div className="bg-stone-50 rounded-xl p-3 border border-stone-100 mb-6 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Frecuencia Fija</p>
                        <p className="text-xs font-bold text-stone-600">Verano: 4x/mes | Invierno: 2x/mes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Valor Visita</p>
                        <p className="text-xs font-bold text-blue-600">{formatCLP(UNIT_PRICES.POOL)}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-50 space-y-4">
                      <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                        <span>Desglose Mensual ({config.period})</span>
                        <span className="font-bold text-stone-600">{calculation.visits.poolVisits} visitas totales</span>
                      </div>

                      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {calculation.serviceBreakdown.pool.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100">
                            <div className="flex items-center gap-3">
                              <p className="text-[10px] font-bold text-stone-400 uppercase w-8">{item.month}</p>
                              <div className="flex items-center gap-1">
                                {item.isSummer ? <Sun size={10} className="text-amber-500"/> : <Snowflake size={10} className="text-blue-400"/>}
                                <span className="text-[10px] font-bold text-stone-600">{item.isSummer ? '4v' : '2v'}</span>
                              </div>
                            </div>
                            <p className="text-xs font-bold text-blue-600">{formatCLP(item.cost)}</p>
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
                      <div className="p-2 bg-amber-50 rounded-xl text-amber-600"><Car size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Vehículos</h4>
                        <p className="text-xs text-stone-500">Lavado full a domicilio</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-500 uppercase">Vehículos:</span>
                        <button 
                          onClick={() => setConfig({...config, vehicles: [...config.vehicles, VehicleSegment.MEDIUM]})}
                          className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-colors"
                        >
                          <Plus size={14} /> Agregar Auto
                        </button>
                      </div>
                      
                      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {config.vehicles.map((v, idx) => (
                          <div key={idx} className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <select 
                                  value={v}
                                  onChange={(e) => {
                                    const newVehicles = [...config.vehicles];
                                    newVehicles[idx] = e.target.value as VehicleSegment;
                                    setConfig({...config, vehicles: newVehicles});
                                  }}
                                  className="bg-white border border-stone-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                  {Object.values(VehicleSegment).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <button 
                                  onClick={() => {
                                    const newVehicles = config.vehicles.filter((_, i) => i !== idx);
                                    setConfig({...config, vehicles: newVehicles});
                                  }}
                                  className="p-1 text-stone-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 leading-none mb-1">Valor Visita</p>
                                <p className="text-xs font-bold text-amber-600">
                                  {formatCLP(UNIT_PRICES.CAR_WASH[v])}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-stone-500 uppercase tracking-wider">
                              <span>Total Mensual ({config.plan === PlanType.BASIC ? '2v' : '4v'})</span>
                              <span className="font-bold">
                                {formatCLP(UNIT_PRICES.CAR_WASH[v] * (config.plan === PlanType.BASIC ? 2 : 4))}
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
                        <span className="font-bold text-stone-600">{calculation.visits.carWashes} lavados totales</span>
                      </div>

                      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {calculation.serviceBreakdown.car.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100">
                            <p className="text-[10px] font-bold text-stone-400 uppercase w-8">{item.month}</p>
                            <p className="text-xs font-bold text-amber-600">{formatCLP(item.cost)}</p>
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
                      <div className="p-2 bg-blue-50 rounded-xl text-blue-500"><WindowIcon size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Vidrios</h4>
                        <p className="text-xs text-stone-500">Limpieza de paños</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <select 
                        value={config.windowPanes}
                        onChange={(e) => setConfig({...config, windowPanes: e.target.value as WindowPanes})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {Object.values(WindowPanes).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <div className="bg-stone-50 rounded-xl p-3 border border-stone-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Frecuencia Incluida</p>
                        <p className="text-xs font-bold text-stone-600">
                          {config.plan === PlanType.PREMIUM ? '2 veces por trimestre (6 al año)' : '1 vez por trimestre (4 al año)'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-50 space-y-4">
                      <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                        <span>Desglose Mensual ({config.period})</span>
                        <span className="font-bold text-stone-600">{calculation.visits.windowCleanings} limpiezas totales</span>
                      </div>

                      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {calculation.serviceBreakdown.windows.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100">
                            <p className="text-[10px] font-bold text-stone-400 uppercase w-8">{item.month}</p>
                            <p className="text-xs font-bold text-blue-500">{formatCLP(item.cost)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm font-bold pt-2 text-blue-500 border-t border-stone-50">
                        <span>Total Base Vidrios</span>
                        <span>{formatCLP(calculation.costs.windows)}</span>
                      </div>
                      <p className="text-[10px] text-stone-400 italic text-center mt-2">
                        * El valor mensual es el costo total del servicio prorrateado en {config.period === Period.ANNUAL ? 12 : (config.period === Period.SEMESTER ? 6 : 3)} meses.
                      </p>
                    </div>
                  </div>

                  {/* Pavement Card */}
                  <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-stone-100 rounded-xl text-stone-600"><Grid3X3 size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Hidrolavado de Adoquines</h4>
                        <p className="text-xs text-stone-500">Limpieza profunda a presión</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-center justify-between bg-stone-50 p-4 rounded-xl">
                        <span className="text-sm font-bold text-stone-500 uppercase">Superficie:</span>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setConfig({...config, pavementM2: Math.max(25, config.pavementM2 - 5)})}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-100"
                          >-</button>
                          <span className="w-16 text-center font-bold text-lg">{config.pavementM2} m²</span>
                          <button 
                            onClick={() => setConfig({...config, pavementM2: config.pavementM2 + 5})}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 hover:bg-stone-100"
                          >+</button>
                        </div>
                      </div>
                      <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex flex-col justify-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Frecuencia Incluida</p>
                        <p className="text-xs font-bold text-stone-600">1 vez por trimestre (4 al año)</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-50 space-y-4">
                      <div className="flex justify-between text-[11px] text-stone-400 uppercase tracking-wider">
                        <span>Desglose Mensual ({config.period})</span>
                        <span className="font-bold text-stone-600">{calculation.visits.pavementCleanings} servicios totales</span>
                      </div>

                      <div className="space-y-1 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                        {calculation.serviceBreakdown.pavement.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2 border border-stone-100">
                            <p className="text-[10px] font-bold text-stone-400 uppercase w-8">{item.month}</p>
                            <p className="text-xs font-bold text-stone-900">{formatCLP(item.cost)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                        <p className="text-sm font-bold text-stone-600">Total Base Hidrolavado</p>
                        <p className="text-xl font-bold text-stone-900">{formatCLP(calculation.costs.pavement)}</p>
                      </div>
                      <p className="text-[10px] text-stone-400 italic text-center mt-2">
                        * El valor mensual es el costo total del servicio prorrateado en {config.period === Period.ANNUAL ? 12 : (config.period === Period.SEMESTER ? 6 : 3)} meses.
                      </p>
                    </div>
                  </div>

                  {/* Extra Services Card */}
                  <div className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-stone-100 rounded-xl text-stone-600"><Wrench size={24}/></div>
                      <div>
                        <h4 className="font-bold text-lg">Servicios a Pedido</h4>
                        <p className="text-xs text-stone-500">Contratación independiente por evento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                      {[
                        { id: ExtraService.IRRIGATION, icon: <Waves size={16}/>, label: 'Revisión Sistema de Riego', unit: 'Zonas', step: 1, min: 1 },
                        { id: ExtraService.GUTTERS, icon: <Trash2 size={16}/>, label: 'Limpieza de Canaletas', unit: 'Metros', step: 5, min: 5 },
                        { id: ExtraService.SOLAR, icon: <SunMedium size={16}/>, label: 'Limpieza Paneles Solares', unit: 'Paneles', step: 2, min: 2 },
                        { id: ExtraService.PEST_HOME, icon: <Bug size={16}/>, label: 'Fumigación Hogar (Int/Ext)', unit: 'm² Construcción', step: 10, min: 50 },
                        { id: ExtraService.PEST_TREES, icon: <Bug size={16}/>, label: 'Fumigación Árboles/Frutales', unit: 'Árboles', step: 1, min: 1 },
                        { id: ExtraService.BBQ_CLEANING, icon: <Flame size={16}/>, label: 'Limpieza Parrilla y Quincho', unit: 'Servicios', step: 1, min: 1 },
                      ].map((service) => {
                        const isSelected = config.extras.some(e => e.service === service.id);
                        const extra = config.extras.find(e => e.service === service.id);
                        
                        return (
                          <div key={service.id} className={`p-5 rounded-2xl border-2 transition-all ${
                            isSelected ? 'border-emerald-500 bg-emerald-50/30' : 'border-stone-100 bg-stone-50/50'
                          }`}>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`${isSelected ? 'text-emerald-500' : 'text-stone-400'}`}>
                                  {service.icon}
                                </div>
                                <span className="text-xs font-black uppercase tracking-tight">{service.label}</span>
                              </div>
                              <button
                                onClick={() => {
                                  const newExtras = isSelected
                                    ? config.extras.filter(e => e.service !== service.id)
                                    : [...config.extras, { service: service.id, dimension: service.min }];
                                  setConfig({...config, extras: newExtras});
                                }}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-500 hover:bg-stone-300'
                                }`}
                              >
                                {isSelected ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                              </button>
                            </div>

                            {isSelected && (
                              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                  <button 
                                    onClick={() => {
                                      const newExtras = config.extras.map(e => 
                                        e.service === service.id ? { ...e, dimension: Math.max(service.min, e.dimension - service.step) } : e
                                      );
                                      setConfig({...config, extras: newExtras});
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100"
                                  >-</button>
                                  <div className="text-center">
                                    <p className="text-lg font-black text-stone-900 leading-none">{extra?.dimension}</p>
                                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{service.unit}</p>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      const newExtras = config.extras.map(e => 
                                        e.service === service.id ? { ...e, dimension: e.dimension + service.step } : e
                                      );
                                      setConfig({...config, extras: newExtras});
                                    }}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100"
                                  >+</button>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs font-black text-emerald-600">{formatCLP(UNIT_PRICES.EXTRAS[service.id] * (extra?.dimension || 0))}</p>
                                  <p className="text-[9px] font-bold text-stone-400 uppercase">Total Servicio</p>
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
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total a Pedido</p>
                          <p className="text-2xl font-black text-stone-900">{formatCLP(calculation.onDemandCosts)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-stone-400 italic leading-tight">
                            * Pago único por evento.<br/>No incluido en mensualidad.
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
                      <span className="flex items-center gap-1"><Sun size={12} className="text-amber-500" /> {calculation.seasonality.summerMonths}</span>
                      <span className="flex items-center gap-1"><Snowflake size={12} className="text-blue-400" /> {calculation.seasonality.winterMonths}</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-y border-white/10 py-4 my-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Desglose Individual</p>
                    <div className="flex justify-between items-center text-stone-400 text-xs">
                      <span>Mantenimiento Jardín ({formatCLP(UNIT_PRICES.GARDEN[config.gardenSize])}/v)</span>
                      <span>{formatCLP(calculation.costs.garden)}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-400 text-xs">
                      <span>Mantenimiento Piscina ({formatCLP(UNIT_PRICES.POOL)}/v)</span>
                      <span>{formatCLP(calculation.costs.pool)}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-400 text-xs">
                      <span>Lavado Automotriz ({formatCLP(calculation.costs.car / calculation.visits.carWashes)}/v)</span>
                      <span>{formatCLP(calculation.costs.car)}</span>
                    </div>
                    <div className="flex justify-between items-center text-stone-400 text-xs">
                      <span>Limpieza de Vidrios ({formatCLP(UNIT_PRICES.WINDOWS[config.windowPanes])}/v)</span>
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
                    <span>{formatCLP(calculation.individualMonthlyAverage)} / mes</span>
                  </div>
                  
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-400 text-sm">Descuento Pack {config.plan} ({calculation.discounts.plan * 100}%)</span>
                      <span className="text-emerald-400 text-sm">-{formatCLP(calculation.totalIndividual * calculation.discounts.plan)}</span>
                    </div>
                    
                    {calculation.discounts.period > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 text-sm">Descuento Permanencia {config.period} ({calculation.discounts.period * 100}%)</span>
                        <span className="text-emerald-400 text-sm">-{formatCLP(calculation.totalIndividual * (1 - calculation.discounts.plan) * calculation.discounts.period)}</span>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-white/10 my-4"></div>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Total {config.period}</p>
                      <p className="text-4xl font-bold">{formatCLP(calculation.totalPlan)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Promedio Mensual Pack</span>
                    <span className="text-emerald-400 font-bold">{formatCLP(calculation.monthlyEquivalent)} / mes</span>
                  </div>

                  {calculation.onDemandCosts > 0 && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Servicios a Pedido (Opcionales)</p>
                      <div className="space-y-2">
                        {config.extras.map((extra, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-stone-400">{extra.service} ({extra.dimension})</span>
                            <span className="text-stone-300">{formatCLP(UNIT_PRICES.EXTRAS[extra.service] * extra.dimension)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5 font-bold">
                          <span className="text-stone-300">Total a Pedido</span>
                          <span className="text-emerald-400">{formatCLP(calculation.onDemandCosts)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="text-[10px] text-emerald-500/60 text-center mt-2 font-medium">
                    ¡Ahorras {formatCLP(calculation.individualMonthlyAverage - calculation.monthlyEquivalent)} cada mes comparado con el precio individual!
                  </p>

                  {/* Monthly Payment Schedule */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-4">Cronograma de Pagos Mensuales</p>
                    <div className="space-y-3">
                      {calculation.monthlyPayments.map((payment, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${payment.isSummer ? 'bg-amber-500' : 'bg-blue-400'}`}></div>
                            <span className="text-sm font-medium capitalize">{payment.monthName}</span>
                          </div>
                          <span className="text-sm font-bold text-emerald-400">{formatCLP(payment.total)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-500 mt-4 italic">
                      * Los valores varían según la estacionalidad (Verano: 4 visitas, Invierno: 2 visitas) y servicios programados.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>{calculation.visits.gardenVisits} Visitas de Jardín</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>{calculation.visits.poolVisits} Mantenciones de Piscina</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-300">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>{calculation.visits.carWashes} Lavados de Auto</span>
                  </div>
                  {calculation.visits.windowCleanings > 0 && (
                    <div className="flex items-center gap-2 text-sm text-stone-300">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>{calculation.visits.windowCleanings} Limpiezas de Vidrios</span>
                    </div>
                  )}
                  {calculation.visits.pavementCleanings > 0 && (
                    <div className="flex items-center gap-2 text-sm text-stone-300">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      <span>{calculation.visits.pavementCleanings} Hidrolavados Adoquines ({config.pavementM2} m²)</span>
                    </div>
                  )}
                </div>

                <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-stone-900 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 group">
                  Contratar Ahora
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </section>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Nota:</strong> Los precios son estimados según el metraje y segmentación seleccionada. 
                  Sujeto a factibilidad técnica y validación en terreno.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advantages Section */}
        <section className="mt-32 mb-32">
          <div className="bg-stone-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="grid md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-3xl font-black uppercase mb-8 text-emerald-400">Ventajas del Plan vs Individual</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Banknote className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Ahorro Económico</h4>
                      <p className="text-sm text-stone-400">Hasta un 25% de descuento real al paquetizar servicios versus contrataciones sueltas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Smartphone className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Gestión Centralizada</h4>
                      <p className="text-sm text-stone-400">Un solo contacto por WhatsApp para coordinar todo. Sin múltiples agendas.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Mantenimiento Preventivo</h4>
                      <p className="text-sm text-stone-400">Al tener visitas regulares, detectamos problemas antes de que se conviertan en reparaciones costosas.</p>
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
                      <th className="text-right pb-4 font-medium">Individual</th>
                      <th className="text-right pb-4 font-medium text-emerald-400">En Plan</th>
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
                      <td className="text-right font-bold text-emerald-400">15% - 25%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Program Section */}
        <section id="beneficios" className="pt-24 mb-24">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 border border-emerald-100">
              Crezcamos Juntos
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Club de Beneficios & Referidos</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              En Tu Mayordomo premiamos tu confianza. Refiere a tus vecinos y amigos para obtener beneficios exclusivos en tu plan mensual.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Refiere a un Vecino</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                Por cada vecino que contrate un plan anual por tu recomendación, ambos reciben un <span className="text-emerald-600 font-bold">15% de descuento</span> en su próxima mensualidad.
              </p>
              <div className="pt-6 border-t border-stone-50">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Beneficio Inmediato</span>
              </div>
            </div>

            <div className="bg-stone-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6">
                <Gift size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Meta: 3 Referidos</h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Al alcanzar 3 referidos activos, obtienes un <span className="text-emerald-400 font-bold">Mes Gratis</span> de mantenimiento de piscina o Car Detailing Full para un vehículo.
              </p>
              <div className="pt-6 border-t border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Recompensa Especial</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                <Trophy size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Embajador Premium</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                Con 5 referidos activos, te conviertes en Embajador. Recibes un <span className="text-amber-600 font-bold">Upgrade de Plan</span> (ej: de Estándar a Premium) sin costo adicional de por vida.
              </p>
              <div className="pt-6 border-t border-stone-50">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Estatus Vitalicio</span>
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
                <p className="text-sm text-stone-500">Compártenos su contacto y nosotros nos encargamos del resto.</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
              Enviar Referido vía WhatsApp
            </button>
          </div>
        </section>

        {/* Survey Section */}
        <section id="encuesta" className="pt-24 mb-24">
          <div className="bg-emerald-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 border border-emerald-500/30">
                  Tu Opinión nos Importa
                </span>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Encuesta de Satisfacción</h2>
                <p className="text-emerald-100/70 max-w-xl mx-auto">
                  Ayúdanos a mantener la excelencia. Tu feedback es fundamental para seguir mejorando nuestro servicio premium.
                </p>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 text-stone-900 shadow-2xl">
                <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por tu feedback! Lo procesaremos de inmediato.'); }}>
                  {/* Overall Satisfaction */}
                  <div className="space-y-6">
                    <label className="block text-center text-sm font-black uppercase tracking-widest text-stone-400">¿Cómo calificarías tu experiencia general?</label>
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
                            {star === 1 ? 'Pobre' : star === 5 ? 'Excelente' : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Specific Aspects */}
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Profesionalismo del Equipo</label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button key={n} type="button" className="w-10 h-10 rounded-xl border-2 border-stone-100 flex items-center justify-center text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all">
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Puntualidad y Cumplimiento</label>
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <button key={n} type="button" className="w-10 h-10 rounded-xl border-2 border-stone-100 flex items-center justify-center text-sm font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all">
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Services Used */}
                    <div className="space-y-4">
                      <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Servicios Evaluados</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Jardinería', 'Piscinas', 'Car Detailing', 'Vidrios', 'Adoquines'].map((s) => (
                          <label key={s} className="flex items-center gap-3 p-3 rounded-xl border border-stone-100 cursor-pointer hover:bg-stone-50 transition-colors">
                            <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-emerald-500 focus:ring-emerald-500" />
                            <span className="text-xs font-bold text-stone-600">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* NPS */}
                  <div className="space-y-6 pt-6 border-t border-stone-100">
                    <label className="block text-center text-sm font-black uppercase tracking-widest text-stone-500">¿Qué tan probable es que nos recomiendes a un amigo o vecino?</label>
                    <div className="flex justify-between gap-1 max-w-2xl mx-auto">
                      {Array.from({ length: 11 }).map((_, i) => (
                        <button key={i} type="button" className="flex-1 aspect-square rounded-lg border border-stone-100 flex items-center justify-center text-xs font-bold hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all">
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
                    <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Comentarios Adicionales</label>
                    <textarea 
                      className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32 transition-all"
                      placeholder="Cuéntanos más sobre tu experiencia..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-6 border-t border-stone-100">
                    <p className="text-[10px] text-stone-400 max-w-xs leading-relaxed">
                      Al enviar esta encuesta, nos autorizas a procesar tus datos para mejorar nuestro servicio. Tu privacidad es nuestra prioridad.
                    </p>
                    <button type="submit" className="w-full md:w-auto px-12 py-4 bg-stone-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20 active:scale-95">
                      Enviar Encuesta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Operations Dashboard */}
        <AnimatePresence>
          {showInternal && (
            <motion.section 
              id="operaciones-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-24 bg-stone-900 text-white rounded-[3rem] p-12 overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-emerald-400">Panel de Operaciones (Interno)</h2>
                  <p className="text-stone-400 text-sm mt-2">Métricas de capacidad y tiempos estimados para equipo de 3 personas.</p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Confidencial</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Capacidad del Equipo</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black">160</span>
                    <span className="text-stone-400 text-sm mb-1">Horas/Mes</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-4 leading-relaxed">Basado en 40h semanales de servicio efectivo (trabajo en bloque).</p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Carga del Plan Actual</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-emerald-400">{calculation.avgMonthlyOpHours.toFixed(1)}</span>
                    <span className="text-stone-400 text-sm mb-1">Horas/Mes</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-4 leading-relaxed">Promedio mensual de horas requeridas para este cliente específico.</p>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Capacidad de Clientes</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black text-emerald-400">
                      {Math.floor(160 / calculation.avgMonthlyOpHours)}
                    </span>
                    <span className="text-stone-400 text-sm mb-1">Clientes/Equipo</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-4 leading-relaxed">Número máximo de clientes similares que este equipo puede atender.</p>
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
                      { label: 'Jardinería', hours: calculation.avgMonthlyOpHoursPerService.garden, color: 'bg-emerald-500' },
                      { label: 'Piscinas', hours: calculation.avgMonthlyOpHoursPerService.pool, color: 'bg-blue-500' },
                      { label: 'Car Detailing', hours: calculation.avgMonthlyOpHoursPerService.car, color: 'bg-amber-500' },
                      { label: 'Vidrios', hours: calculation.avgMonthlyOpHoursPerService.windows, color: 'bg-blue-400' },
                      { label: 'Adoquines', hours: calculation.avgMonthlyOpHoursPerService.pavement, color: 'bg-stone-500' },
                      { label: 'Especiales', hours: calculation.avgMonthlyOpHoursPerService.extras, color: 'bg-pink-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-stone-300">{item.label}</span>
                          <span className="font-black text-emerald-400">{item.hours.toFixed(1)}h</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`${item.color} h-full transition-all duration-500`} 
                            style={{ width: `${(item.hours / calculation.avgMonthlyOpHours) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-sm font-bold">Total Mix Mensual</span>
                      <span className="text-lg font-black text-emerald-400">{calculation.avgMonthlyOpHours.toFixed(1)}h</span>
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
                        <div className="bg-emerald-500 h-full" style={{ width: '11.5%' }}></div>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">Capacidad: 8-9 clientes por equipo.</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">Plan Estándar</span>
                        <span className="text-xs text-stone-400">~20.5h / mes</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: '12.8%' }}></div>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">Capacidad: 7-8 clientes por equipo.</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">Plan Premium</span>
                        <span className="text-xs text-stone-400">~24.5h / mes</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: '15.3%' }}></div>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2">Capacidad: 6-7 clientes por equipo.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Checklist Section */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Checklist Digital de Visita</h3>
                  </div>
                  <div className="text-xs text-stone-500 font-bold uppercase tracking-widest">
                    Protocolo de Excelencia Operativa
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {(Object.entries(checklist) as [keyof ChecklistState, ChecklistItem[]][]).map(([category, items]) => (
                    <div key={category} className="bg-white/5 p-6 rounded-3xl border border-white/10">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                        {category === 'presencia' && <Users size={12} />}
                        {category === 'seguridad' && <ShieldCheck size={12} />}
                        {category === 'jardin' && <Leaf size={12} />}
                        {category === 'piscina' && <Waves size={12} />}
                        {category === 'reporte' && <Smartphone size={12} />}
                        {category}
                      </h4>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => toggleChecklistItem(category, item.id)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group ${
                              item.checked ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-white/5 border border-transparent hover:bg-white/10'
                            }`}
                          >
                            <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                              item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-stone-600 group-hover:border-stone-400'
                            }`}>
                              {item.checked && <CheckCircle2 size={12} className="text-stone-900" />}
                            </div>
                            <span className={`text-[11px] leading-tight transition-colors ${
                              item.checked ? 'text-emerald-400 font-bold' : 'text-stone-400'
                            }`}>
                              {item.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulator Section */}
              <div className="mt-12 pt-12 border-t border-white/10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Calculator size={24} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">Simulador de Mix y Personal</h3>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                      <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Total de Casas Proyectadas</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="1" 
                          max="200" 
                          value={simConfig.totalHouses}
                          onChange={(e) => setSimConfig({...simConfig, totalHouses: parseInt(e.target.value)})}
                          className="flex-1 accent-emerald-500"
                        />
                        <span className="text-2xl font-black w-16 text-center">{simConfig.totalHouses}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs font-black uppercase tracking-widest text-stone-500">Eficiencia Operativa (%)</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min="50" 
                          max="150" 
                          value={simConfig.efficiency}
                          onChange={(e) => setSimConfig({...simConfig, efficiency: parseInt(e.target.value)})}
                          className="flex-1 accent-emerald-500"
                        />
                        <span className="text-2xl font-black w-16 text-center">{simConfig.efficiency}%</span>
                      </div>
                      <p className="text-[10px] text-stone-500">Ajusta el tiempo dedicado por casa (menor % = más rápido/eficiente).</p>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Variables Marketplace</h4>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-stone-400">Tasa de Adopción (%)</span>
                          <span className="text-white">{simConfig.marketplaceAttachRate}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="50" value={simConfig.marketplaceAttachRate}
                          onChange={(e) => setSimConfig({...simConfig, marketplaceAttachRate: parseInt(e.target.value)})}
                          className="w-full accent-emerald-500"
                        />
                        <p className="text-[9px] text-stone-500 italic">Porcentaje de clientes que contratan servicios extra al mes.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-stone-400">Comisión Plataforma (%)</span>
                          <span className="text-white">{simConfig.marketplaceCommissionPct}%</span>
                        </div>
                        <input 
                          type="range" min="5" max="25" value={simConfig.marketplaceCommissionPct}
                          onChange={(e) => setSimConfig({...simConfig, marketplaceCommissionPct: parseInt(e.target.value)})}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Variables Corredoras</h4>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-stone-400">Packs Handover / Mes</span>
                          <span className="text-white">{simConfig.brokerPacksPerMonth}</span>
                        </div>
                        <input 
                          type="range" min="0" max="20" value={simConfig.brokerPacksPerMonth}
                          onChange={(e) => setSimConfig({...simConfig, brokerPacksPerMonth: parseInt(e.target.value)})}
                          className="w-full accent-blue-500"
                        />
                        <p className="text-[9px] text-stone-500 italic">Número de servicios "Pack Entrega Propiedad" vendidos a corredoras.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-stone-400">Precio Pack ($)</span>
                          <span className="text-white">{formatCLP(simConfig.brokerPackPrice)}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSimConfig({...simConfig, brokerPackPrice: 249990})}
                            className={`px-2 py-1 rounded text-[9px] font-bold ${simConfig.brokerPackPrice === 249990 ? 'bg-blue-500 text-white' : 'bg-stone-800 text-stone-400'}`}
                          >
                            Promo
                          </button>
                          <button 
                            onClick={() => setSimConfig({...simConfig, brokerPackPrice: 299990})}
                            className={`px-2 py-1 rounded text-[9px] font-bold ${simConfig.brokerPackPrice === 299990 ? 'bg-blue-500 text-white' : 'bg-stone-800 text-stone-400'}`}
                          >
                            Estándar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 space-y-6">
                      <p className="text-xs font-black uppercase tracking-widest text-stone-500">Mix de Planes (%)</p>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span>Básico</span>
                          <span>{simConfig.basicPct}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" value={simConfig.basicPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const remaining = 100 - val;
                            const ratio = simConfig.standardPct + simConfig.premiumPct === 0 ? 0.5 : simConfig.standardPct / (simConfig.standardPct + simConfig.premiumPct);
                            setSimConfig({
                              ...simConfig,
                              basicPct: val,
                              standardPct: Math.round(remaining * ratio),
                              premiumPct: 100 - val - Math.round(remaining * ratio)
                            });
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span>Estándar</span>
                          <span>{simConfig.standardPct}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" value={simConfig.standardPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const remaining = 100 - val;
                            const ratio = simConfig.basicPct + simConfig.premiumPct === 0 ? 0.5 : simConfig.basicPct / (simConfig.basicPct + simConfig.premiumPct);
                            setSimConfig({
                              ...simConfig,
                              standardPct: val,
                              basicPct: Math.round(remaining * ratio),
                              premiumPct: 100 - val - Math.round(remaining * ratio)
                            });
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-bold">
                          <span>Premium</span>
                          <span>{simConfig.premiumPct}%</span>
                        </div>
                        <input 
                          type="range" min="0" max="100" value={simConfig.premiumPct}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            const remaining = 100 - val;
                            const ratio = simConfig.basicPct + simConfig.standardPct === 0 ? 0.5 : simConfig.basicPct / (simConfig.basicPct + simConfig.standardPct);
                            setSimConfig({
                              ...simConfig,
                              premiumPct: val,
                              basicPct: Math.round(remaining * ratio),
                              standardPct: 100 - val - Math.round(remaining * ratio)
                            });
                          }}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Personal Necesario</p>
                      <div className="flex items-end gap-2">
                        <span className="text-6xl font-black text-emerald-400">{calculation.simResults.peopleNeeded}</span>
                        <span className="text-stone-400 text-sm mb-2">Personas</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-4">Organizadas en {Math.ceil(calculation.simResults.teamsNeeded)} equipos de 3.</p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex flex-col justify-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Carga de Trabajo Total</p>
                      <div className="flex items-end gap-2">
                        <span className="text-6xl font-black text-emerald-400">{Math.round(calculation.simResults.totalMonthlyHours)}</span>
                        <span className="text-stone-400 text-sm mb-2">Horas/Mes</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-4">Utilización del personal: {calculation.simResults.utilization.toFixed(1)}%</p>
                    </div>

                    <div className="col-span-2 bg-stone-800 p-8 rounded-3xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-4">Venta Mensual Estimada (Mix)</p>
                        <div className="flex items-end gap-2">
                          <span className="text-5xl font-black text-emerald-400">{formatCLP(calculation.simResults.totalMonthlySales)}</span>
                          <span className="text-stone-400 text-sm mb-2">/ Mes</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Ticket Promedio</p>
                        <p className="text-xl font-bold text-white">{formatCLP(calculation.simResults.totalMonthlySales / simConfig.totalHouses)}</p>
                      </div>
                    </div>

                    <div className="col-span-2 bg-emerald-500/10 p-8 rounded-3xl border border-emerald-500/20">
                      <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-6">Desglose de Cartera y Ecosistema</h4>
                      <div className="grid grid-cols-4 gap-8">
                        <div>
                          <p className="text-3xl font-black">{Math.round(calculation.simResults.houses.basic)}</p>
                          <p className="text-[10px] font-bold text-stone-500 uppercase">Casas Básicas</p>
                        </div>
                        <div>
                          <p className="text-3xl font-black">{Math.round(calculation.simResults.houses.standard)}</p>
                          <p className="text-[10px] font-bold text-stone-500 uppercase">Casas Estándar</p>
                        </div>
                        <div>
                          <p className="text-3xl font-black">{Math.round(calculation.simResults.houses.premium)}</p>
                          <p className="text-[10px] font-bold text-stone-500 uppercase">Casas Premium</p>
                        </div>
                        <div className="border-l border-emerald-500/20 pl-8">
                          <p className="text-3xl font-black text-emerald-400">{Math.round(simConfig.totalHouses * (simConfig.marketplaceAttachRate / 100))}</p>
                          <p className="text-[10px] font-bold text-emerald-500/60 uppercase">Servicios Marketplace / Mes</p>
                        </div>
                        <div className="border-l border-blue-500/20 pl-8">
                          <p className="text-3xl font-black text-blue-400">{simConfig.brokerPacksPerMonth}</p>
                          <p className="text-[10px] font-bold text-blue-500/60 uppercase">Packs Corredoras / Mes</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 bg-stone-900 p-8 rounded-3xl border border-white/5">
                      <h4 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-8">Estado de Resultados (Proyectado)</h4>
                      <div className="space-y-6">
                        <div className="space-y-3 border-b border-white/5 pb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-stone-500 text-xs font-bold uppercase">Ingresos Core (Planes)</span>
                            <span className="text-lg font-bold text-white">{formatCLP(calculation.simResults.financials.coreMonthlySales)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-400 text-xs font-bold uppercase">Comisiones Marketplace</span>
                            <span className="text-lg font-bold text-emerald-400">+{formatCLP(calculation.simResults.financials.marketplaceRevenue)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-blue-400 text-xs font-bold uppercase">Ventas Corredoras (Packs)</span>
                            <span className="text-lg font-bold text-blue-400">+{formatCLP(calculation.simResults.financials.brokerRevenue)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-white/5">
                            <span className="text-stone-300 text-xs font-black uppercase">Ingresos Totales</span>
                            <span className="text-xl font-black text-white">{formatCLP(calculation.simResults.totalMonthlySales)}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-stone-500">Sueldos (2x650k + 1x850k)</span>
                            <span className="text-red-400 font-bold">-{formatCLP(calculation.simResults.financials.totalSalaries)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-stone-500">Insumos y Químicos (Est.)</span>
                            <span className="text-red-400 font-bold">-{formatCLP(calculation.simResults.financials.totalSupplies)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-stone-500">Gastos Operativos (Combustible/Herramientas)</span>
                            <span className="text-red-400 font-bold">-{formatCLP(calculation.simResults.financials.fixedCosts)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-stone-500">Marketing (Adquisición de Clientes)</span>
                            <span className="text-red-400 font-bold">-{formatCLP(calculation.simResults.financials.marketingCost)}</span>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Utilidad Neta Inversionista</p>
                            <p className="text-4xl font-black text-emerald-400">{formatCLP(calculation.simResults.financials.netProfit)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Margen Neto</p>
                            <p className="text-xl font-bold text-white">{calculation.simResults.financials.margin.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 bg-stone-900 p-8 rounded-3xl border border-white/5">
                      <h4 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-8">Proyección Anual de Crecimiento</h4>
                      <div className="h-[300px] w-full mb-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={calculation.simResults.financials.projection}>
                            <defs>
                              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis 
                              dataKey="month" 
                              stroke="#78716c" 
                              fontSize={10} 
                              tickFormatter={(val) => `Mes ${val}`}
                            />
                            <YAxis 
                              stroke="#78716c" 
                              fontSize={10} 
                              tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #444', borderRadius: '12px' }}
                              itemStyle={{ fontSize: '12px' }}
                              formatter={(value: any) => [formatCLP(value), 'Utilidad']}
                              labelFormatter={(label) => `Mes ${label}`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="profit" 
                              stroke="#10b981" 
                              fillOpacity={1} 
                              fill="url(#colorProfit)" 
                              strokeWidth={3}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Crecimiento Exponencial</p>
                          <p className="text-xl font-bold text-white">+10% MoM</p>
                          <p className="text-xs text-stone-500 mt-1">Marketing: {formatCLP(simConfig.marketingBudget)}/mes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-2">Utilidad Acumulada Año 1</p>
                          <p className="text-2xl font-black text-emerald-400">
                            {formatCLP(calculation.simResults.financials.projection.reduce((acc, curr) => acc + curr.profit, 0))}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase mb-2">Escalamiento Controlado</p>
                        <p className="text-xs text-stone-400">
                          Con un crecimiento del **10% mensual**, el negocio escala de forma más estable. 
                          Al llegar al **Mes 12**, estarás operando con aproximadamente **{calculation.simResults.financials.projection[11].houses} casas** y **{calculation.simResults.financials.projection[11].teams} equipos**. 
                          Este ritmo permite una mejor selección de personal y control de calidad.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 bg-stone-900 p-8 rounded-3xl border border-white/5">
                      <h4 className="text-sm font-black uppercase tracking-widest text-stone-400 mb-8">Estrategia de Marketing de Ecosistema</h4>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                              <Target size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Cross-Selling Activo</h4>
                          </div>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            Aprovechamos la recurrencia de las visitas de mantención para ofrecer servicios del Marketplace. 
                            El personal técnico actúa como "embajador" detectando necesidades (ej: una filtración en el jardín) y derivando al proveedor del Marketplace.
                          </p>
                        </div>
                        <div className="bg-stone-800/50 p-6 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                              <Instagram size={18} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-stone-400">Marketing Unificado</h4>
                          </div>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            El presupuesto de marketing ahora promociona la "Solución Total Hogar". 
                            Esto aumenta el valor percibido de la marca y reduce el costo de adquisición por servicio al compartir la inversión entre múltiples categorías.
                          </p>
                        </div>
                      </div>
                      <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <p className="text-[10px] text-emerald-400 font-bold uppercase mb-2">Potencial de Ingresos Pasivos</p>
                        <p className="text-xs text-stone-400">
                          Al derivar clientes a la plataforma de Marketplace, se establece un modelo de **comisión por lead o venta (10-15%)**. 
                          Esto genera una línea de ingresos adicional con costo operativo cero para la estructura principal de Tu Mayordomo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Contact & Social Section */}
        <section id="contacto" className="pt-24 mb-24">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tight mb-4">Contacto</h2>
                <p className="text-stone-500">Estamos listos para cuidar tu hogar. Contáctanos por cualquiera de nuestros canales oficiales.</p>
              </div>

              <div className="space-y-4">
                <a href="https://wa.me/56912345678" target="_blank" className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-colors group">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">WhatsApp Business</p>
                    <p className="text-lg font-bold text-stone-900">+56 9 1234 5678</p>
                  </div>
                  <ArrowRight className="ml-auto text-emerald-500 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex gap-4">
                  <a href="#" className="flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-200 transition-all">
                    <Instagram className="text-pink-600" size={20} />
                    <span className="font-bold text-sm">@tumayordomo.cl</span>
                  </a>
                  <a href="#" className="flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-stone-200 transition-all">
                    <Facebook className="text-blue-600" size={20} />
                    <span className="font-bold text-sm">Tu Mayordomo</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-100">
                <h4 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">Formas de Pago</h4>
                <div className="flex flex-wrap gap-6 items-center opacity-60">
                  <div className="flex items-center gap-2">
                    <CreditCard size={20} />
                    <span className="text-xs font-bold">Webpay / Transbank</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Banknote size={20} />
                    <span className="text-xs font-bold">Transferencia Bancaria</span>
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
                    <label className="text-xs font-bold text-stone-400 uppercase">Nombre</label>
                    <input type="text" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase">Teléfono</label>
                    <input type="text" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="+56 9..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">Email</label>
                  <input type="email" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-400 uppercase">Mensaje</label>
                  <textarea className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32" placeholder="¿En qué podemos ayudarte?"></textarea>
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
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegir nuestros packs?</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Simplificamos el mantenimiento de tu hogar en Colina con un servicio profesional y coordinado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Un solo proveedor",
                desc: "Olvida coordinar con 5 empresas distintas. Una sola agenda, un solo pago.",
                icon: <CheckCircle2 className="text-emerald-500" />
              },
              {
                title: "Ahorro Garantizado",
                desc: "Nuestros paquetes ofrecen descuentos reales de hasta el 30% versus servicios individuales.",
                icon: <Droplets className="text-blue-500" />
              },
              {
                title: "Eco-Productos",
                desc: "Utilizamos productos biodegradables para cuidar tu jardín y el medio ambiente local.",
                icon: <Leaf className="text-emerald-600" />
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
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
                <span className="text-2xl font-black tracking-tighter uppercase">Tu Mayordomo</span>
              </div>
              <p className="text-stone-500 max-w-sm text-sm leading-relaxed font-medium">
                Servicio premium de mantenimiento integral para hogares de alto estándar en Colina y alrededores. 
                Excelencia, confianza y tranquilidad en cada visita.
              </p>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">Navegación</h4>
              <ul className="space-y-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
                <li><button onClick={() => scrollTo('hero')} className="hover:text-emerald-500 transition-colors">Inicio</button></li>
                <li><button onClick={() => scrollTo('quienes-somos')} className="hover:text-emerald-500 transition-colors">Quiénes Somos</button></li>
                <li><button onClick={() => scrollTo('servicios')} className="hover:text-emerald-500 transition-colors">Servicios</button></li>
                <li><button onClick={() => scrollTo('planes')} className="hover:text-emerald-500 transition-colors">Planes</button></li>
                <li><button onClick={() => scrollTo('beneficios')} className="hover:text-emerald-500 transition-colors">Beneficios</button></li>
                <li><button onClick={() => scrollTo('encuesta')} className="hover:text-emerald-500 transition-colors">Encuesta</button></li>
                <li><button onClick={() => scrollTo('contacto')} className="hover:text-emerald-500 transition-colors">Contacto</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">Legal</h4>
              <ul className="space-y-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Garantía de Servicio</a></li>
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
                {showInternal ? 'Ocultar' : 'Mostrar'} Panel de Operaciones
              </button>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-stone-400 hover:text-pink-600 transition-all transform hover:scale-110"><Instagram size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-blue-600 transition-all transform hover:scale-110"><Facebook size={20} /></a>
              <a href="https://wa.me/56912345678" className="text-stone-400 hover:text-emerald-500 transition-all transform hover:scale-110"><MessageCircle size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
