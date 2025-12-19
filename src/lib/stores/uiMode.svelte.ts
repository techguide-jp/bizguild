import type { UIMode } from '$lib/mock/types';

// UIモード状態管理（Svelte 5 runes）
let mode = $state<UIMode>('PROVIDER');

export const uiMode = {
	get current() {
		return mode;
	},
	set current(value: UIMode) {
		mode = value;
	},
	toggle() {
		mode = mode === 'PROVIDER' ? 'SEEKER' : 'PROVIDER';
	},
	isProvider() {
		return mode === 'PROVIDER';
	},
	isSeeker() {
		return mode === 'SEEKER';
	}
};
