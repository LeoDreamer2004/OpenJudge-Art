// Vite serves only the CSS modules requested by the selected route in development.
// Production inlines these imports into the single userscript.
const loaders = import.meta.glob<string>('./css/**/*.css', {
    query: '?inline',
    import: 'default',
});

export class Route {
    constructor(
        private pattern: RegExp,
        public readonly styles: string[] = [],
        public readonly tweaks: (() => void)[] = [],
    ) { }

    public matches(url: string): boolean {
        return this.pattern.test(url);
    }

    public async apply(): Promise<void> {
        await Promise.all([this.applyStyles(), Route.domReady()]);
        for (const tweak of this.tweaks) tweak();
    }

    private static domReady(): Promise<void> {
        if (document.readyState !== 'loading') return Promise.resolve();
        return new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
        });
    }

    private static headReady(): Promise<HTMLHeadElement> {
        if (document.head) return Promise.resolve(document.head);
        return new Promise(resolve => {
            const observer = new MutationObserver(() => {
                if (!document.head) return;
                observer.disconnect();
                resolve(document.head);
            });
            observer.observe(document, { childList: true, subtree: true });
        });
    }

    private async applyStyles(): Promise<void> {
        const names = this.styles;
        if (!names.length) return;
        const [head, styles] = await Promise.all([
            Route.headReady(),
            Promise.all(names.map(async name => {
                const load = loaders[`./css/${name}`];
                if (!load) throw new Error(`Unknown stylesheet: ${name}`);
                return load();
            })),
        ]);

        // Network completion order must not change the CSS cascade.
        names.forEach((name, index) => {
            const id = `OpenJudge-Art:${name}`;
            const style = document.getElementById(id) ?? document.createElement('style');
            style.id = id;
            style.dataset.author = 'LeoDreamer';
            style.textContent = styles[index];
            head.appendChild(style);
        });
    }
}
