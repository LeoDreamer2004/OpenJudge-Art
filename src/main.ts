import { routes } from './routes';

async function initialize(): Promise<void> {
    try {
        const route = routes.find(route => route.matches(window.location.href));
        await route?.apply();
    } catch (error) {
        console.error('OpenJudge-Art initialization failed:', error);
    } finally {
        document.dispatchEvent(new Event('openjudge-art:ready'));
    }
}

void initialize();
