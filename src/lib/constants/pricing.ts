/**
 * 料金・手数料に関する定数
 * 変更が発生する可能性があるため、ここで一元管理
 */

// ============================================
// BizGuild プラン料金
// ============================================

export const PLANS = {
	fixed: {
		name: '固定費プラン',
		initialFee: 600000, // 60万円
		monthlyFee: 10000, // 1万円
		monthlyFeeStartMonth: 6, // リリース後6ヶ月目より
		ownerCommissionRate: 0.035, // 3.5%
		bizguildCommissionRate: 0.005, // 0.5%
		referrerCommissionRate: 0.07 // 7%
	},
	revenue: {
		name: 'レベニューシェアプラン',
		initialFee: 0,
		monthlyFee: 10000, // 1万円
		monthlyFeeStartMonth: 1, // リリース月より
		ownerCommissionRate: 0.01, // 1%
		bizguildCommissionRate: 0.03, // 3%
		referrerCommissionRate: 0.07 // 7%
	},
	monthly: {
		name: '月額重視プラン',
		initialFee: 200000, // 20万円
		monthlyFee: 30000, // 3万円
		monthlyFeeStartMonth: 1, // リリース月より
		ownerCommissionRate: 0.02, // 2%
		bizguildCommissionRate: 0.02, // 2%
		referrerCommissionRate: 0.07 // 7%
	}
} as const;

// ============================================
// 手数料率（紹介のみ・クロージング代行）
// ============================================

export const COMMISSION_RATES = {
	// 紹介のみ（やりとりは提供者本人）
	referralOnly: {
		total: 0.1, // 10%
		referrer: 0.07 // 7%
		// owner と bizguild はプランによって異なる
	},
	// クロージングまで代行
	closingSupport: {
		total: 0.13, // 13%
		referrer: 0.1 // 10%
		// owner と bizguild はプランによって異なる
	}
} as const;

// ============================================
// 競合他社の手数料率
// ============================================

export const COMPETITOR_COMMISSION_RATES = {
	// クラウドソーシング系
	lancers: {
		name: 'ランサーズ',
		rate: 0.165, // 16.5%
		note: '10万円以下'
	},
	crowdworks: {
		name: 'クラウドワークス',
		rate: 0.2, // 20%
		note: '10万円以下'
	},
	coconala: {
		name: 'ココナラ',
		rate: 0.22, // 22%
		note: '一律'
	},
	// マッチング系
	visasq: {
		name: 'ビザスク',
		rate: 0.3, // 30%
		note: 'スポットコンサル'
	},
	yenta: {
		name: 'Yenta',
		rate: null, // 月額制
		monthlyFee: 6800, // 月額6,800円〜
		note: '成約手数料なし'
	},
	// 紹介・営業代行系
	saleshub: {
		name: 'Saleshub',
		rate: 0.5, // 50%
		note: '成約報酬から'
	},
	salesAgent: {
		name: '紹介営業代行会社',
		rate: { min: 0.2, max: 0.3 }, // 20-30%
		note: '成約金額に対して'
	},
	advisor: {
		name: '顧問紹介サービス',
		rate: { min: 0.3, max: 0.5 }, // 30-50%
		note: '顧問料から継続的に徴収'
	}
} as const;

// ============================================
// 表示用フォーマット関数
// ============================================

/**
 * 金額を万円単位でフォーマット
 */
export function formatPriceYen(amount: number): string {
	if (amount === 0) return '0円';
	if (Math.abs(amount) >= 10000) {
		const man = amount / 10000;
		let rounded = Math.round(man * 10) / 10;
		if (Object.is(rounded, -0)) rounded = 0;
		const formatted =
			Math.abs(rounded % 1) < Number.EPSILON ? rounded.toFixed(0) : rounded.toFixed(1);
		return `${formatted}万円`;
	}
	return `${Math.round(amount).toLocaleString()}円`;
}

/**
 * パーセンテージをフォーマット
 */
export function formatPercent(rate: number): string {
	return `${(rate * 100).toFixed(1)}%`;
}

/**
 * パーセンテージを整数でフォーマット
 */
export function formatPercentInt(rate: number): string {
	return `${Math.round(rate * 100)}%`;
}
