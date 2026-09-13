// Keep this function self-contained: Vite embeds it in the installed userscript,
// before the development loader starts fetching modules.
export function beginPageLoading(): void {
    const attribute = 'data-openjudge-art-loading';
    const style = document.createElement('style');
    // Keep the root visible so its background paints while content is hidden.
    // Match --gray-1 in css/global/arco-palette.css without waiting for modules.
    style.textContent = `
        html[${attribute}] {
            background: #f7f8fa !important;
            color-scheme: light;
        }
        html[${attribute}] > * { visibility: hidden !important; }
        @media (prefers-color-scheme: dark) {
            html[${attribute}] {
                background: #1d2129 !important;
                color-scheme: dark;
            }
        }
    `;

    const finish = () => {
        clearTimeout(timeout);
        observer.disconnect();
        document.documentElement?.removeAttribute(attribute);
        style.remove();
        document.removeEventListener('openjudge-art:ready', finish);
    };
    const attach = () => {
        const root = document.documentElement;
        if (!root) return;
        root.setAttribute(attribute, '');
        root.appendChild(style);
        observer.disconnect();
    };
    const observer = new MutationObserver(attach);
    // Fail open if module loading or initialization fails.
    const timeout = setTimeout(finish, 4000);
    document.addEventListener('openjudge-art:ready', finish, { once: true });
    observer.observe(document, { childList: true });
    attach();
}
