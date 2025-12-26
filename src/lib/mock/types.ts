// ユーザー
export interface User {
	id: string;
	name: string;
	email: string;
	slug: string;
	avatarUrl?: string;
	status: 'PENDING' | 'ACTIVE' | 'SUSPENDED';
	headline?: string;
	specialties: string[];
	theme: {
		primaryColor: string;
		accentColor: string;
		bgColor: string;
		textColor: string;
	};
	isAdmin?: boolean;
}

// 商品
export interface Product {
	id: string;
	title: string;
	summary?: string;
	descriptionMd?: string;
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
	type: 'ONE_TIME' | 'SUBSCRIPTION' | 'OUTCOME' | 'QUOTE';
	price?: number;
	priceMin?: number;
	priceMax?: number;
	tags: string[];
	images: string[];
	providerVisibility: 'FULL' | 'PARTIAL' | 'HIDDEN';
	pointPolicy?: {
		mode: 'FIXED' | 'PERCENT';
		value: number;
	};
	// 紹介者手数料率（未設定時はデフォルト値を使用）
	referrerCommissionRate?: number; // 紹介のみ（デフォルト: 0.07 = 7%）
	referrerCommissionRateClose?: number; // クロージング代行（デフォルト: 0.10 = 10%）
	owner: User;
	createdAt: string;
}

// ボード（おすすめ）
export interface BoardItem {
	product: Product;
	comment?: string;
}

export interface Board {
	id: string;
	title: string;
	items: BoardItem[];
}

// 相談
export interface Inquiry {
	id: string;
	name?: string;
	email?: string;
	message: string;
	status: 'NEW' | 'READ' | 'CONVERTED';
	createdAt: string;
	sourceProduct?: Product;
}

// 案件メンバー
export interface DealMember {
	user: User;
	role: 'FRONT' | 'PROVIDER' | 'COLLABORATOR';
	isClientVisible: boolean;
}

// 案件タスク
export interface DealTask {
	id: string;
	title: string;
	status: 'TODO' | 'DOING' | 'DONE';
	assignee?: User;
	dueAt?: string;
	isClientVisible: boolean;
}

// 案件コメント
export interface DealComment {
	id: string;
	author: User;
	body: string;
	isClientVisible: boolean;
	createdAt: string;
}

// 案件
export type DealStage =
	| 'CONSULT'
	| 'HEARING'
	| 'PROPOSAL'
	| 'ESTIMATE'
	| 'ORDERED'
	| 'DELIVERY'
	| 'INVOICE'
	| 'DONE'
	| 'CANCELLED';

export interface Deal {
	id: string;
	title: string;
	stage: DealStage;
	members: DealMember[];
	tasks: DealTask[];
	comments: DealComment[];
	shareToken?: string;
	createdAt: string;
}

// 注文アイテム
export interface OrderItem {
	product: Product;
	quantity: number;
	unitPrice: number;
}

// 注文
export interface Order {
	id: string;
	orderNo: string;
	status: 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED' | 'REFUNDED';
	seller: User;
	buyer?: User;
	items: OrderItem[];
	subtotal: number;
	pointsDiscount: number;
	total: number;
	createdAt: string;
}

// ポイント履歴
export interface PointLedgerEntry {
	id: string;
	type: 'EARN' | 'SPEND' | 'ADJUST' | 'REVERSAL';
	points: number;
	note?: string;
	createdAt: string;
}

// ポイントアカウント
export interface PointAccount {
	balance: number;
	ledger: PointLedgerEntry[];
}

// 招待コード
export interface InviteCode {
	id: string;
	code: string;
	usedBy?: User;
	createdAt: string;
	usedAt?: string;
}

// ステージラベル
export const STAGE_LABELS: Record<DealStage, string> = {
	CONSULT: '相談',
	HEARING: 'ヒアリング',
	PROPOSAL: '提案',
	ESTIMATE: '見積',
	ORDERED: '受注',
	DELIVERY: '納品',
	INVOICE: '請求',
	DONE: '完了',
	CANCELLED: 'キャンセル'
};

// 商品タイプラベル
export const PRODUCT_TYPE_LABELS: Record<Product['type'], string> = {
	ONE_TIME: '単発',
	SUBSCRIPTION: 'サブスク',
	OUTCOME: '成果報酬',
	QUOTE: '見積'
};

// 提供者表示レベルラベル
export const VISIBILITY_LABELS: Record<Product['providerVisibility'], string> = {
	FULL: '完全表示',
	PARTIAL: '名前のみ',
	HIDDEN: '非表示'
};

// フォロー
export interface Follow {
	id: string;
	followerId: string;
	followingId: string;
	createdAt: string;
}

// ブックマーク
export interface Bookmark {
	id: string;
	userId: string;
	productId: string;
	createdAt: string;
}

// 閲覧履歴
export interface ViewHistory {
	id: string;
	userId: string;
	productId: string;
	viewedAt: string;
}

// フィードアイテム
export type FeedItemType = 'NEW_PRODUCT' | 'PRODUCT_UPDATE' | 'ROOM_UPDATE';

export interface FeedItem {
	id: string;
	type: FeedItemType;
	user: User;
	product?: Product;
	createdAt: string;
}

// UIモード
export type UIMode = 'PROVIDER' | 'SEEKER';

// UIモードラベル
export const UI_MODE_LABELS: Record<UIMode, string> = {
	PROVIDER: '提供モード',
	SEEKER: '探索モード'
};

// ===== 分析関連 =====

// 商品分析データ
export interface ProductAnalytics {
	productId: string;
	product: Product;
	views: number;
	bookmarks: number;
	inquiries: number;
	conversions: number;
	conversionRate: number;
}

// 日別統計
export interface DailyStats {
	date: string;
	views: number;
	profileViews: number;
	inquiries: number;
	followers: number;
}

// 流入元
export type TrafficSource = 'SEARCH' | 'PROFILE' | 'PRODUCT' | 'REFERRAL' | 'ROOM' | 'DIRECT';

// 流入元ラベル
export const TRAFFIC_SOURCE_LABELS: Record<TrafficSource, string> = {
	SEARCH: '検索',
	PROFILE: 'プロフィール',
	PRODUCT: '商品ページ',
	REFERRAL: '紹介リンク',
	ROOM: 'おすすめ',
	DIRECT: 'ダイレクト'
};

// 流入元分析
export interface TrafficAnalytics {
	source: TrafficSource;
	count: number;
	percentage: number;
}

// 紹介リンク分析
export interface ReferralAnalytics {
	refCode: string;
	product: Product;
	referrer: User;
	clicks: number;
	inquiries: number;
	conversions: number;
	pointsEarned: number;
}

// タグ分析
export interface TagAnalytics {
	tag: string;
	views: number;
	inquiries: number;
}

// 訪問者属性
export interface VisitorAnalytics {
	specialty: string;
	count: number;
	percentage: number;
}

// 分析期間
export type AnalyticsPeriod = '7d' | '30d' | '90d' | 'custom';

// 分析期間ラベル
export const ANALYTICS_PERIOD_LABELS: Record<AnalyticsPeriod, string> = {
	'7d': '過去7日',
	'30d': '過去30日',
	'90d': '過去90日',
	custom: 'カスタム'
};

// 分析サマリー
export interface AnalyticsSummary {
	period: AnalyticsPeriod;
	totalViews: number;
	totalInquiries: number;
	totalConversions: number;
	conversionRate: number;
	followerCount: number;
	followerGrowth: number;
	avgResponseTime: number;
}
