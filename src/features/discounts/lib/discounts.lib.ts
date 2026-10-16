/* Types */
import type { Discount } from '../types'

/* Lib */
export function splitDisocuntsByFeatured(discounts: Discount[]): { featured: Discount[], notFeatured: Discount[] } {
    return discounts.reduce((acc: { featured: Discount[], notFeatured: Discount[] }, curr: Discount) => {
        if (curr.isFeatured) acc.featured.push(curr);
        else acc.notFeatured.push(curr);
        return acc;
    }, { featured: [], notFeatured: [] })
}