import axios from "axios";

const shopifyIndicators = [/myshopify\.com/i];

export async function isValidURL(url: string): Promise<boolean> {
  try {
    const { data: html } = await axios.get(url);
    return shopifyIndicators.some((pattern) => pattern.test(html));
  } catch {
    return false;
  }
}

export async function scrape(url: string, clientOptions: ScrapeOptions) {
  const isValid = await isValidURL(url);
  if (!isValid) return null;

  const options = {
    limit: clientOptions?.limit || Infinity,
    onProgress: clientOptions.onProgress
  }

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

export interface FeaturedImage {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: string | null;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

export interface ProductVariant {
  id: number;
  title: string;
  option1: string;
  option2?: string;
  option3?: string;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image?: FeaturedImage;
  available: boolean;
  price: string;
  grams: number;
  compare_at_price: string;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: number;
  created_at: string;
  position: number;
  updated_at: string;
  product_id: number;
  src: string;
  width: number;
  height: number;
}

export interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

export interface Product {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  options: ProductOption[];
}

export interface ScrapeOptions {
  limit?: number;
  onProgress?: (progressOptions: {
    progress: number;
    products: Product[];
  }) => void;
}
