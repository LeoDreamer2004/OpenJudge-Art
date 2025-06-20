import { ALL_ROUTE, routes } from './route.ts';
import './dom-tweaks.ts';
import './css-bindings.ts';

const url = window.location.href;
for (const route of routes) {
    if (route.matches(url)) {
        route.apply();
        break; // Only apply the first matching route
    }
}
ALL_ROUTE.apply(); // Apply global styles and tweaks

