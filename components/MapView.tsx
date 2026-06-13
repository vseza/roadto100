"use client";

import { useEffect, useState } from "react";

import routes from "@/data/routes.json";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { useSearchParams } from "next/navigation";

import RouteSummaryPanel from "@/components/RouteSummaryPanel";

import { VISITED_COUNTRIES_STORAGE_KEY } from "@/lib/storage";
import { countryIdToName } from "@/lib/countryLookup";

export default function MapView() {
  const searchParams = useSearchParams();

  const [visitedCountries, setVisitedCountries] =
    useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(
      VISITED_COUNTRIES_STORAGE_KEY
    );

    if (!stored) return;

    try {
      const ids = JSON.parse(stored) as string[];

      const countryNames = ids
        .map((id) => countryIdToName[id])
        .filter(Boolean);

      setVisitedCountries(countryNames);
    } catch (error) {
      console.error(
        "Failed to load visited countries",
        error
      );
    }
  }, []);

  const routeId = searchParams.get("route");

  const selectedRoute =
    routes.find(
      (route) => route.name === routeId
    ) ?? routes[0];

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Your Travel Map
          </h2>

          <p className="text-gray-500">
            Visited Countries: {visitedCountries.length}
          </p>

          <p className="text-sm text-blue-600">
            Route: {selectedRoute.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-800" />
            <span>Visited + Route</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-500" />
            <span>Visited</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-500" />
            <span>Route</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-300" />
            <span>Other</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <div className="rounded-xl border bg-white p-2">
            <ComposableMap
              projection="geoEqualEarth"
              projectionConfig={{
                scale: 175,
              }}
              width={1000}
              height={500}
              style={{
                width: "100%",
                height: "auto",
              }}
            >
              <Geographies geography="/world-map.json">
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => {
                    const countryName =
                      geo.properties.name || "";

                    const isVisited =
                      visitedCountries.includes(
                        countryName
                      );

                    const isRoute =
                      selectedRoute.countries.includes(
                        countryName
                      );

                    let fillColor = "#BFC3CC";

                    if (isVisited && isRoute) {
                      fillColor = "#15803d";
                    } else if (isVisited) {
                      fillColor = "#22c55e";
                    } else if (isRoute) {
                      fillColor = "#3b82f6";
                    }

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>

        <div className="w-full lg:w-[360px]">
          <RouteSummaryPanel
            route={selectedRoute}
            visitedCountries={visitedCountries}
          />
        </div>
      </div>
    </div>
  );
}