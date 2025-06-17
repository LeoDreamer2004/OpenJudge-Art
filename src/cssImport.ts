const url = window.location.href;

if (url == "http://openjudge.cn/") {
    import('./css/index.css').then(() => {
        console.log('openjudge index styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/$/.test(url)) {
    import('./css/group.css').then(() => {
        console.log('openjudge group styles loaded');
    });
} else if (/^http:\/\/.*\.openjudge\.cn\/practice\/.*/.test(url)) {
    import('./css/practice.css').then(() => {
        console.log('openjudge practice styles loaded');
    });
} else {
    console.log(url);
    import('./css/global.css').then(() => {
        console.log('openjudge common styles loaded');
    });
}