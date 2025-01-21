import { Product, ScrapeOptions } from "./types";
import { isValidURL } from "./url";

export async function scrape(
  url: string,
  { limit = Infinity, onProgress }: ScrapeOptions = {},
) {
  const isValid = await isValidURL(url);
  if (!isValid) return null;

  const data: Product[] = [];
  let page = 0;

  while (data.length < limit) {
    const pageLimit = Math.min(250, limit - data.length);

    const requestedData = await fetch(
      `${url}/products.json/?limit=${pageLimit}&page=${page}`,
    ).then((res) => res.json());

    if (!requestedData?.products?.length) break;

    data.push(...requestedData.products);
    if (onProgress)
      onProgress({
        progress: data.length / limit,
        products: data,
      });
    page++;
  }

  return data;
}
