import { Suspense } from "react";
import MapView from "@/components/MapView";

export default function MapPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Route Map View
      </h1>

      <Suspense fallback={<div>Loading map...</div>}>
        <MapView />
      </Suspense>
    </main>
  );
}