import type { Route } from "@/lib/routes";

export type AnalyzedRoute = {
  name: string;
  totalCountries: number;
  countriesVisited: number;
  countriesRemaining: number;
  potentialGain: number;
  completionPercent: number;
  insights: string[];
  remainingCountries: string[];
  visitedCountries: string[];
};

export type JourneySummary = {
  visitedCount: number;
  progressTo100: number;
  remainingTo100: number;
};

export function buildVisitedCountryNames(
  visitedIds: string[],
  countryNamesById: Map<string, string>,
): Set<string> {
  const names = new Set<string>();

  for (const id of visitedIds) {
    const name = countryNamesById.get(id);

    if (name) {
      names.add(name);
    }
  }

  return names;
}

export function analyzeRoutes(
  routes: Route[],
  visitedCountryNames: Set<string>,
): AnalyzedRoute[] {
  return routes.map((route) => {
    const visitedCountries = route.countries.filter((country) =>
      visitedCountryNames.has(country),
    );

    const remainingCountries = route.countries.filter(
      (country) => !visitedCountryNames.has(country),
    );

    const completionPercent = Math.round(
      (visitedCountries.length / route.countries.length) * 100,
    );

    const insights: string[] = [];

    if (remainingCountries.length === 0) {
      insights.push("completed");
    }

    if (remainingCountries.length === 1) {
      insights.push("one-left");
    }

    if (
      remainingCountries.length > 0 &&
      remainingCountries.length <= 2
    ) {
      insights.push("quick-win");
    }

    if (
      completionPercent >= 80 &&
      remainingCountries.length > 0
    ) {
      insights.push("almost-complete");
    }

    return {
      name: route.name,
      totalCountries: route.countries.length,
      countriesVisited: visitedCountries.length,
      countriesRemaining: remainingCountries.length,
      potentialGain: remainingCountries.length,
      completionPercent,
      insights,
      remainingCountries,
      visitedCountries,
    };
  });
}

export function buildJourneySummary(
  visitedCount: number,
): JourneySummary {
  return {
    visitedCount,
    progressTo100: Math.min(
      100,
      Math.round((visitedCount / 100) * 100),
    ),
    remainingTo100: Math.max(
      0,
      100 - visitedCount,
    ),
  };
}