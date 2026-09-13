import dockHtml from './home-dock.html?raw';
import { bindHomeDockSettings } from './home-dock-settings';

export class HomeDock {
    private readonly dock = document.createElement('div');
    private events?: AbortController;

    constructor(private readonly container: HTMLElement) { }

    mount(): void {
        if (this.container.querySelector('.dock')) return;
        this.dock.className = 'dock';
        this.dock.innerHTML = dockHtml;
        this.events = new AbortController();
        const { signal } = this.events;
        const resetSettings = bindHomeDockSettings(this.dock, signal);
        this.query('.dock-reset-btn').addEventListener('click', resetSettings, { signal });

        this.query('.settings').addEventListener('click', () => {
            this.dock.classList.toggle('open');
        }, { signal });
        this.query('.help').addEventListener('click', () => {
            window.location.href = 'http://openjudge.cn/help.html';
        }, { signal });
        this.query('.about').addEventListener('click', () => {
            window.location.href = 'http://openjudge.cn/about.html';
        }, { signal });
        document.addEventListener('click', event => {
            if (event.target instanceof Node && !this.dock.contains(event.target)) {
                this.dock.classList.remove('open');
            }
        }, { signal });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') this.dock.classList.remove('open');
        }, { signal });

        this.container.appendChild(this.dock);
    }

    destroy(): void {
        this.events?.abort();
        this.dock.remove();
    }

    private query<T extends HTMLElement>(selector: string): T {
        const element = this.dock.querySelector<T>(selector);
        if (!element) throw new Error(`HomeDock: element not found: ${selector}`);
        return element;
    }
}
