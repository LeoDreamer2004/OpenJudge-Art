interface SettingControl<T> {
    event: 'input' | 'change';
    read(element: HTMLInputElement): T;
    write(element: HTMLInputElement, value: T): void;
}

class Setting<T extends string | boolean> {
    constructor(
        public readonly defaultValue: T,
        /** Apply a value to the page. */
        private readonly effect: (value: T) => void,
        /** Control behavior for the input element. */
        private readonly control: SettingControl<T>,
    ) { }

    read(raw: unknown): T {
        if (typeof raw !== typeof this.defaultValue) return this.defaultValue;
        return (typeof raw === 'string' ? raw.trim() : raw) as T;
    }

    apply(raw: unknown): void {
        this.effect(this.read(raw));
    }

    bind(element: HTMLInputElement, value: unknown, onChange: (value: T) => void, signal: AbortSignal) {
        const update = (raw: unknown) => this.control.write(element, this.read(raw));
        update(value);
        element.addEventListener(this.control.event, () => {
            onChange(this.read(this.control.read(element)));
        }, { signal });
        return update;
    }
}

// HTML owns presentation; its input names match these keys.
const fields = {
    bgImageUrl: new Setting<string>(
        '',
        value => {
            let wallpaper = document.body.querySelector<HTMLDivElement>('.wallpaper');
            if (!wallpaper) {
                wallpaper = document.createElement('div');
                wallpaper.className = 'wallpaper';
                document.body.prepend(wallpaper);
            }
            const url = value.replace(/[\\"\n\r\f]/g, character =>
                `\\${character.charCodeAt(0).toString(16)} `);
            wallpaper.style.backgroundImage = url ? `url("${url}")` : 'none';
        },
        {
            event: 'input',
            read: element => element.value,
            write: (element, value) => { element.value = value; },
        },
    ),
    sanGuoExtension: new Setting<boolean>(
        false,
        value => document.body.classList.toggle('enable-sanguo-extension', value),
        {
            event: 'change',
            read: element => element.checked,
            write: (element, value) => { element.checked = value; },
        },
    ),
};

// equals to { bgImageUrl: string; ... }
export type HomeDockSettings = {
    [K in keyof typeof fields]: (typeof fields)[K]['defaultValue'];
};

function normalizeSettings(raw: unknown): HomeDockSettings {
    const values = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
    return Object.fromEntries(Object.entries(fields).map(([key, field]) =>
        [key, field.read(values[key])],
    )) as HomeDockSettings;
}

export function defaultHomeDockSettings(): HomeDockSettings {
    return normalizeSettings({});
}

const STORAGE_KEY = 'openjudge-art:home-dock-settings';

export function readHomeDockSettings(): HomeDockSettings {
    try {
        return normalizeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'));
    } catch (error) {
        console.warn('Failed to read dock settings:', error);
        return defaultHomeDockSettings();
    }
}

// Form values and persisted JSON cross a runtime validation boundary here.
export function saveHomeDockSettings(raw: unknown): HomeDockSettings {
    const settings = normalizeSettings(raw);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.warn('Failed to save dock settings:', error);
    }
    applyHomeDockSettings(settings);
    return settings;
}

export function applyHomeDockSettings(settings = readHomeDockSettings()): void {
    for (const [key, field] of Object.entries(fields)) {
        field.apply(settings[key as keyof HomeDockSettings]);
    }
}

// Each field owns its control behavior; the binding only coordinates persistence.
export function bindHomeDockSettings(root: HTMLElement, signal: AbortSignal): () => void {
    let settings = readHomeDockSettings();
    const bindings = Object.entries(fields).map(([key, field]) => {
        const element = root.querySelector<HTMLInputElement>(`[name="${key}"]`);
        if (!element) throw new Error(`HomeDock: missing setting control: ${key}`);
        const update = field.bind(element, settings[key as keyof HomeDockSettings], value => {
            settings = saveHomeDockSettings({ ...settings, [key]: value });
        }, signal);
        return { key, update };
    });

    return () => {
        settings = saveHomeDockSettings(defaultHomeDockSettings());
        for (const { key, update } of bindings) {
            update(settings[key as keyof HomeDockSettings]);
        }
    };
}
