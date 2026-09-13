import { Route } from './route';
import { applyHomeDockSettings } from './components/home-dock-settings';
import {
    randomizeSubtitle,
    mountHomeDock,
    replaceFooter,
    replaceGroupWelcome,
    wrapRunningContests,
    moveProblemLimits,
    addCopyButtons,
    clearDescriptionStyles,
    moveSubmissionStatus,
    moveEvaluationDetails,
    moveContestNotification,
    decorateRegisterTitle,
} from './dom-tweaks';

const common = [
    'global/icons.css',
    'global/arco-palette.css',
    'global/basic-dom.css',
    'global/animation.css',
    'components/problem-result.css',
    'common.css',
];
const siteHeader = ['components/site-header.css'];
const practiceHeader = [
    'components/header-top.css',
    'components/practice-header.css',
];
const practiceTitleHeader = [...practiceHeader, 'components/practice-title.css'];
const loginForm = ['components/login-form.css'];
const commonTweaks = [applyHomeDockSettings, randomizeSubtitle];

const INDEX = new Route(
    /^http:\/\/openjudge.cn\/$/,
    [
        ...common,
        ...siteHeader,
        'components/home-dock.css',
        'index.css',
    ],
    [mountHomeDock, replaceFooter, replaceGroupWelcome, wrapRunningContests, ...commonTweaks],
);
const LOGIN = new Route(
    /^http:\/\/.*openjudge.cn\/auth\/login\/$/,
    [
        ...common,
        ...siteHeader,
        ...practiceHeader,
        ...loginForm,
        'login.css',
    ],
    commonTweaks,
);
const REGISTER = new Route(
    /^http:\/\/.*openjudge.cn\/register\/$/,
    [
        ...common,
        ...siteHeader,
        ...practiceHeader,
        ...loginForm,
        'register.css',
    ],
    [decorateRegisterTitle, ...commonTweaks],
);
const HELP = new Route(
    /^http:\/\/.*openjudge.cn\/help.html$/,
    [
        ...common,
        ...siteHeader,
        ...practiceHeader,
        'help.css',
    ],
    commonTweaks,
);
const ABOUT = new Route(
    /^http:\/\/.*openjudge.cn\/about.html$/,
    [
        ...common,
        ...siteHeader,
        ...practiceHeader,
        'about.css',
    ],
    commonTweaks,
);
const SETTINGS = new Route(
    /^http:\/\/openjudge.cn\/settings.*$/,
    [
        ...common,
        ...siteHeader,
        'settings.css',
    ],
    commonTweaks,
);
const GROUPS = new Route(
    /^http:\/\/openjudge.cn\/groups.*$/,
    [
        ...common,
        ...siteHeader,
        'groups.css',
    ],
    commonTweaks,
);
const CONTESTS_RUNNING = new Route(
    /^http:\/\/openjudge.cn\/contests\/running$/,
    [
        ...common,
        ...siteHeader,
        'contests-running.css',
    ],
    commonTweaks,
);
const MESSAGES = new Route(
    /^http:\/\/openjudge.cn\/messages/,
    [
        ...common,
        ...siteHeader,
        'messages.css',
    ],
    commonTweaks,
);
const ADMIN = new Route(
    /^http:\/\/.*\.openjudge\.cn\/admin/,
    [
        ...common,
        ...practiceHeader,
        'admin.css',
    ],
    commonTweaks,
);
const GROUP = new Route(
    /^http:\/\/.*\.openjudge\.cn\/$/,
    [
        ...common,
        ...practiceHeader,
        'group.css',
    ],
    commonTweaks,
);
const MATCH = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/$/,
    [
        ...common,
        ...practiceTitleHeader,
        'match.css',
    ],
    [moveContestNotification, ...commonTweaks],
);
const RANKING = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/ranking\/$/,
    [
        ...common,
        ...practiceHeader,
        'ranking.css',
    ],
    commonTweaks,
);
const HINT = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/hint/,
    [
        ...common,
        ...practiceHeader,
        'hint.css',
    ],
    commonTweaks,
);
const SEARCH = new Route(
    /^http:\/\/.*\.openjudge\.cn\/search/,
    [
        ...common,
        ...practiceHeader,
        'search.css',
    ],
    commonTweaks,
);
const SUBMIT = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/submit/,
    [
        ...common,
        ...practiceTitleHeader,
        ...loginForm,
        'submit.css',
    ],
    commonTweaks,
);
const SOLUTION = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/solution/,
    [
        ...common,
        ...practiceTitleHeader,
        'components/problem-evaluate.css',
        'solution.css',
    ],
    [moveSubmissionStatus, moveEvaluationDetails, ...commonTweaks],
);
const STATISTICS = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/statistics/,
    [
        ...common,
        ...practiceTitleHeader,
        'statistics.css',
    ],
    commonTweaks,
);
const PRACTICE = new Route(
    /^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]/,
    [
        ...common,
        ...practiceTitleHeader,
        'components/problem-evaluate.css',
        'practice.css',
    ],
    [moveProblemLimits, addCopyButtons, clearDescriptionStyles, ...commonTweaks],
);
const USER = new Route(
    /^http:\/\/openjudge\.cn\/user/,
    [
        ...common,
        ...siteHeader,
        ...loginForm,
        'user.css',
    ],
    commonTweaks,
);
const GENERAL = new Route(
    /^http:\/\/.*openjudge\.cn/,
    [
        ...common,
        ...siteHeader,
        ...practiceTitleHeader,
    ],
    commonTweaks,
);

export const routes: Route[] = [
    INDEX,
    LOGIN,
    REGISTER,
    HELP,
    ABOUT,
    SETTINGS,
    GROUPS,
    CONTESTS_RUNNING,
    MESSAGES,
    ADMIN,
    GROUP,
    MATCH,
    RANKING,
    HINT,
    SEARCH,
    SUBMIT,
    SOLUTION,
    STATISTICS,
    PRACTICE,
    USER,
    GENERAL
];
