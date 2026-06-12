import countryFlags from "@/lib/countryFlags";

interface RouteSummaryPanelProps {
  route: {
    name: string;
    countries: string[];
    score?: number;
  };
  visitedCountries: string[];
}

export default function RouteSummaryPanel({
  route,
  visitedCountries,
}: RouteSummaryPanelProps) {
  const visitedInRoute = route.countries.filter((country) =>
    visitedCountries.includes(country)
  );

  const remainingCountries = route.countries.filter(
    (country) => !visitedCountries.includes(country)
  );

  const completionPercentage =
    route.countries.length > 0
      ? Math.round(
          (visitedInRoute.length / route.countries.length) * 100
        )
      : 0;

  return (
    <div className="w-full md:w-[360px] rounded-xl border bg-white p-5 shadow-sm">
      {/* Route Name */}
      <h2 className="text-2xl font-bold">{route.name}</h2>

      <div className="mb-5 flex items-center gap-2">
        <span className="text-sm text-gray-500">
          {route.countries.length} countries
        </span>

        {completionPercentage >= 70 && (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium">
            ⚡ Quick Win
          </span>
        )}
      </div>

      {/* Progress */}
      <div>
        <h3 className="mb-2 font-semibold">Progress</h3>

        <div className="text-4xl font-bold">
          {completionPercentage}%
        </div>

        <p className="mb-3 text-sm text-gray-500">
          {visitedInRoute.length} of {route.countries.length} countries visited
        </p>

        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>

      <hr className="my-5" />

      {/* Remaining Countries */}
      <div>
        <h3 className="mb-2 font-semibold">
          Remaining Countries
        </h3>

        <ul className="space-y-1">
          {remainingCountries.map((country) => (
            <li
              key={country}
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-red-700 hover:bg-red-50"
            >
              <span className="text-lg">
                {countryFlags[country] || "🌍"}
              </span>

              <span>{country}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-sm text-gray-500">
          {remainingCountries.length} countries left
        </p>
      </div>

      <hr className="my-5" />

      {/* Visited Countries */}
      <div>
        <h3 className="mb-2 font-semibold">
          Visited Countries
        </h3>

        <ul className="space-y-1">
          {visitedInRoute.map((country) => (
            <li
              key={country}
              className="flex items-center gap-2 rounded-lg px-2 py-1 text-green-700 hover:bg-green-50"
            >
              <span className="text-lg">
                {countryFlags[country] || "🌍"}
              </span>

              <span>{country}</span>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-5" />

      {/* Route Score */}
      {route.score && (
        <>
          <div>
            <h3 className="mb-2 font-semibold">
              Route Score
            </h3>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">
                  {route.score}
                </span>

                <span className="pb-1 text-gray-500">
                  /100
                </span>
              </div>

              <div className="mt-1 text-sm font-medium text-green-700">
                {route.score >= 85
                  ? "🟢 Excellent Route"
                  : route.score >= 70
                  ? "🔵 Good Route"
                  : route.score >= 50
                  ? "🟡 Average Route"
                  : "🔴 Low Value Route"}
              </div>
            </div>
          </div>

          <hr className="my-5" />
        </>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button className="rounded-lg border px-4 py-2 hover:bg-gray-50">
          View Details
        </button>

        <button className="rounded-lg border px-4 py-2 hover:bg-gray-50">
          Back
        </button>
      </div>
    </div>
  );
}