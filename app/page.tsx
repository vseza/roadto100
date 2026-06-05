const features = [
  {
    title: "Track visited countries",
    description:
      "Keep a clear record of every country you've explored and see how close you are to 100.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.264.26-2.467.732-3.553"
        />
      </svg>
    ),
  },
  {
    title: "Discover efficient travel routes",
    description:
      "Find multi-country itineraries that maximize new stamps with minimal travel time.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Reach 100 countries faster",
    description:
      "Strategic route planning helps you hit milestones sooner without burning out.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5 10.5 6.75 14.25 10.5 19.5 5.25M19.5 5.25h-4.125M19.5 5.25v4.125"
        />
      </svg>
    ),
  },
];

const routes = [
  {
    name: "Central Asia",
    countries: "+5 countries",
    description: "Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    name: "Gulf Explorer",
    countries: "+6 countries",
    description: "UAE, Oman, Bahrain, Qatar, Kuwait, Saudi Arabia",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "North Africa",
    countries: "+3 countries",
    description: "Morocco, Tunisia, Algeria",
    gradient: "from-rose-500 to-red-600",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28 lg:px-12">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium tracking-wide text-sky-600 uppercase">
            For travelers &amp; country collectors
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Road to 100
          </h1>
          <p className="mt-6 text-xl font-medium text-zinc-700 sm:text-2xl">
            Plan your journey to 100 countries
          </p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-500">
            Discover the fastest routes to your next travel milestone.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Start Planning
            </a>
          </div>
        </div>
      </section>

      {/* Why Road to 100 */}
      <section className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Why Road to 100?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
              Everything you need to plan smarter trips and grow your country
              count.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Routes */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Example Routes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-500">
              Curated multi-country trips designed to maximize your progress.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <div
                key={route.name}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${route.gradient}`}
                  aria-hidden="true"
                />
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-zinc-900">
                      {route.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
                      {route.countries}
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-zinc-500">
                    {route.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-100 px-6 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-base font-semibold text-zinc-900">Road to 100</p>
          <p className="mt-1 text-sm text-zinc-400">
            Plan your journey to 100 countries.
          </p>
        </div>
      </footer>
    </div>
  );
}
