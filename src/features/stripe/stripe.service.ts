/** Models */
import type { AppEvent } from '../events';
import type { AppUser } from '../users'

/** Functions */
export async function continueWithStripe(user: AppUser, event: AppEvent) {
    if (!event.stripePriceId) return;

    const res = await fetch(import.meta.env.VITE_STRIPE_CHECKOUTSESSION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: event.stripePriceId, customerEmail: user.email, firebaseUserId: user.id, eventId: event.id}),
    });

    const { url } = await res.json();
    window.location.href = url;
}