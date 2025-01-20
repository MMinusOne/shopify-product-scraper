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
  