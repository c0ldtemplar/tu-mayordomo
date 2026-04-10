import {
  PlanType,
  Period,
  GardenSize,
  VehicleSegment,
  WindowPanes,
  ExtraService,
  ServiceConfig,
  SimConfig,
  UNIT_PRICES,
  DISCOUNTS,
} from "./types";

export const calculatePlanMetrics = (
  config: ServiceConfig,
  simConfig: SimConfig,
) => {
  let months = 12;
  if (config.period === Period.SEMESTER) months = 6;
  else if (config.period === Period.QUARTER) months = 3;

  // Internal Metrics (Team of 3)
  const WORK_TIMES = {
    GARDEN: {
      [GardenSize.SMALL]: 1.5,
      [GardenSize.MEDIUM]: 3,
      [GardenSize.LARGE]: 5,
    },
    POOL: 0.75,
    CAR_WASH: 1,
    WINDOWS: {
      [WindowPanes.SMALL]: 1.5,
      [WindowPanes.MEDIUM]: 2.5,
      [WindowPanes.LARGE]: 4,
    },
    PAVEMENT: 1, // per 50m2
    EXTRAS: {
      [ExtraService.IRRIGATION]: 0.5, // per zone
      [ExtraService.GUTTERS]: 0.05, // per meter
      [ExtraService.SOLAR]: 0.15, // per panel
      [ExtraService.PEST_HOME]: 0.005, // per m2
      [ExtraService.PEST_TREES]: 0.25, // per tree
      [ExtraService.BBQ_CLEANING]: 2.5, // per service
    },
  };

  // Seasonality calculation
  const startMonth = config.startMonth;
  let summerMonths = 0;
  let winterMonths = 0;

  for (let i = 0; i < months; i++) {
    const currentMonth = (startMonth + i) % 12;
    // Verano: Octubre (9) a Marzo (2)
    // Invierno: Abril (3) a Septiembre (8)
    const isSummerMonth = currentMonth >= 9 || currentMonth <= 2;
    if (isSummerMonth) {
      summerMonths++;
    } else {
      winterMonths++;
    }
  }

  // 1. Garden Visits
  const gardenSummerVisits = summerMonths * 4;
  const gardenWinterVisits = winterMonths * 2;
  const gardenVisits = gardenSummerVisits + gardenWinterVisits;

  // 2. Pool Visits (Same as garden)
  const poolSummerVisits = summerMonths * 4;
  const poolWinterVisits = winterMonths * 2;
  const poolVisits = poolSummerVisits + poolWinterVisits;

  // 3. Car Washes
  const washesPerCarPerMonth = config.plan === PlanType.BASIC ? 2 : 4;
  const carWashes = months * washesPerCarPerMonth * config.vehicles.length;

  // 4. Window Cleanings
  let windowCleanings = 0;
  if (config.plan === PlanType.PREMIUM) {
    if (months === 12) windowCleanings = 6;
    else if (months === 6) windowCleanings = 4;
    else windowCleanings = 2;
  } else {
    windowCleanings = Math.ceil(months / 3);
  }

  // 5. Pavement Cleanings
  const pavementCleanings = Math.ceil(months / 3);

  // Operational Hours (Team of 3)
  const opHours = {
    garden: gardenVisits * WORK_TIMES.GARDEN[config.gardenSize],
    pool: poolVisits * WORK_TIMES.POOL,
    car: carWashes * WORK_TIMES.CAR_WASH,
    windows: windowCleanings * WORK_TIMES.WINDOWS[config.windowPanes],
    pavement:
      pavementCleanings * ((config.pavementM2 / 50) * WORK_TIMES.PAVEMENT),
    extras: config.extras.reduce(
      (acc, extra) => acc + WORK_TIMES.EXTRAS[extra.service] * extra.dimension,
      0,
    ),
  };

  const totalOpHours = Object.values(opHours).reduce((a, b) => a + b, 0);
  const avgMonthlyOpHours =
    (opHours.garden +
      opHours.pool +
      opHours.car +
      opHours.windows +
      opHours.pavement) /
    months;
  const avgMonthlyOpHoursPerService = {
    garden: opHours.garden / months,
    pool: opHours.pool / months,
    car: opHours.car / months,
    windows: opHours.windows / months,
    pavement: opHours.pavement / months,
    extras: opHours.extras, // Total hours for on-demand
  };

  const vehicleCosts = config.vehicles.reduce((acc, segment) => {
    return acc + months * washesPerCarPerMonth * UNIT_PRICES.CAR_WASH[segment];
  }, 0);

  const costs = {
    garden: gardenVisits * UNIT_PRICES.GARDEN[config.gardenSize],
    pool: poolVisits * UNIT_PRICES.POOL,
    car: vehicleCosts,
    windows: windowCleanings * UNIT_PRICES.WINDOWS[config.windowPanes],
    pavement:
      pavementCleanings * (config.pavementM2 * UNIT_PRICES.PAVEMENT_PER_M2),
  };

  const onDemandCosts = config.extras.reduce((acc, extra) => {
    return acc + UNIT_PRICES.EXTRAS[extra.service] * extra.dimension;
  }, 0);

  const totalIndividual = Object.values(costs).reduce((a, b) => a + b, 0);

  const monthlyPayments = [];
  const serviceBreakdown = {
    garden: [] as { month: string; cost: number; isSummer: boolean }[],
    pool: [] as { month: string; cost: number; isSummer: boolean }[],
    car: [] as { month: string; cost: number }[],
    windows: [] as { month: string; cost: number }[],
    pavement: [] as { month: string; cost: number }[],
  };

  // Costos base (sin descuento)
  const monthlyCarCost = costs.car / months;
  const monthlyWindowCost = costs.windows / months;
  const monthlyPavementCost = costs.pavement / months;

  for (let i = 0; i < months; i++) {
    const currentMonth = (startMonth + i) % 12;
    const monthName = new Intl.DateTimeFormat("es-CL", {
      month: "short",
    }).format(new Date(2024, currentMonth));
    const isSummer = currentMonth >= 9 || currentMonth <= 2;

    const gardenVisitsThisMonth = isSummer ? 4 : 2;
    const poolVisitsThisMonth = isSummer ? 4 : 2;

    const gardenCost =
      gardenVisitsThisMonth * UNIT_PRICES.GARDEN[config.gardenSize];
    const poolCost = poolVisitsThisMonth * UNIT_PRICES.POOL;

    serviceBreakdown.garden.push({
      month: monthName,
      cost: gardenCost,
      isSummer,
    });
    serviceBreakdown.pool.push({
      month: monthName,
      cost: poolCost,
      isSummer,
    });
    serviceBreakdown.car.push({ month: monthName, cost: monthlyCarCost });
    serviceBreakdown.windows.push({
      month: monthName,
      cost: monthlyWindowCost,
    });
    serviceBreakdown.pavement.push({
      month: monthName,
      cost: monthlyPavementCost,
    });

    const totalMonthIndividual =
      gardenCost +
      poolCost +
      monthlyCarCost +
      monthlyWindowCost +
      monthlyPavementCost;

    monthlyPayments.push({
      monthName: new Intl.DateTimeFormat("es-CL", { month: "long" }).format(
        new Date(2024, currentMonth),
      ),
      isSummer,
      total: totalMonthIndividual, // Guardamos el total individual por ahora
    });
  }

  const planDiscount = DISCOUNTS[config.plan];
  const periodDiscount =
    config.period === Period.ANNUAL
      ? 0.1
      : config.period === Period.SEMESTER
        ? 0.05
        : 0;

  const totalPlan = totalIndividual * (1 - planDiscount) * (1 - periodDiscount);
  const savings = totalIndividual - totalPlan;

  // Calculate Simulation Results directly
  const basicHours = 18.5;
  const standardHours = 20.5;
  const premiumHours = 24.5;

  const basicRevenue = 148665;
  const standardRevenue = 176880;
  const premiumRevenue = 324225;

  const efficiencyFactor = simConfig.efficiency / 100;

  const housesBasic = (simConfig.totalHouses * simConfig.basicPct) / 100;
  const housesStandard = (simConfig.totalHouses * simConfig.standardPct) / 100;
  const housesPremium = (simConfig.totalHouses * simConfig.premiumPct) / 100;

  const marketplaceRevenue =
    simConfig.totalHouses *
    (simConfig.marketplaceAttachRate / 100) *
    simConfig.avgMarketplaceServiceValue *
    (simConfig.marketplaceCommissionPct / 100);
  const brokerRevenue =
    simConfig.brokerPacksPerMonth * simConfig.brokerPackPrice;
  const brokerProfit =
    simConfig.brokerPacksPerMonth *
    (simConfig.brokerPackPrice - simConfig.brokerPackCost);

  const coreMonthlySales =
    housesBasic * basicRevenue +
    housesStandard * standardRevenue +
    housesPremium * premiumRevenue;
  const totalMonthlySales =
    coreMonthlySales + marketplaceRevenue + brokerRevenue;

  const totalMonthlyHours =
    (housesBasic * basicHours +
      housesStandard * standardHours +
      housesPremium * premiumHours +
      simConfig.brokerPacksPerMonth * 8) *
    efficiencyFactor;

  const peopleNeeded = Math.ceil(totalMonthlyHours / 160);
  const teamsNeeded = Math.ceil(peopleNeeded / 3);
  const totalCapacityHours = teamsNeeded * 3 * 160;

  const totalSalaries =
    teamsNeeded * 2 * simConfig.salaryBase + teamsNeeded * simConfig.salaryLead;
  const totalSupplies = simConfig.totalHouses * simConfig.suppliesPerHouse;
  const fixedCosts = 150000 * teamsNeeded;
  const marketingCost = simConfig.marketingBudget;
  const netProfit =
    totalMonthlySales -
    totalSalaries -
    totalSupplies -
    fixedCosts -
    marketingCost;

  let currentHouses = simConfig.totalHouses;
  const projection = Array.from({ length: 12 }, (_, i) => {
    if (i > 0) {
      currentHouses = currentHouses * (1 + simConfig.growthRate);
    }
    const monthHouses = Math.round(currentHouses);
    const monthTeams = Math.ceil(monthHouses / 22);
    const monthMarketplaceRevenue =
      monthHouses *
      (simConfig.marketplaceAttachRate / 100) *
      simConfig.avgMarketplaceServiceValue *
      (simConfig.marketplaceCommissionPct / 100);
    const monthBrokerRevenue =
      simConfig.brokerPacksPerMonth * simConfig.brokerPackPrice;
    const monthCoreRevenue =
      (monthHouses / simConfig.totalHouses) * coreMonthlySales;
    const monthRevenue =
      monthCoreRevenue + monthMarketplaceRevenue + monthBrokerRevenue;
    const monthSalaries =
      monthTeams * 2 * simConfig.salaryBase + monthTeams * simConfig.salaryLead;
    const monthSupplies =
      monthHouses * simConfig.suppliesPerHouse +
      simConfig.brokerPacksPerMonth * 40000;
    const monthFixed = monthTeams * 150000;
    const monthProfit =
      monthRevenue - monthSalaries - monthSupplies - monthFixed - marketingCost;

    return {
      month: i + 1,
      houses: monthHouses,
      revenue: monthRevenue,
      profit: monthProfit,
      teams: monthTeams,
    };
  });

  const simResults = {
    houses: {
      basic: housesBasic,
      standard: housesStandard,
      premium: housesPremium,
    },
    totalMonthlyHours,
    totalMonthlySales,
    teamsNeeded,
    peopleNeeded: teamsNeeded * 3,
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
      projection,
    },
  };

  return {
    visits: {
      gardenVisits,
      gardenSummerVisits,
      gardenWinterVisits,
      poolVisits,
      poolSummerVisits,
      poolWinterVisits,
      carWashes,
      windowCleanings,
      pavementCleanings,
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
      period: periodDiscount,
    },
    monthlyEquivalent: totalPlan / months,
    individualMonthlyAverage: totalIndividual / months,
    monthlyPayments: monthlyPayments.map((p) => ({
      ...p,
      total: p.total * (1 - planDiscount) * (1 - periodDiscount),
    })),
    simResults,
  };
};
