import type { Product } from "@/data/products";
import { site } from "@/data/site";

/**
 * WhatsApp's wa.me links need the number in FULL INTERNATIONAL FORM with no
 * plus sign, no spaces and no leading zero.
 *
 *   Local number   075 619 8015
 *   Sri Lanka code +94
 *   wa.me number   94756198015
 *
 * `wa.me/0756198015` would NOT reach the shop — always build links with the
 * helpers below rather than writing a URL by hand.
 */
export const WHATSAPP_NUMBER = "94756198015";

/** Builds a WhatsApp link that opens a chat with the message already typed in. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** The message a customer sends when they tap "Order Now" on a product card. */
export function productOrderUrl(product: Product): string {
  return whatsappUrl(
    `Hi ${site.name}! I would like to order:\n` +
      `${product.name} - ${product.quantity} - ${product.priceLabel}\n\n` +
      `Please let me know the availability and ordering details.`,
  );
}

/** Message for ordering a custom celebration cake in a given style. */
export function cakeOrderUrl(styleName?: string): string {
  return whatsappUrl(
    `Hi ${site.name}! I would like to order a celebration cake` +
      (styleName ? ` (${styleName})` : "") +
      `.\n\n` +
      `Occasion: \nDate needed: \nSize / servings: \nName or message on the cake: \n\n` +
      `Please let me know the price and availability.`,
  );
}

/** The message used by every general "Order on WhatsApp" button. */
export const generalOrderUrl = whatsappUrl(
  `Hi ${site.name}! I would like to place an order.\n\n` +
    `Please let me know the availability and ordering details.`,
);

/** Tap-to-call link. Uses the local dialling form, as printed on the poster. */
export const telUrl = `tel:${site.phoneTel}`;
