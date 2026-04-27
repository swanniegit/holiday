import type { AirOption } from "@/types/beachcomber";
import { formatDateTime } from "@/lib/format";

export default function FlightCard({ flight }: { flight: AirOption }) {
  return (
    <div className="border border-cream-dark p-4 rounded-sm text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium text-charcoal">{flight.operatingCarrier}</span>
        <span className="text-xs text-charcoal/40">{flight.cabin}</span>
      </div>
      <div className="flex items-center gap-3 mt-2 text-charcoal/70">
        <span>{flight.fromArpt} → {flight.toArpt}</span>
        <span className="text-charcoal/40">·</span>
        <span>{formatDateTime(flight.depDateTime)}</span>
      </div>
    </div>
  );
}
