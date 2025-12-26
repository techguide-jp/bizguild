/**
 * 料金・手数料に関する定数
 * 変更が発生する可能性があるため、ここで一元管理
 */

// ============================================
// BizGuild プラン料金
// ============================================

/**
 * 最低契約期間（月数）
 * 全プラン共通
 */
export const MIN_CONTRACT_MONTHS = 12;

export const PLANS = {
	fixed: {
		name: '固定費プラン',
		initialFee: 800000, // 80万円
		monthlyFee: 10000, // 1万円
		monthlyFeeStartMonth: 1, // リリース月より
		ownerCommissionRate: 0.06, // 6%
		bizguildCommissionRate: 0.02, // 2%
		referrerCommissionRate: 0.07 // 7%
	},
	revenue: {
		name: 'バランスプラン',
		initialFee: 400000, // 40万円
		monthlyFee: 20000, // 2万円
		monthlyFeeStartMonth: 1, // リリース月より
		ownerCommissionRate: 0.04, // 4%
		bizguildCommissionRate: 0.04, // 4%
		referrerCommissionRate: 0.07 // 7%
	},
	monthly: {
		name: '月額重視プラン',
		initialFee: 200000, // 20万円
		monthlyFee: 30000, // 3万円
		monthlyFeeStartMonth: 1, // リリース月より
		ownerCommissionRate: 0.02, // 2%
		bizguildCommissionRate: 0.06, // 6%
		referrerCommissionRate: 0.07 // 7%
	}
} as const;

// ============================================
// 月額課金（コミュニティ参加費）の分配率
// ============================================

/**
 * メンバーからの月額課金（コミュニティ参加費）の分配率
 * 全プラン共通で一律適用
 */
export const SUBSCRIPTION_COMMISSION = {
	ownerRate: 0.6, // 60% - 運営者の取り分
	bizguildRate: 0.4 // 40% - BizGuildの取り分
} as const;

// ============================================
// 紹介者手数料のデフォルト値
// ============================================

/**
 * 紹介者手数料のデフォルト値
 * 商品ごとに設定可能。未設定の場合はこの値が適用される。
 */
export const DEFAULT_REFERRER_COMMISSION = {
	referralOnly: 0.07, // 7% - 紹介のみの場合
	closingSupport: 0.1 // 10% - クロージング代行の場合
} as const;

// ============================================
// プラットフォーム手数料（運営者分 + BizGuild分）
// ============================================

/**
 * プラットフォーム手数料（紹介者手数料を除く）
 * 運営者分 + BizGuild分の合計。プランにより異なるが、ここでは固定費プランの値を代表値として使用。
 */
export const PLATFORM_COMMISSION = {
	owner: PLANS.fixed.ownerCommissionRate, // 3.5%
	bizguild: PLANS.fixed.bizguildCommissionRate, // 0.5%
	get total() {
		return this.owner + this.bizguild; // 4%
	}
} as const;

// ============================================
// 手数料率（紹介のみ・クロージング代行）
// ============================================

/**
 * 総手数料率を計算
 * @param referrerRate 紹介者手数料率
 * @returns 総手数料率（紹介者分 + 運営者分 + BizGuild分）
 */
export function calcTotalCommissionRate(referrerRate: number): number {
	return referrerRate + PLATFORM_COMMISSION.owner + PLATFORM_COMMISSION.bizguild;
}

export const COMMISSION_RATES = {
	// 紹介のみ（やりとりは提供者本人）
	referralOnly: {
		referrer: DEFAULT_REFERRER_COMMISSION.referralOnly, // デフォルト7%
		get total() {
			return calcTotalCommissionRate(this.referrer);
		}
	},
	// クロージングまで代行
	closingSupport: {
		referrer: DEFAULT_REFERRER_COMMISSION.closingSupport, // デフォルト10%
		get total() {
			return calcTotalCommissionRate(this.referrer);
		}
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
