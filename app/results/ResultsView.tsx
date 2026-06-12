"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import QuickWins from "./QuickWins";
import RouteCard from "./RouteCard";
import {
  analyzeRoutes,
  buildJourneySummary,
  buildVisitedCountryNames,
} from "@/lib/analyze-routes";
import type { Country } from "@/lib/countries";
import type { Route } from "@/lib/routes";
import { VISITED_COUNTRIES_STORAGE_KEY } from "@/lib/storage";

type ResultsViewProps = {
  routes: Route[];
  countries: Country[];
};

export default function ResultsView({
  routes,
  countries,
}: ResultsViewProps) {
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<"top" | "almost">("top");

  useEffect(() => {
    const stored = localStorage.getItem(
      VISITED_COUNTRIES_STORAGE_KEY,
    );

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setVisitedIds(parsed);
      } catch {
        // Ignore invalid stored data
      }
    }

    setHydrated(true);
  }, []);

  const countryNamesById = useMemo(
    () =>
      new Map(
        countries.map((country) => [
          country.id,
          country.country,
        ]),
      ),
    [countries],
  );

  const visitedCountryNames = useMemo(
    () =>
      buildVisitedCountryNames(
        visitedIds,
        countryNamesById,
      ),
    [visitedIds, countryNamesById],
  );

  const analyzedRoutes = useMemo(
    () =>
      analyzeRoutes(
        routes,
        visitedCountryNames,
      ),
    [routes, visitedCountryNames],
  );

  const topRoutes = useMemo(
    () =>
      [...analyzedRoutes].sort(
        (a, b) => b.potentialGain - a.potentialGain,
      ),
    [analyzedRoutes],
  );

  const almostCompletedRoutes = useMemo(
    () =>
      [...analyzedRoutes].sort((a, b) => {
        if (
          a.countriesRemaining !==
          b.countriesRemaining
        ) {
          return (
            a.countriesRemaining -
            b.countriesRemaining
          );
        }

        return (
          b.completionPercent -
          a.completionPercent
        );
      }),
    [analyzedRoutes],
  );

  const quickWins = useMemo(
    () =>
      [...analyzedRoutes]
        .filter(
          (route) =>
            route.countriesRemaining > 0 &&
            route.countriesRemaining <= 2,
        )
        .sort(
          (a, b) =>
            a.countriesRemaining -
            b.countriesRemaining,
        )
        .slice(0, 3),
    [analyzedRoutes],
  );

  const displayedRoutes =
    activeTab === "top"
      ? topRoutes
      : almostCompletedRoutes;

  const summary = useMemo(
    () =>
      buildJourneySummary(
        visitedCountryNames.size,
      ),
    [visitedCountryNames],
  );

  const milestones = [25, 50, 75, 100, 150, 193];

  const nextMilestone =
    milestones.find(
      (milestone) =>
        milestone > summary.visitedCount,
    ) ?? 193;

  const countriesToMilestone =
    nextMilestone - summary.visitedCount;

  if (!hydrated) {
    return (
      <p className="text-center text-zinc-500">
        Loading your journey...
      </p>
    );
  }

  if (visitedCountryNames.size === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-6 py-12 text-center">
        <p className="text-lg text-zinc-600">
          No visited countries found.
          Select your countries first
          to see route recommendations.
        </p>

        <Link
          href="/plan"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
        >
          Select Countries
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-zinc-900">
          Your Progress
        </h2>

        <dl className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-zinc-500">
              Visited Countries
            </dt>

            <dd className="mt-1 text-3xl font-semibold text-zinc-900">
              {summary.visitedCount}
            </dd>

            <div className="mt-3 inline-flex flex-col rounded-lg bg-sky-50 px-3 py-2">
              <span className="text-xs font-medium text-sky-600">
                🎯 Next Milestone
              </span>

              <span className="text-sm font-semibold text-sky-800">
                {nextMilestone}
              </span>

              <span className="text-xs text-sky-700">
                {countriesToMilestone} left
              </span>
            </div>
          </div>

          <div>
            <dt className="text-sm font-medium text-zinc-500">
              Progress to 100
            </dt>

            <dd className="mt-1 text-3xl font-semibold text-sky-600">
              {summary.progressTo100}%
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-zinc-500">
              Countries Remaining to 100
            </dt>

            <dd className="mt-1 text-3xl font-semibold text-zinc-900">
              {summary.remainingTo100}
            </dd>
          </div>
        </dl>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full rounded-full bg-sky-500 transition-all"
            style={{
              width: `${summary.progressTo100}%`,
            }}
          />
        </div>
      </div>

      <QuickWins routes={quickWins} />

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Recommended Routes
        </h2>

        <p className="mt-2 text-base text-zinc-500">
          Explore routes by maximum
          country gain or by completion
          progress.
        </p>

        <div className="mt-6 flex gap-2">
          <button
            onClick={() =>
              setActiveTab("top")
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "top"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Most New Countries
          </button>

          <button
            onClick={() =>
              setActiveTab("almost")
            }
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "almost"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            Closest to Finish
          </button>
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {displayedRoutes.map(
            (route, index) => (
              <RouteCard
                key={route.name}
                route={route}
                index={index}
                defaultExpanded={
                  index === 0
                }
              />
            ),
          )}
        </ul>
      </div>

      <div className="flex justify-center border-t border-zinc-100 pt-8">
        <Link
          href="/plan"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          ← Edit visited countries
        </Link>
      </div>
    </div>
  );
}