import fs from "fs";
import path from "path";

export type Route = {
  name: string;
  countries: string[];
};

export function getRoutes(): Route[] {
  const filePath = path.join(process.cwd(), "data", "routes.json");
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Route[];
}
