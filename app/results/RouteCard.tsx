"use client";

import Link from "next/link";

import { useState } from "react";

import type { AnalyzedRoute } from "@/lib/analyze-routes";

const GRADIENTS = [
  "from-sky-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-red-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-sky-600",
];

type RouteCardProps = {
  route: AnalyzedRoute;
  index: number;
  defaultExpanded?: boolean;
};

export default function RouteCard({
  route,
  index,
  defaultExpanded = false,
}: RouteCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const progressPercent = Math.round(
    (route.countriesVisited / route.totalCountries) * 100,
  );

  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <li className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`h-1.5 bg-gradient-to-r ${gradient}`}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-zinc-50/80"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-zinc-900">
            {route.name}
          </h3>

          {route.insights.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {route.insights.map((insight) => {
                switch (insight) {
                  case "completed":
                    return (
                      <span
                        key={insight}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
                      >
                        ✅ Completed
                      </span>
                    );

                  case "one-left":
                    return (
                      <span
                        key={insight}
                        className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-800"
                      >
                        🔥 Only 1 country left
                      </span>
                    );

                  case "quick-win":
                    return (
                      <span
                        key={insight}
                        className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                      >
                        🚀 Quick Win
                      </span>
                    );

                  case "almost-complete":
                    return (
                      <span
                        key={insight}
                        className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800"
                      >
                        🏁 Almost Complete
                      </span>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-zinc-600">
              Visited:{" "}
              <span className="text-zinc-900">
                {route.countriesVisited}/{route.totalCountries}
              </span>
            </span>

            <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
              Potential Gain: +{route.potentialGain}
            </span>

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700">
              {progressPercent}% Complete
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
              <span>Route progress</span>
              <span>{progressPercent}%</span>
            </div>

            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <span
          className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {expanded && (
        <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-5">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Total Countries
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                {route.totalCountries}
              </dd>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Already Visited
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                {route.countriesVisited}
              </dd>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Remaining
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-zinc-900">
                {route.countriesRemaining}
              </dd>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
              <dt className="text-xs font-medium tracking-wide text-sky-600 uppercase">
                Potential Gain
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-sky-700">
                +{route.potentialGain}
              </dd>
            </div>
          </dl>

          {route.visitedCountries.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-zinc-900">
                Already Visited Countries
              </p>

              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {route.visitedCountries.map((country) => (
                  <li
                    key={country}
                    className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                    />
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          )}

{route.remainingCountries.length > 0 ? (
            <>
              <div className="mt-5">
                <p className="text-sm font-semibold text-zinc-900">
                  Remaining Countries
                </p>

                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {route.remainingCountries.map((country) => (
                    <li
                      key={country}
                      className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                      />
                      {country}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/map?route=${encodeURIComponent(route.name)}`}
                  className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                >
                  🗺️ View on Map
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                You've visited every country on this route. Nice work!
              </p>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/map?route=${encodeURIComponent(route.name)}`}
                  className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                >
                  🗺️ View on Map
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </li>
  );
}