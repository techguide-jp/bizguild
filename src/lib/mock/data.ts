import type {
	User,
	Product,
	Board,
	Inquiry,
	Deal,
	Order,
	PointAccount,
	InviteCode,
	Follow,
	Bookmark,
	ViewHistory,
	FeedItem,
	UIMode,
	ProductAnalytics,
	DailyStats,
	TrafficAnalytics,
	TagAnalytics,
	VisitorAnalytics,
	ReferralAnalytics,
	AnalyticsSummary
} from './types';

// === ユーザー ===
export const users: User[] = [
	{
		id: 'user-1',
		name: '田中 太郎',
		email: 'tanaka@example.com',
		slug: 'tanaka-taro',
		avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tanaka',
		status: 'ACTIVE',
		headline: 'Webマーケティングコンサルタント',
		specialties: ['SEO', 'リスティング広告', 'SNS運用'],
		theme: {
			primaryColor: '#2563eb',
			accentColor: '#3b82f6',
			bgColor: '#f8fafc',
			textColor: '#1e293b'
		},
		isAdmin: true
	},
	{
		id: 'user-2',
		name: '鈴木 花子',
		email: 'suzuki@example.com',
		slug: 'suzuki-hanako',
		avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=suzuki',
		status: 'ACTIVE',
		headline: 'UIデザイナー / ブランディング',
		specialties: ['UI/UX', 'ロゴデザイン', 'ブランド戦略'],
		theme: {
			primaryColor: '#7c3aed',
			accentColor: '#8b5cf6',
			bgColor: '#faf5ff',
			textColor: '#1e1b4b'
		}
	},
	{
		id: 'user-3',
		name: '佐藤 次郎',
		email: 'sato@example.com',
		slug: 'sato-jiro',
		avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sato',
		status: 'ACTIVE',
		headline: 'システム開発エンジニア',
		specialties: ['Web開発', 'モバイルアプリ', 'クラウド構築'],
		theme: {
			primaryColor: '#059669',
			accentColor: '#10b981',
			bgColor: '#f0fdf4',
			textColor: '#14532d'
		}
	},
	{
		id: 'user-4',
		name: '山田 美咲',
		email: 'yamada@example.com',
		slug: 'yamada-misaki',
		status: 'PENDING',
		headline: '経営コンサルタント',
		specialties: ['事業戦略', '資金調達', 'M&A'],
		theme: {
			primaryColor: '#dc2626',
			accentColor: '#ef4444',
			bgColor: '#fef2f2',
			textColor: '#450a0a'
		}
	}
];

export const currentUser = users[0];

