import Link from "next/link";

import ResultsView from "./ResultsView";
import { getCountries } from "@/lib/countries";
import { getRoutes } from "@/lib/routes";

export const metadata = {
  title: "Your Journey Results — Road to 100",
  description:
    "See your progress toward 100 countries and discover the best routes to maximize your next trip.",
};

export default function ResultsPage() {
  const routes = getRoutes();
  const countries = getCountries();

  return (
    <div className="min-h-full bg-white font-sans text-zinc-900">
      <header className="border-b border-zinc-100 px-6 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            ← Road to 100
          </Link>
        </div>
      </header>

      <main className="px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Your Journey Results
            </h1>
            <p className="mt-3 text-lg text-zinc-500">
              Routes ranked by how many new countries you could add on your next
              trip.
            </p>
          </div>

          <ResultsView routes={routes} countries={countries} />
        </div>
      </main>
    </div>
  );
}
