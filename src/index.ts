import axios from "axios";
import {
  FeaturedImage,
  Product,
  ProductImage,
  ProductOption,
  ProductVariant,
  ScrapeOptions,
} from "./types";

const shopifyIndicators = [/myshopify\.com/i];

export async function isValidURL(url: string): Promise<boolean> {
  try {
    const { data: html } = await axios.get(url);
    return shopifyIndicators.some((pattern) => pattern.test(html));
  } catch {
    return false;
  }
}

export async function scrape(url: string, clientOptions?: ScrapeOptions) {
  const isValid = await isValidURL(url);
  if (!isValid) return null;

  const options = {
    limit: clientOptions?.limit || Infinity,
    onProgress: clientOptions?.onProgress,
  };

  const data: Product[] = [];
  let page = 0;

  while (data.length < options.limit) {
    const limit = Math.min(250, options.limit - data.length);
    const { data: requestedData } = await axios.get(
      `${url}/products.json/?limit=${limit}&page=${page}`
    );

    if (!requestedData?.products?.length) break;

    data.push(...requestedData.products);
    if (options.onProgress)
      options.onProgress({
        progress: data.length / limit,
        products: data,
      });
    page++;
  }

  return data;
}