// === 商品 ===
export const products: Product[] = [
	{
		id: 'prod-1',
		title: 'SEOコンサルティング',
		summary: '検索順位を上げて集客力アップ！月次レポート付き',
		descriptionMd: `## サービス内容

- キーワード調査・分析
- 競合サイト分析
- 内部SEO改善提案
- 月次レポート提出

## こんな方におすすめ

- オーガニック流入を増やしたい
- 広告費を削減したい
- 長期的な集客基盤を作りたい`,
		status: 'PUBLISHED',
		type: 'SUBSCRIPTION',
		price: 100000,
		tags: ['SEO', 'マーケティング', 'コンサルティング'],
		images: ['https://placehold.co/800x400/2563eb/white?text=SEO+Consulting'],
		providerVisibility: 'FULL',
		pointPolicy: { mode: 'PERCENT', value: 10 },
		owner: users[0],
		createdAt: '2024-01-15T10:00:00Z'
	},
	{
		id: 'prod-2',
		title: 'ロゴデザイン制作',
		summary: 'ブランドの顔となるロゴを制作します。3案提案。',
		descriptionMd: `## 制作の流れ

1. ヒアリング（オンライン）
2. コンセプト提案
3. デザイン案3つ提出
4. 修正（2回まで）
5. 納品

## 納品物

- ロゴデータ（AI, PNG, SVG）
- カラーガイド
- 使用ガイドライン`,
		status: 'PUBLISHED',
		type: 'ONE_TIME',
		price: 150000,
		tags: ['デザイン', 'ロゴ', 'ブランディング'],
		images: ['https://placehold.co/800x400/7c3aed/white?text=Logo+Design'],
		providerVisibility: 'FULL',
		pointPolicy: { mode: 'FIXED', value: 5000 },
		owner: users[1],
		createdAt: '2024-02-01T10:00:00Z'
	},
	{
		id: 'prod-3',
		title: 'Webアプリ開発',
		summary: '要件定義から運用まで一気通貫でサポート',
		descriptionMd: `## 対応範囲

- 要件定義・設計
- フロントエンド開発
- バックエンド開発
- インフラ構築
- 運用・保守

## 使用技術

- TypeScript / React / Next.js
- Node.js / NestJS
- PostgreSQL / Redis
- AWS / GCP`,
		status: 'PUBLISHED',
		type: 'QUOTE',
		priceMin: 500000,
		priceMax: 5000000,
		tags: ['開発', 'Webアプリ', 'システム'],
		images: ['https://placehold.co/800x400/059669/white?text=Web+Development'],
		providerVisibility: 'PARTIAL',
		owner: users[2],
		createdAt: '2024-02-15T10:00:00Z'
	},
	{
		id: 'prod-4',
		title: 'リスティング広告運用代行',
		summary: 'Google/Yahoo広告の運用をお任せください',
		status: 'PUBLISHED',
		type: 'OUTCOME',
		tags: ['広告', 'マーケティング', 'リスティング'],
		images: ['https://placehold.co/800x400/2563eb/white?text=PPC+Ads'],
		providerVisibility: 'HIDDEN',
		pointPolicy: { mode: 'PERCENT', value: 5 },
		owner: users[0],
		createdAt: '2024-03-01T10:00:00Z'
	},
	{
		id: 'prod-5',
		title: 'UIデザイン改善',
		summary: '既存サービスのUI/UXを改善してCVR向上',
		status: 'DRAFT',
		type: 'QUOTE',
		priceMin: 200000,
		priceMax: 800000,
		tags: ['デザイン', 'UI/UX', '改善'],
		images: [],
		providerVisibility: 'FULL',
		owner: users[1],
		createdAt: '2024-03-10T10:00:00Z'
	}
];

// === ボード ===
export const boards: Board[] = [
	{
		id: 'board-1',
		title: 'おすすめサービス',
		items: [
			{
				product: products[1],
				comment: '信頼できるデザイナーさんです！'
			},
			{
				product: products[2],
				comment: '技術力が高く、コミュニケーションも◎'
			}
		]
	}
];

// === 相談 ===
export const inquiries: Inquiry[] = [
	{
		id: 'inq-1',
		name: '新規顧客A',
		email: 'client-a@example.com',
		message: 'SEOについて相談したいです。現在月間1万PVですが、3万PVを目指しています。',
		status: 'NEW',
		createdAt: '2024-03-15T09:00:00Z',
		sourceProduct: products[0]
	},
	{
		id: 'inq-2',
		name: '新規顧客B',
		email: 'client-b@example.com',
		message: '新規サービスのロゴを作りたいです。予算は15万円程度で考えています。',
		status: 'READ',
		createdAt: '2024-03-14T14:00:00Z',
		sourceProduct: products[1]
	},
	{
		id: 'inq-3',
		message: 'ECサイトを作りたいのですが、費用感を教えてください。',
		status: 'CONVERTED',
		createdAt: '2024-03-10T11:00:00Z'
	}
];

