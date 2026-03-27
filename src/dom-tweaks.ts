import { ALL_ROUTE, INDEX_ROUTE, MATCH_ROUTE, PRACTICE_ROUTE, REGISTER_ROUTE, SOLUTION_RUOTE as SOLUTION_ROUTE } from "./route";
import sentences from './resource/sentences.txt';

// 随机替换主页标题
ALL_ROUTE.addTweak(() => {
    const subtitle = document.querySelector('#siteBody #siteHeader h1.logo a span');
    if (!subtitle) { return; }
    // choose a random sentence from sentences.txt
    fetch(sentences)
        .then(response => response.text())
        .then(text => {
            const sentencesArray = text.split('\n').filter(line => line.trim() !== '');
            const randomIndex = Math.floor(Math.random() * sentencesArray.length);
            subtitle.textContent = sentencesArray[randomIndex];
        })
        .catch(error => {
            console.error('Error fetching sentences:', error);
        });
})

// 添加壁纸
ALL_ROUTE.addTweak(() => {
    const body = document.querySelector('body');
    if (!body) {
        return;
    }
    const wallpaper = document.createElement('div');
    wallpaper.className = 'wallpaper';
    body.insertBefore(wallpaper, body.firstChild);
})

// 添加 Dock
// INDEX_ROUTE.addTweak(() => {
//     const dock = document.createElement('div');
//     dock.className = 'dock';
//     const body = document.querySelector('body');
//     if (!body) {
//         return;
//     }
//     body.appendChild(dock);

//     const settingsButton = document.createElement('button');
//     settingsButton.className = 'dock-item settings';
//     dock.appendChild(settingsButton);

//     const helpButton = document.createElement('button');
//     helpButton.className = 'dock-item help';
//     dock.appendChild(helpButton);

//     const aboutButton = document.createElement('button');
//     aboutButton.className = 'dock-item about';
//     dock.appendChild(aboutButton);
// })

// 替换页脚信息
INDEX_ROUTE.addTweak(() => {
    const ojInfo = document.querySelector('#footer ul.oj-info li');
    if (!ojInfo) {
        return;
    }
    ojInfo.innerHTML = `<a href="https://github.com/LeoDreamer2004/OpenJudge-Art">@OpenJudge-Art</a> by LeoDreamer`

    const languageSwitch = document.querySelector('#footer ul.debug-info li');
    if (languageSwitch) {
        languageSwitch.remove();
    }
})

// 替换主页申请小组信息
INDEX_ROUTE.addTweak(() => {
    const applyGroup = document.querySelector('#side .appli-group');
    if (applyGroup) {
        applyGroup.innerHTML = `<strong>欢迎来到 OpenJudge ... Art 版！</strong><a href="http://openjudge.cn/groups/new">创建小组</a>`
    }
})

// 将主页标题和比赛状态移动到一个新的 wrapper 中
INDEX_ROUTE.addTweak(() => {
    const main = document.querySelector('#main');
    if (!main) {
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
    main.insertBefore(wrapper, main.firstChild);
})

// 将练习页面的限制信息移动到要求部分的末尾
PRACTICE_ROUTE.addTweak(() => {
    const problemParams = document.querySelector('.problem-page .problem-params');
    const problemContent = document.querySelector('.problem-page .problem-content');

    if (problemContent && problemParams) {
        const dt = document.createElement('dt');
        dt.textContent = '要求';
        problemContent.appendChild(dt);
        const dd = document.createElement('dd');
        dd.appendChild(problemParams);
        problemContent.appendChild(dd);
    }
})

// 为代码块添加复制按钮
PRACTICE_ROUTE.addTweak(() => {
    const pres = document.querySelectorAll('.problem-content pre');

    pres.forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';

        copyButton.addEventListener('click', () => {
            let code = pre.textContent || '';
            code = code.replace(/\u00A0/g, ' '); // fix: non-breaking space to normal space

            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                // OpenJudge does not support navigator.clipboard API
                document.execCommand('copy');
                copyButton.textContent = '已复制';
            } catch (err) {
                console.error('Fallback: Could not copy text', err);
                copyButton.textContent = '复制失败';
            }
            document.body.removeChild(textArea);

            setTimeout(() => {
                copyButton.textContent = '复制';
            }, 2000);
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        // pre -> wrapper { pre , copyButton }
        if (pre.parentNode) {
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            wrapper.appendChild(copyButton);
        }
    });
});

// 移除练习页面描述中的所有 style 属性
PRACTICE_ROUTE.addTweak(() => {
    const description = document.querySelector('.problem-page .problem-content dd');
    // remove all style attributes from the description
    if (description) {
        description.removeAttribute('style');
        // remove all elements with style attributes
        const elements = description.querySelectorAll('* [style]');
        elements.forEach(span => {
            span.removeAttribute('style');
        });
    }
})

// 将提交状态的标题移动到提交状态的最前面
SOLUTION_ROUTE.addTweak(() => {
    const main = document.querySelector('.submitStatus');
    if (!main) {
        console.error('Main element not found');
        return;
    }
    const statusTitle = main.querySelector('.compile-status');
    if (!statusTitle) {
        console.error('Status title element not found');
        return;
    }
    const statusAnchor = statusTitle.querySelector('a');
    if (!statusAnchor) {
        console.error('Status element not found');
        return;
    }
    main.insertBefore(statusAnchor, main.firstChild);
    statusTitle.remove();
})

// 将评分按钮和相关题目移动到信息栏
SOLUTION_ROUTE.addTweak(() => {
    const infomation = document.querySelector('#side .compile-info');

    const ratingButton = document.querySelector('button#create-rating');
    const relatedProblems = document.querySelector('#pagebody .wrapper > div:last-child:not(#side)');

    if (infomation && ratingButton) {
        infomation.appendChild(ratingButton);
    }
    if (infomation && relatedProblems) {
        console.log('relatedProblems :>> ', relatedProblems);
        infomation.appendChild(relatedProblems);
    }
})

// 将比赛描述中的通知移动到描述的最前面
MATCH_ROUTE.addTweak(() => {
    const description = document.querySelector('#main .contest-description');
    const notification = document.querySelector('#side .notification');
    console.log('notification :>> ', description);
    if (description && notification) {
        description.insertBefore(notification, description.firstChild);
    }
})

// 重命名注册页面的标题，添加一个副标题
REGISTER_ROUTE.addTweak(() => {
    const title = document.querySelector('#main h2');
    if (title) {
        title.textContent = '欢迎来到 OpenJudge';
        const subtitle = document.createElement('p');
        subtitle.textContent = '一入算法深似海，从此节操是路人';
        subtitle.className = 'subtitle';
        title.insertAdjacentElement('afterend', subtitle);
    }
})