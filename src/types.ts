/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum PlanType {
  BASIC = "Básico",
  STANDARD = "Estándar",
  PREMIUM = "Premium",
}

export enum Period {
  ANNUAL = "Anual",
  SEMESTER = "Semestral",
  QUARTER = "Trimestral",
}

export enum GardenSize {
  SMALL = "Hasta 250 m²",
  MEDIUM = "250 - 1000 m²",
  LARGE = "1000 - 2500 m²",
}

export enum VehicleSegment {
  SMALL = "City Car / Hatchback",
  MEDIUM = "Sedán / SUV Pequeño",
  LARGE = "SUV Grande / Camioneta",
  PREMIUM = "Van / Lujo / Especial",
}

export enum WindowPanes {
  SMALL = "Hasta 20 paños",
  MEDIUM = "21 - 40 paños",
  LARGE = "Más de 40 paños",
}

export enum GardenFrequency {
  STANDARD = "Estándar (Verano 4x/mes, Invierno 2x/mes)",
}

export enum WindowFrequency {
  QUARTERLY = "Cada 3 meses",
  BIMONTHLY = "Cada 2 meses",
  MONTHLY = "Mensual",
}

export enum PavementFrequency {
  QUARTERLY = "Cada 3 meses",
  BIANNUAL = "2 veces al año",
  ANNUAL = "1 vez al año",
  NONE = "Sin servicio",
}

export interface ServiceConfig {
  plan: PlanType;
  period: Period;
  startMonth: number; // 0-11
  startDay: number; // 1-31
  gardenSize: GardenSize;
  gardenFreq: GardenFrequency;
  windowPanes: WindowPanes;
  pavementM2: number;
  vehicles: VehicleSegment[];
  extras: {
    service: ExtraService;
    dimension: number;
  }[];
}

export enum ExtraService {
  IRRIGATION = "Revisión de Riego",
  GUTTERS = "Limpieza de Canaletas",
  SOLAR = "Limpieza de Paneles Solares",
  PEST_HOME = "Fumigación Hogar Completa",
  PEST_TREES = "Fumigación Árboles y Frutales",
  BBQ_CLEANING = "Limpieza de Parrilla y Quincho",
}

export const UNIT_PRICES = {
  GARDEN: {
    [GardenSize.SMALL]: 22000,
    [GardenSize.MEDIUM]: 55000,
    [GardenSize.LARGE]: 110000,
  },
  POOL: 22000,
  CAR_WASH: {
    [VehicleSegment.SMALL]: 16500,
    [VehicleSegment.MEDIUM]: 22000,
    [VehicleSegment.LARGE]: 27500,
    [VehicleSegment.PREMIUM]: 33000,
  },
  WINDOWS: {
    [WindowPanes.SMALL]: 55000,
    [WindowPanes.MEDIUM]: 77000,
    [WindowPanes.LARGE]: 110000,
  },
  PAVEMENT_PER_M2: 4400,
  EXTRAS: {
    [ExtraService.IRRIGATION]: 16500, // per zone
    [ExtraService.GUTTERS]: 2750, // per linear meter
    [ExtraService.SOLAR]: 5500, // per panel
    [ExtraService.PEST_HOME]: 550, // per m2 of construction (includes int/ext/shrubs)
    [ExtraService.PEST_TREES]: 8800, // per tree/fruit tree
    [ExtraService.BBQ_CLEANING]: 60500, // per service/event
  },
};

export const DISCOUNTS = {
  [PlanType.BASIC]: 0.15,
  [PlanType.STANDARD]: 0.2,
  [PlanType.PREMIUM]: 0.25,
};

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  serviceType: string;
  date: string; // ISO string
  time: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notified: {
    whatsapp: boolean;
    email: boolean;
  };
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface ChecklistState {
  presencia: ChecklistItem[];
  seguridad: ChecklistItem[];
  jardin: ChecklistItem[];
  piscina: ChecklistItem[];
  reporte: ChecklistItem[];
}
