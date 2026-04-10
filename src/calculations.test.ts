import { describe, it, expect } from "vitest";
import { calculatePlanMetrics } from "./calculations";
import {
  PlanType,
  Period,
  GardenSize,
  GardenFrequency,
  WindowPanes,
  ServiceConfig,
  SimConfig,
} from "./types";

describe("Lógica de Cotización y Métricas (calculatePlanMetrics)", () => {
  // Configuración base de simulación (Dashboard Interno)
  const mockSimConfig: SimConfig = {
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
    marketplaceAttachRate: 30,
    avgMarketplaceServiceValue: 85000,
    marketplaceCommissionPct: 12,
    brokerPacksPerMonth: 4,
    brokerPackPrice: 299990,
    brokerPackCost: 180000,
  };

  // Configuración base del cotizador (Cliente)
  const baseConfig: ServiceConfig = {
    plan: PlanType.BASIC,
    period: Period.QUARTER,
    startMonth: 0, // Enero (Verano)
    startDay: 1,
    gardenSize: GardenSize.SMALL,
    gardenFreq: GardenFrequency.STANDARD,
    vehicles: [],
    windowPanes: WindowPanes.SMALL,
    pavementM2: 0,
    extras: [],
  };

  it("debe calcular correctamente las visitas de verano (Ene, Feb, Mar)", () => {
    const result = calculatePlanMetrics(baseConfig, mockSimConfig);

    // 3 meses de verano a 4 visitas por mes = 12 visitas
    expect(result.seasonality.summerMonths).toBe(3);
    expect(result.seasonality.winterMonths).toBe(0);
    expect(result.visits.gardenVisits).toBe(12);

    // Costo individual = 12 visitas * 22,000 (precio Small)
    expect(result.costs.garden).toBe(264000);
  });

  it("debe aplicar los descuentos correctos para un Plan Premium Anual", () => {
    const premiumConfig: ServiceConfig = {
      ...baseConfig,
      plan: PlanType.PREMIUM,
      period: Period.ANNUAL,
    };
    const result = calculatePlanMetrics(premiumConfig, mockSimConfig);

    // Descuento Premium = 25% (0.25)
    // Descuento Anual = 10% (0.10)
    expect(result.discounts.plan).toBe(0.25);
    expect(result.discounts.period).toBe(0.1);

    // El total debe ser el subtotal con ambos descuentos multiplicados
    const expectedTotal = result.totalIndividual * (1 - 0.25) * (1 - 0.1);
    expect(result.totalPlan).toBeCloseTo(expectedTotal);
  });

  it("debe calcular las horas operativas del equipo correctamente", () => {
    const result = calculatePlanMetrics(baseConfig, mockSimConfig);

    // 12 visitas de jardín (Small = 1.5h) = 18 horas
    // 12 visitas de piscina (0.75h) = 9 horas
    // 1 limpieza de vidrios (Small = 1.5h) = 1.5 horas
    expect(result.opHours.garden).toBe(18);
    expect(result.opHours.pool).toBe(9);
    expect(result.opHours.windows).toBe(1.5);
    expect(result.totalOpHours).toBe(28.5); // 18 + 9 + 1.5
  });

  it("debe simular las finanzas del Dashboard B2B correctamente", () => {
    const result = calculatePlanMetrics(baseConfig, mockSimConfig);

    // Ingresos Corredoras = 4 packs * $299.990 = $1.199.960
    expect(result.simResults.financials.brokerRevenue).toBe(1199960);
  });
});
