import type { RatePackage } from "@/types/beachcomber";

export function getCheapestPackage(packages: RatePackage[] | undefined): RatePackage | undefined {
  if (!packages?.length) return undefined;
  return packages.reduce((min, p) =>
    p.pricePerPersonZARFrom < min.pricePerPersonZARFrom ? p : min, packages[0]);
}