// === 案件 ===
export const deals: Deal[] = [
	{
		id: 'deal-1',
		title: '株式会社A様 SEOコンサルティング',
		stage: 'DELIVERY',
		members: [
			{ user: users[0], role: 'FRONT', isClientVisible: true },
			{ user: users[2], role: 'COLLABORATOR', isClientVisible: false }
		],
		tasks: [
			{
				id: 'task-1',
				title: 'キーワード調査',
				status: 'DONE',
				assignee: users[0],
				isClientVisible: true
			},
			{
				id: 'task-2',
				title: '競合分析レポート作成',
				status: 'DONE',
				assignee: users[0],
				isClientVisible: true
			},
			{
				id: 'task-3',
				title: '改善提案書作成',
				status: 'DOING',
				assignee: users[0],
				dueAt: '2024-03-20',
				isClientVisible: true
			},
			{
				id: 'task-4',
				title: '月次レポート（3月分）',
				status: 'TODO',
				assignee: users[0],
				dueAt: '2024-03-31',
				isClientVisible: false
			}
		],
		comments: [
			{
				id: 'comment-1',
				author: users[0],
				body: 'キーワード調査が完了しました。競合分析に移ります。',
				isClientVisible: true,
				createdAt: '2024-03-10T10:00:00Z'
			},
			{
				id: 'comment-2',
				author: users[2],
				body: '技術的なSEO観点でサポートしますね。',
				isClientVisible: false,
				createdAt: '2024-03-11T15:00:00Z'
			}
		],
		shareToken: 'share-token-abc123',
		createdAt: '2024-03-01T10:00:00Z'
	},
	{
		id: 'deal-2',
		title: 'B社ロゴリニューアル',
		stage: 'PROPOSAL',
		members: [
			{ user: users[1], role: 'FRONT', isClientVisible: true },
			{ user: users[0], role: 'COLLABORATOR', isClientVisible: true }
		],
		tasks: [
			{
				id: 'task-5',
				title: 'ヒアリング実施',
				status: 'DONE',
				assignee: users[1],
				isClientVisible: true
			},
			{
				id: 'task-6',
				title: 'コンセプト案作成',
				status: 'DOING',
				assignee: users[1],
				dueAt: '2024-03-18',
				isClientVisible: false
			}
		],
		comments: [
			{
				id: 'comment-3',
				author: users[1],
				body: 'ヒアリング完了しました。来週コンセプトをご提案します。',
				isClientVisible: true,
				createdAt: '2024-03-14T16:00:00Z'
			}
		],
		createdAt: '2024-03-12T10:00:00Z'
	},
	{
		id: 'deal-3',
		title: 'C社 Webシステム開発',
		stage: 'ESTIMATE',
		members: [{ user: users[2], role: 'FRONT', isClientVisible: true }],
		tasks: [
			{
				id: 'task-7',
				title: '要件定義',
				status: 'DONE',
				assignee: users[2],
				isClientVisible: true
			},
			{
				id: 'task-8',
				title: '見積書作成',
				status: 'DOING',
				assignee: users[2],
				dueAt: '2024-03-16',
				isClientVisible: false
			}
		],
		comments: [],
		createdAt: '2024-03-05T10:00:00Z'
	}
];

// === 注文 ===
export const orders: Order[] = [
	{
		id: 'order-1',
		orderNo: 'ORD-2024-0001',
		status: 'PAID',
		seller: users[0],
		buyer: users[1],
		items: [{ product: products[0], quantity: 1, unitPrice: 100000 }],
		subtotal: 100000,
		pointsDiscount: 0,
		total: 100000,
		createdAt: '2024-02-01T10:00:00Z'
	},
	{
		id: 'order-2',
		orderNo: 'ORD-2024-0002',
		status: 'PENDING_PAYMENT',
		seller: users[1],
		items: [{ product: products[1], quantity: 1, unitPrice: 150000 }],
		subtotal: 150000,
		pointsDiscount: 5000,
		total: 145000,
		createdAt: '2024-03-10T10:00:00Z'
	},
	{
		id: 'order-3',
		orderNo: 'ORD-2024-0003',
		status: 'PAID',
		seller: users[2],
		buyer: users[0],
		items: [{ product: products[2], quantity: 1, unitPrice: 800000 }],
		subtotal: 800000,
		pointsDiscount: 0,
		total: 800000,
		createdAt: '2024-03-05T10:00:00Z'
	}
];

