/* Types */
import type { AppEvent } from '../types'

/* Lib */
export function splitEventsByFeatured(discounts: AppEvent[]): { featured: AppEvent[], notFeatured: AppEvent[] } {
    return discounts.reduce((acc: { featured: AppEvent[], notFeatured: AppEvent[] }, curr: AppEvent) => {
        if (curr.isFeatured) acc.featured.push(curr);
        else acc.notFeatured.push(curr);
        return acc;
    }, { featured: [], notFeatured: [] })
}