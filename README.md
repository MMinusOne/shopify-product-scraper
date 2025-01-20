# Shopify Product Scraper

A lightweight JavaScript library for scraping products from Shopify stores. This package provides a simple and efficient way to extract product data from Shopify websites.

**Key Features:**

1. **Product Scraping**: Extracts product data including title, handle, description, images, variants, and more.
2. **Shopify Indicators**: Automatically detects Shopify stores using a set of predefined indicators.
3. **Progress Tracking**: Provides a callback function to track the progress of the scraping process.
4. **Limit Control**: Allows you to limit the number of products to scrape.
5. **Error Handling**: Handles errors gracefully and returns false if the URL is invalid or the scraping process fails.

**Installation:**

You can install the package using npm:
```
npm install shopify-product-scraper
```
**Usage:**

Here's a basic example of how to use the package:
```javascript
import { scrape } from 'shopify-product-scraper';

const options = {
  limit: 10, // Limit the number of products to scrape
  onProgress: (progress) => {
    console.log(`Progress: ${progress.progress * 100}%`);
  },
};

scrape('https://example.myshopify.com', options)
  .then(products => {
    console.log(products);
  })
  .catch(error => {
    console.error(error);
  });
```
**License:**

This package is licensed under the MIT License.

