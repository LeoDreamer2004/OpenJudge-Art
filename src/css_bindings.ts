import globalStyles from './css/global.css?inline';
import indexStyles from './css/index.css?inline';
import loginStyles from './css/login.css?inline';
import settingsStyles from './css/settings.css?inline';
import groupsStyles from './css/groups.css?inline';
import messagesStyles from './css/messages.css?inline';
import groupStyles from './css/group.css?inline';
import matchStyles from './css/match.css?inline';
import rankingStyles from './css/ranking.css?inline';
import practiceStyles from './css/practice.css?inline';
import submitStyles from './css/submit.css?inline';
import statisticsStyles from './css/statistics.css?inline';
import userStyles from './css/user.css?inline';
import { GROUP_ROUTE, GROUPS_ROUTE, MESSAGES_ROUTE, INDEX_ROUTE, LOGIN_ROUTE, MATCH_ROUTE, PRACTICE_ROUTE, RANKING_ROUTE, SETTINGS_ROUTE, STATISTICS_ROUTE, SUBMIT_ROUTE, USER_ROUTE, GLOBAL_ROUTE, } from './route';

INDEX_ROUTE.bindCss(indexStyles, 'index');
LOGIN_ROUTE.bindCss(loginStyles, 'login');
SETTINGS_ROUTE.bindCss(settingsStyles, 'settings');
GROUPS_ROUTE.bindCss(groupsStyles, 'groups');
MESSAGES_ROUTE.bindCss(messagesStyles, 'messages');
GROUP_ROUTE.bindCss(groupStyles, 'group');
MATCH_ROUTE.bindCss(matchStyles, 'match');
RANKING_ROUTE.bindCss(rankingStyles, 'ranking');
PRACTICE_ROUTE.bindCss(practiceStyles, 'practice');
SUBMIT_ROUTE.bindCss(submitStyles, 'submit');
STATISTICS_ROUTE.bindCss(statisticsStyles, 'statistics');
USER_ROUTE.bindCss(userStyles, 'user');
GLOBAL_ROUTE.bindCss(globalStyles, 'global');


