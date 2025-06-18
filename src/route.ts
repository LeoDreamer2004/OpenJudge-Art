import globalStyles from './css/global.css?inline';
import indexStyles from './css/index.css?inline';
import loginStyles from './css/login.css?inline';
import settingsStyles from './css/settings.css?inline';
import groupsStyles from './css/groups.css?inline';
import groupStyles from './css/group.css?inline';
import matchStyles from './css/match.css?inline';
import rankingStyles from './css/ranking.css?inline';
import practiceStyles from './css/practice.css?inline';
import submitStyles from './css/submit.css?inline';
import statisticsStyles from './css/statistics.css?inline';
import userStyles from './css/user.css?inline';

const url = window.location.href;

function injectCss(css: string) {
    var style = document.createElement('style');
    style.textContent = css;
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

if (url == "http://openjudge.cn/") {
    injectCss(indexStyles);
    console.log('openjudge index styles loaded');
} else if (url == "http://openjudge.cn/auth/login/") {
    injectCss(loginStyles);
    console.log('openjudge login styles loaded');
} else if (/^http:\/\/openjudge.cn\/settings.*$/.test(url)) {
    injectCss(settingsStyles);
    console.log('openjudge settings styles loaded');
} else if (/^http:\/\/openjudge.cn\/groups.*$/.test(url)) {
    injectCss(groupsStyles);
    console.log('openjudge groups styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/$/.test(url)) {
    injectCss(groupStyles);
    console.log('openjudge group styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/$/.test(url)) {
    injectCss(matchStyles);
    console.log('openjudge match styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/ranking\/$/.test(url)) {
    injectCss(rankingStyles);
    console.log('openjudge ranking styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/$/.test(url)) {
    injectCss(practiceStyles);
    console.log('openjudge practice styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/submit\/$/.test(url)) {
    injectCss(submitStyles);
    console.log('openjudge submit styles loaded');
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/statistics\/$/.test(url)) {
    injectCss(statisticsStyles);
    console.log('openjudge statistics styles loaded');
} else if (/^http:\/\/openjudge\.cn\/user\/.*/.test(url)) {
    injectCss(userStyles);
    console.log('openjudge user styles loaded');
} else {
    console.log(url);
    injectCss(globalStyles);
    console.log('openjudge global styles loaded');
}