// === ポイント ===
export const pointAccount: PointAccount = {
	balance: 15000,
	ledger: [
		{
			id: 'pt-1',
			type: 'EARN',
			points: 10000,
			note: '紹介報酬: ロゴデザイン制作',
			createdAt: '2024-02-15T10:00:00Z'
		},
		{
			id: 'pt-2',
			type: 'EARN',
			points: 8000,
			note: '紹介報酬: SEOコンサルティング',
			createdAt: '2024-03-01T10:00:00Z'
		},
		{
			id: 'pt-3',
			type: 'SPEND',
			points: -5000,
			note: '注文: ORD-2024-0002',
			createdAt: '2024-03-10T10:00:00Z'
		},
		{
			id: 'pt-4',
			type: 'ADJUST',
			points: 2000,
			note: '管理者調整: キャンペーン付与',
			createdAt: '2024-03-12T10:00:00Z'
		}
	]
};

// === 招待コード ===
export const inviteCodes: InviteCode[] = [
	{
		id: 'inv-1',
		code: 'WELCOME2024',
		createdAt: '2024-01-01T10:00:00Z'
	},
	{
		id: 'inv-2',
		code: 'FRIEND123',
		usedBy: users[2],
		createdAt: '2024-02-01T10:00:00Z',
		usedAt: '2024-02-10T10:00:00Z'
	}
];

// === 審査待ちユーザー ===
export const pendingUsers = users.filter((u) => u.status === 'PENDING');

// === フォロー ===
export const follows: Follow[] = [
	{
		id: 'follow-1',
		followerId: 'user-1', // 田中 が
		followingId: 'user-2', // 鈴木 をフォロー
		createdAt: '2024-02-01T10:00:00Z'
	},
	{
		id: 'follow-2',
		followerId: 'user-1',
		followingId: 'user-3',
		createdAt: '2024-02-15T10:00:00Z'
	}
];

// 現在のユーザーがフォローしているユーザー
export const followingUsers = follows
	.filter((f) => f.followerId === currentUser.id)
	.map((f) => users.find((u) => u.id === f.followingId)!)
	.filter(Boolean);

// === ブックマーク ===
export const bookmarks: Bookmark[] = [
	{
		id: 'bm-1',
		userId: 'user-1',
		productId: 'prod-2',
		createdAt: '2024-03-01T10:00:00Z'
	},
	{
		id: 'bm-2',
		userId: 'user-1',
		productId: 'prod-3',
		createdAt: '2024-03-05T10:00:00Z'
	}
];

// 現在のユーザーのブックマーク商品
export const bookmarkedProducts = bookmarks
	.filter((b) => b.userId === currentUser.id)
	.map((b) => products.find((p) => p.id === b.productId)!)
	.filter(Boolean);

// === 閲覧履歴 ===
export const viewHistory: ViewHistory[] = [
	{
		id: 'vh-1',
		userId: 'user-1',
		productId: 'prod-2',
		viewedAt: '2024-03-15T10:00:00Z'
	},
	{
		id: 'vh-2',
		userId: 'user-1',
		productId: 'prod-3',
		viewedAt: '2024-03-14T15:00:00Z'
	},
	{
		id: 'vh-3',
		userId: 'user-1',
		productId: 'prod-1',
		viewedAt: '2024-03-13T09:00:00Z'
	}
];

// 現在のユーザーの閲覧履歴（最新順）
export const recentlyViewedProducts = viewHistory
	.filter((vh) => vh.userId === currentUser.id)
	.sort((a, b) => new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime())
	.map((vh) => products.find((p) => p.id === vh.productId)!)
	.filter(Boolean);

// === フィードアイテム ===
export const feedItems: FeedItem[] = [
	{
		id: 'feed-1',
		type: 'NEW_PRODUCT',
		user: users[1],
		product: products[1],
		createdAt: '2024-03-15T14:00:00Z'
	},
	{
		id: 'feed-2',
		type: 'PRODUCT_UPDATE',
		user: users[2],
		product: products[2],
		createdAt: '2024-03-14T11:00:00Z'
	},
	{
		id: 'feed-3',
		type: 'ROOM_UPDATE',
		user: users[1],
		createdAt: '2024-03-13T16:00:00Z'
	},
	{
		id: 'feed-4',
		type: 'NEW_PRODUCT',
		user: users[2],
		product: products[2],
		createdAt: '2024-03-10T10:00:00Z'
	}
];

// フォロー中ユーザーのフィード
export const followingFeed = feedItems.filter((item) =>
	followingUsers.some((u) => u.id === item.user.id)
);

// === UIモード（初期値） ===
export let currentUIMode: UIMode = 'PROVIDER';

// ===== 分析関連モックデータ =====

// 日付生成ヘルパー
function generateDates(days: number): string[] {
	const dates: string[] = [];
	const today = new Date();
	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);
		dates.push(date.toISOString().split('T')[0]);
	}
	return dates;
}

// 過去30日の日別統計
export const dailyStats: DailyStats[] = generateDates(30).map((date, i) => ({
	date,
	views: Math.floor(Math.random() * 50) + 20 + (i % 7 === 0 ? -10 : 0), // 週末は少なめ
	profileViews: Math.floor(Math.random() * 20) + 5,
	inquiries: Math.floor(Math.random() * 5),
	followers: Math.floor(Math.random() * 3)
}));

// 商品別分析（現在のユーザーの商品）
export const productAnalytics: ProductAnalytics[] = products
	.filter((p) => p.owner.id === currentUser.id)
	.map((product) => {
		const views = Math.floor(Math.random() * 500) + 100;
		const inquiries = Math.floor(Math.random() * 20) + 5;
		const conversions = Math.floor(inquiries * (Math.random() * 0.4 + 0.1));
		return {
			productId: product.id,
			product,
			views,
			bookmarks: Math.floor(views * (Math.random() * 0.1 + 0.05)),
			inquiries,
			conversions,
			conversionRate: Math.round((conversions / inquiries) * 100)
		};
	});

// 流入元分析
export const trafficAnalytics: TrafficAnalytics[] = [
	{ source: 'SEARCH', count: 450, percentage: 35 },
	{ source: 'PROFILE', count: 320, percentage: 25 },
	{ source: 'PRODUCT', count: 256, percentage: 20 },
	{ source: 'REFERRAL', count: 128, percentage: 10 },
	{ source: 'ROOM', count: 77, percentage: 6 },
	{ source: 'DIRECT', count: 51, percentage: 4 }
];

// タグ分析
export const tagAnalytics: TagAnalytics[] = [
	{ tag: 'SEO', views: 320, inquiries: 15 },
	{ tag: 'マーケティング', views: 280, inquiries: 12 },
	{ tag: 'コンサルティング', views: 210, inquiries: 8 },
	{ tag: '広告', views: 180, inquiries: 10 },
	{ tag: 'リスティング', views: 150, inquiries: 7 }
];

// 訪問者属性（専門領域）
export const visitorAnalytics: VisitorAnalytics[] = [
	{ specialty: 'Web開発', count: 120, percentage: 28 },
	{ specialty: 'マーケティング', count: 95, percentage: 22 },
	{ specialty: 'デザイン', count: 78, percentage: 18 },
	{ specialty: '経営・コンサル', count: 65, percentage: 15 },
	{ specialty: 'EC・小売', count: 45, percentage: 10 },
	{ specialty: 'その他', count: 30, percentage: 7 }
];

// 紹介リンク分析
export const referralAnalytics: ReferralAnalytics[] = [
	{
		refCode: 'tanaka-prod1',
		product: products[0],
		referrer: users[1],
		clicks: 85,
		inquiries: 12,
		conversions: 4,
		pointsEarned: 40000
	},
	{
		refCode: 'tanaka-prod4',
		product: products[3],
		referrer: users[2],
		clicks: 45,
		inquiries: 6,
		conversions: 2,
		pointsEarned: 15000
	}
];

// 分析サマリー（30日）
export const analyticsSummary: AnalyticsSummary = {
	period: '30d',
	totalViews: dailyStats.reduce((sum, d) => sum + d.views, 0),
	totalInquiries: dailyStats.reduce((sum, d) => sum + d.inquiries, 0),
	totalConversions: 12,
	conversionRate: 28,
	followerCount: 47,
	followerGrowth: dailyStats.reduce((sum, d) => sum + d.followers, 0),
	avgResponseTime: 45 // 分
};
