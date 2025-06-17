const url = window.location.href;

(function indexPageTweaks() {
    if (/^http:\/\/openjudge.cn/.test(url)) {
        const main = document.querySelector('#main');
        if (!main) {
            console.error('Main element not found');
            return;
        }
        const h2 = main.querySelector('h2');
        const running = main.querySelector('.contest-running');
        const wrapper = document.createElement('div');
        wrapper.className = 'contest-wrapper';

        // move h2 and running to wrapper
        if (h2) {
            wrapper.appendChild(h2);
        }
        if (running) {
            wrapper.appendChild(running);
        }

        // add wrapper to main
        main.insertBefore(wrapper, main.firstChild);
    }
})();
