export type DescriptionBlock =
	| { type: 'heading'; text: string }
	| { type: 'list'; items: string[] }
	| { type: 'paragraph'; lines: string[] };

export function parseDescription(md: string): DescriptionBlock[] {
	const blocks: DescriptionBlock[] = [];
	const lines = md.split('\n');
	let paragraph: string[] = [];
	let list: string[] = [];

	const flushParagraph = () => {
		if (paragraph.length > 0) {
			blocks.push({ type: 'paragraph', lines: paragraph });
			paragraph = [];
		}
	};

	const flushList = () => {
		if (list.length > 0) {
			blocks.push({ type: 'list', items: list });
			list = [];
		}
	};

	for (const line of lines) {
		const trimmed = line.trimEnd();
		if (trimmed === '') {
			flushParagraph();
			flushList();
			continue;
		}

		if (trimmed.startsWith('## ')) {
			flushParagraph();
			flushList();
			blocks.push({ type: 'heading', text: trimmed.slice(3) });
			continue;
		}

		if (trimmed.startsWith('- ')) {
			flushParagraph();
			list.push(trimmed.slice(2));
			continue;
		}

		flushList();
		paragraph.push(trimmed);
	}

	flushParagraph();
	flushList();

	return blocks;
}
