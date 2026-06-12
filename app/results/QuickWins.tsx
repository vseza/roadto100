type QuickWinRoute = {
    name: string;
    countriesRemaining: number;
    remainingCountries: string[];
  };
  
  type QuickWinsProps = {
    routes: QuickWinRoute[];
  };
  
  export default function QuickWins({ routes }: QuickWinsProps) {
    if (routes.length === 0) {
      return null;
    }
  
    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-xl font-semibold text-zinc-900">
          🎯 Quick Wins
        </h2>
  
        <p className="mt-2 text-sm text-zinc-600">
          Routes you can finish with the fewest additional countries.
        </p>
  
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {routes.map((route) => (
            <div
              key={route.name}
              className="rounded-xl border border-amber-200 bg-white p-4"
            >
              <h3 className="font-semibold text-zinc-900">
                {route.name}
              </h3>
  
              <p className="mt-1 text-sm text-zinc-600">
                {route.countriesRemaining} country
                {route.countriesRemaining > 1 ? "ies" : ""} left
              </p>
  
              <div className="mt-3 flex flex-wrap gap-2">
                {route.remainingCountries.map((country) => (
                  <span
                    key={country}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-700"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }