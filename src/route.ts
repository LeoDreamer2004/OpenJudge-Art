const url = window.location.href;

if (url == "http://openjudge.cn/") {
    import('./css/index.css').then(() => {
        console.log('openjudge index styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/$/.test(url)) {
    import('./css/group.css').then(() => {
        console.log('openjudge group styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/$/.test(url)) {
    import('./css/match.css').then(() => {
        console.log('openjudge match styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/ranking\/$/.test(url)) {
    import('./css/ranking.css').then(() => {
        console.log('openjudge ranking styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/$/.test(url)) {
    import('./css/practice.css').then(() => {
        console.log('openjudge practice styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/submit\/$/.test(url)) {
    import('./css/submit.css').then(() => {
        console.log('openjudge submit styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/[^\/]+\/[^\/]+\/statistics\/$/.test(url)) {
    import('./css/statistics.css').then(() => {
        console.log('openjudge statistics styles loaded');
    });
} else if (/^http:\/\/openjudge\.cn\/user\/.*/.test(url)) {
    import('./css/user.css').then(() => {
        console.log('openjudge user styles loaded');
    });
} else {
    console.log(url);
    import('./css/global.css').then(() => {
        console.log('openjudge common styles loaded');
    });
}