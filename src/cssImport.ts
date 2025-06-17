const url = window.location.href;

if (/^http:\/\/openjudge.cn/.test(url)) {
    import('./css/index.css').then(() => {
        console.log(url);
        console.log('openjudge index styles loaded');
    });
}