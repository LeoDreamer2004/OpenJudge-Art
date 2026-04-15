import dockHtml from "./home-dock.html?raw";

/**
 * =================
 * HomeDock 组件
 * =================
 */
class HomeDockStorage {
    constructor(
        private readonly storageKey: string,
        private readonly defaultSettings: HomeDockSettings,
    ) { }

    read(): HomeDockSettings {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) return { ...this.defaultSettings };
            return normalizeSettings(JSON.parse(raw));
        } catch (error) {
            console.warn('Failed to read dock settings:', error);
            return { ...this.defaultSettings };
        }
    }

    write(settings: HomeDockSettings): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(settings));
        } catch (error) {
            console.warn('Failed to save dock settings:', error);
        }
    }

    reset(): HomeDockSettings {
        const settings = { ...this.defaultSettings };
        this.write(settings);
        return settings;
    }
}

export interface HomeDockOptions {
    storageKey?: string;
    onHelpClick?: () => void;
    onAboutClick?: () => void;
}

export class HomeDock {
    private readonly storage: HomeDockStorage;
    private settings: HomeDockSettings;

    private dock!: HTMLDivElement;
    private settingsButton!: HTMLButtonElement;
    private helpButton!: HTMLButtonElement;
    private aboutButton!: HTMLButtonElement;
    private menuRoot!: HTMLDivElement;

    private menu!: HomeDockMenu;

    private readonly handleDocumentClick = (event: MouseEvent) => {
        const target = event.target as Node | null;
        if (target && this.dock && !this.dock.contains(target)) {
            this.closeMenu();
        }
    };

    private readonly handleDocumentKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.closeMenu();
        }
    };

    constructor(
        private readonly container: HTMLElement,
        private readonly options: HomeDockOptions = {},
    ) {
        this.storage = new HomeDockStorage(
            options.storageKey ?? 'openjudge-art:home-dock-settings',
            DEFAULT_SETTINGS,
        );
        this.settings = this.storage.read();
    }

    mount(): void {
        if (this.container.querySelector('.dock')) return;

        this.createDOM();
        this.cacheElements();
        this.createMenu();
        this.bindEvents();

        this.container.appendChild(this.dock);
    }

    destroy(): void {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('keydown', this.handleDocumentKeydown);
        this.dock?.remove();
    }

    private createDOM(): void {
        this.dock = document.createElement('div');
        this.dock.className = 'dock';
        this.dock.innerHTML = dockHtml;
    }

    private cacheElements(): void {
        this.settingsButton = this.mustQuery<HTMLButtonElement>('.dock-item.settings');
        this.helpButton = this.mustQuery<HTMLButtonElement>('.dock-item.help');
        this.aboutButton = this.mustQuery<HTMLButtonElement>('.dock-item.about');
        this.menuRoot = this.mustQuery<HTMLDivElement>('.dock-menu');
    }

    private createMenu(): void {
        this.menu = new HomeDockMenu(this.menuRoot,
            this.settings,
            (settings) => {
                this.settings = normalizeSettings(settings);
                this.storage.write(this.settings);
            },
            () => {
                this.settings = this.storage.reset();
                return this.settings;
            });
        this.menu.applySettings();
    }

    private bindEvents(): void {
        this.settingsButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleMenu();
        });

        this.helpButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this.options.onHelpClick) {
                this.options.onHelpClick();
            } else {
                window.location.href = 'http://openjudge.cn/help.html';
            }
        });

        this.aboutButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (this.options.onAboutClick) {
                this.options.onAboutClick();
            } else {
                window.location.href = 'http://openjudge.cn/about.html';
            }
        });

        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('keydown', this.handleDocumentKeydown);
    }


    private toggleMenu(): void {
        this.dock.classList.toggle('open');
    }

    private closeMenu(): void {
        this.dock.classList.remove('open');
    }

    private mustQuery<T extends HTMLElement>(selector: string): T {
        const element = this.dock.querySelector<T>(selector);
        if (!element) {
            throw new Error(`HomeDock: element not found: ${selector}`);
        }
        return element;
    }
}

/**
 * =================
 * Dock 菜单设置项
 * =================
 */
interface HomeDockSettings {
    sanGuoExtension: boolean;
    bgImageUrl: string;
}

const DEFAULT_SETTINGS: HomeDockSettings = {
    sanGuoExtension: false,
    bgImageUrl: '',
};


function normalizeSettings(raw?: Partial<HomeDockSettings>): HomeDockSettings {
    return {
        sanGuoExtension: Boolean(raw?.sanGuoExtension ?? DEFAULT_SETTINGS.sanGuoExtension),
        bgImageUrl: String(raw?.bgImageUrl ?? DEFAULT_SETTINGS.bgImageUrl),
    };
}

/**
 * ==================
 * Dock 菜单组件
 * ==================
 */
class HomeDockMenu {
    private readonly root: HTMLDivElement;
    private readonly onChange: (settings: HomeDockSettings) => void;
    private readonly onReset: () => HomeDockSettings;

    private bgImageUrlInput!: HTMLInputElement;
    private sanGuoInput!: HTMLInputElement;
    private resetButton!: HTMLButtonElement;

    constructor(
        root: HTMLDivElement,
        initialSettings: HomeDockSettings,
        onChange: (settings: HomeDockSettings) => void,
        onReset: () => HomeDockSettings,
    ) {
        this.root = root;
        this.onChange = onChange;
        this.onReset = onReset;

        this.cacheElements();
        this.bindEvents();
        this.setSettings(initialSettings);
    }

    private cacheElements(): void {
        this.sanGuoInput = this.mustQuery<HTMLInputElement>('input[name="sanGuoExtension"]');
        this.bgImageUrlInput = this.mustQuery<HTMLInputElement>('input[name="bgImageUrl"]');
        this.resetButton = this.mustQuery<HTMLButtonElement>('.dock-reset-btn');
    }

    private bindEvents(): void {
        this.root.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        this.sanGuoInput.addEventListener('change', () => {
            this.onChange(this.getSettings());
            this.applySettings();
        });

        this.resetButton.addEventListener('click', () => {
            const settings = this.onReset();
            this.setSettings(settings);
            this.applySettings();
        });
    }

    getSettings(): HomeDockSettings {
        return normalizeSettings({
            sanGuoExtension: this.sanGuoInput.checked,
            bgImageUrl: this.bgImageUrlInput.value,
        });
    }

    setSettings(settings: HomeDockSettings): void {
        const normalized = normalizeSettings(settings);
        this.sanGuoInput.checked = normalized.sanGuoExtension;
        this.bgImageUrlInput.value = normalized.bgImageUrl;
    }

    applySettings(): void {
        const settings = this.getSettings();
        document.body.classList.toggle('enable-sanguo-extension', settings.sanGuoExtension);
    }

    private mustQuery<T extends HTMLElement>(selector: string): T {
        const element = this.root.querySelector<T>(selector);
        if (!element) {
            throw new Error(`HomeDockMenu: element not found: ${selector}`);
        }
        return element;
    }
}
