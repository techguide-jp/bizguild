import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

const pricingCookieName = 'bizguild_pricing_unlocked';

export const load: PageServerLoad = ({ cookies }) => {
	return {
		pricingUnlocked: cookies.get(pricingCookieName) === 'true'
	};
};

export const actions: Actions = {
	unlockPricing: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = String(formData.get('password') ?? '');
		const expected = (env.PRICING_PASSWORD ?? '').trim();

		if (!expected || password !== expected) {
			return fail(400, {
				pricingError: 'パスワードが正しくありません。お手数ですがお問い合わせください。'
			});
		}

		cookies.set(pricingCookieName, 'true', {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev,
			maxAge: 60 * 60 * 24
		});

		return { pricingUnlocked: true };
	}
};
