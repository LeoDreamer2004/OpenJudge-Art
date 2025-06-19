import { routes } from './route.ts';
import './dom_tweaks.ts';
import './css_bindings.ts';

const url = window.location.href;
for (const route of routes) {
    if (route.matches(url)) {
        route.apply();
        break; // Only apply the first matching route
    }
}

