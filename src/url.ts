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