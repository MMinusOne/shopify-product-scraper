const shopifyIndicators = [
  /shopify\.com/i,
  /cdn\.shopify\.com/i,
  /Shopify\.Buy\.SDK/i,
  /var Shopify =/i,
  /{{ '.*' | asset_url }}/i,
]

export async function isValidURL(url: string): Promise<boolean> {
  try {
    const html = await fetch(url).then((res) => res.text());
    return shopifyIndicators.some((pattern) => pattern.test(html));
  } catch {
    return false;
  }
}
