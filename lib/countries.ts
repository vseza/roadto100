import fs from "fs";
import path from "path";

export type Country = {
  id: string;
  country: string;
  region: string;
  subregion: string;
};

export function getCountries(): Country[] {
  const filePath = path.join(process.cwd(), "data", "countries.csv");
  const content = fs.readFileSync(filePath, "utf-8");

  return content
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [id, country, region, subregion] = line.split(",");
      return { id, country, region, subregion };
    });
}
