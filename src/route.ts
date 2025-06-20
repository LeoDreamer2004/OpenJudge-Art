class Route {
    constructor(
        private pattern: RegExp,
        private css: string = '',
        private css_name: string = '',
        private tweaks: (() => void)[] = []
    ) {
    }

    public bindCss(css: string, css_name: string) {
        this.css = css;
        this.css_name = css_name;
    }

    public addTweak(tweak: () => void) {
        this.tweaks.push(tweak);
    }

    public matches(url: string): boolean {
        return this.pattern.test(url);
    }

    public apply(): void {
        for (const tweak of this.tweaks) {
            tweak();
        }

        if (this.css) {
            this.injectCss();
            console.log(`openjudge ${this.css_name} styles loaded`);
        }
    }

    private injectCss() {
        var style = document.createElement('style');
        style.textContent = this.css;
        style.dataset.author = 'LeoDreamer';
        style.id = 'OpenJudge-Art';

        if (document.head) {
            document.head.appendChild(style);
        } else {
            // Wait for the head to load
            document.addEventListener('DOMContentLoaded', () => {
                document.head.appendChild(style);
            });
        }
    }
}

const INDEX_ROUTE = new Route(/^http:\/\/openjudge.cn\/$/);
const LOGIN_ROUTE = new Route(/^http:\/\/.*openjudge.cn\/auth\/login\/$/);
const REGISTER_ROUTE = new Route(/^http:\/\/.*openjudge.cn\/register\/$/);
const SETTINGS_ROUTE = new Route(/^http:\/\/openjudge.cn\/settings.*$/);
const GROUPS_ROUTE = new Route(/^http:\/\/openjudge.cn\/groups.*$/);
const CONTESTS_RUNNING_ROUTE = new Route(/^http:\/\/openjudge.cn\/contests\/running$/);
const MESSAGES_ROUTE = new Route(/^http:\/\/openjudge.cn\/messages\//);
const GROUP_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/$/);
const MATCH_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/$/);
const RANKING_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/ranking\/$/);
const HINT_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/hint\//);
const PRACTICE_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/$/);
const SUBMIT_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/submit\/$/);
const SOLUTION_RUOTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/solution\//);
const STATISTICS_ROUTE = new Route(/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/statistics\//);
const USER_ROUTE = new Route(/^http:\/\/openjudge\.cn\/user\//);
const GLOBAL_ROUTE = new Route(/^http:\/\/.*openjudge\.cn\//);
const ALL_ROUTE = new Route(/^http:\/\/.*openjudge\.cn\//);

const routes: Route[] = [
    INDEX_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    SETTINGS_ROUTE,
    GROUPS_ROUTE,
    CONTESTS_RUNNING_ROUTE,
    MESSAGES_ROUTE,
    GROUP_ROUTE,
    MATCH_ROUTE,
    RANKING_ROUTE,
    HINT_ROUTE,
    PRACTICE_ROUTE,
    SUBMIT_ROUTE,
    SOLUTION_RUOTE,
    STATISTICS_ROUTE,
    USER_ROUTE,
    GLOBAL_ROUTE
]

// export the routes for use in other modules
export {
    Route,
    INDEX_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    SETTINGS_ROUTE,
    GROUPS_ROUTE,
    CONTESTS_RUNNING_ROUTE,
    MESSAGES_ROUTE,
    GROUP_ROUTE,
    MATCH_ROUTE,
    RANKING_ROUTE,
    HINT_ROUTE,
    PRACTICE_ROUTE,
    SUBMIT_ROUTE,
    SOLUTION_RUOTE,
    STATISTICS_ROUTE,
    USER_ROUTE,
    GLOBAL_ROUTE,
    ALL_ROUTE,
    routes,
};