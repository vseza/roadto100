"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Country } from "@/lib/countries";
import { VISITED_COUNTRIES_STORAGE_KEY } from "@/lib/storage";
import { getNextMilestone } from "@/lib/milestone";

type CountrySelectorProps = {
  countries: Country[];
};

export default function CountrySelector({
  countries,
}: CountrySelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(VISITED_COUNTRIES_STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setSelected(new Set(parsed));
      } catch {
        // Ignore invalid stored data
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      VISITED_COUNTRIES_STORAGE_KEY,
      JSON.stringify([...selected]),
    );
  }, [selected, hydrated]);

  const filteredCountries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return countries;

    return countries.filter(
      (country) =>
        (country.country || "").toLowerCase().includes(query) ||
        (country.region || "").toLowerCase().includes(query) ||
        (country.subregion || "").toLowerCase().includes(query),
    );
  }, [countries, search]);

  const stats = hydrated
    ? getNextMilestone(selected.size)
    : null;

  const toggleCountry = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="relative w-full">
          <span className="sr-only">
            Search countries
          </span>

          <svg
            className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search countries..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-4 pl-11 text-base text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-6 py-4">
          <p className="text-sm text-zinc-500">
            Countries Visited
          </p>

          <p className="text-3xl font-bold text-zinc-900">
            {hydrated ? selected.size : "—"}
          </p>

          {stats && (
            <>
              <p className="mt-2 text-sm text-zinc-600">
                Next milestone:{" "}
                {stats.nextMilestone}
              </p>

              <p className="font-medium text-sky-700">
                {stats.remaining} countries left
              </p>
            </>
          )}
        </div>
      </div>

      {filteredCountries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-6 py-12 text-center text-zinc-500">
          No countries match your search.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCountries.map((country) => {
            const isSelected =
              selected.has(country.id);

            return (
              <li key={country.id}>
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    isSelected
                      ? "border-sky-200 bg-sky-50"
                      : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() =>
                      toggleCountry(country.id)
                    }
                    className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
                  />

                  <span className="min-w-0">
                    <span className="block font-medium text-zinc-900">
                      {country.country}
                    </span>

                    <span className="mt-0.5 block text-sm text-zinc-500">
                      {country.region} ·{" "}
                      {country.subregion}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex justify-center border-t border-zinc-100 pt-8">
        {hydrated && selected.size > 0 ? (
          <Link
            href="/results"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
          >
            Analyze My Journey
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white opacity-50"
          >
            Analyze My Journey
          </button>
        )}
      </div>
    </div>
  );
}