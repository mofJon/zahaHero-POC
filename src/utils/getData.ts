import { cache } from "react";

const getData = cache(async () => {
  const domainRoot = process.env.NEXT_PUBLIC_URL;
  const rnd = Math.round(Math.random() * 100); //clear cache

  const response = await fetch(
    domainRoot + "data/zha.json?rnd=" + rnd, //fresh cache
    {
      method: "GET",
    },
  ).catch((err) => {
    throw new Error(err);
  });
  const data = await response.json();
  return data;
});

export default getData;
