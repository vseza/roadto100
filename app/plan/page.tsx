import Link from "next/link";

import CountrySelector from "./CountrySelector";
import { getCountries } from "@/lib/countries";

export const metadata = {
  title: "Select Visited Countries — Road to 100",
  description: "Choose the countries you've visited and analyze your journey to 100.",
};

export default function PlanPage() {
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
              Select Visited Countries
            </h1>
            <p className="mt-3 text-lg text-zinc-500">
              Mark every country you&apos;ve been to. Your selections are saved
              automatically.
            </p>
          </div>

          <CountrySelector countries={countries} />
        </div>
      </main>
    </div>
  );
}
