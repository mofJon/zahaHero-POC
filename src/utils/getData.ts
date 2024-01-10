import { cache } from "react";
import { promises as fs } from "fs";

const getData = cache(async () => {
  const data = await fs.readFile(
    process.cwd() + "/public/data/zha.json",
    "utf8",
  );

  return JSON.parse(data);
});

export default getData;
