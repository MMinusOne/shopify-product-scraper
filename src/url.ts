const shopifyIndicators = [/myshopify\.com/i];

export async function isValidURL(url: string): Promise<boolean> {
  try {
    const html = await fetch(url).then((res) => res.text());
    return shopifyIndicators.some((pattern) => pattern.test(html));
  } catch {
    return false;
  }
}
