import axios from "axios";

export async function isValidURL(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    const html = response.data;

    if (url.includes("myshopify.com")) {
      return true;
    }

    const shopifyIndicators = [
      /shopify\.com/i,
      /cdn\.shopify\.com/i,
      /Shopify\.Buy\.SDK/i,
      /var Shopify =/i,
      /{{ '.*' | asset_url }}/i,
    ];

    return shopifyIndicators.some((pattern) => pattern.test(html));
  } catch (error) {
    return false;
  }
}

export async function scrape(url: string, options: ScrapeOptions) {
  try {
    const isValid = await isValidURL(url);
    if (!isValid) {
      return null;
    }

    let page = 0;
    const data = [];

    while (true) {
      const limit = Math.min(250, options.limit - data.length);
      const { data: requestedData } = await axios.get(
        `${url}/products.json/?limit=${limit}&page=${page}`
      );
      if (requestedData?.products?.length > 0 || 0 >= limit) {
        data.push(...requestedData.products);
        options.onProgress({
          progress: data.length / options.limit,
          products: data,
        });
      } else {
        return data;
      }
      page++;
    }
  } catch (error) {
    throw error;
  }
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
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: FeaturedImage | null;
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
  limit: number;
  onProgress: (progressOptions: {
    progress: number;
    products: Product[];
  }) => void;
}
