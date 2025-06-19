import { INDEX_ROUTE, PRACTICE_ROUTE, SOLUTION_RUOTE } from "./route";

function moveTitleToWrapper() {
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
    main.insertBefore(wrapper, main.firstChild);
}
INDEX_ROUTE.addTweak(moveTitleToWrapper);

function moveLimitsToPracticeEnd() {
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
};
PRACTICE_ROUTE.addTweak(moveLimitsToPracticeEnd);

function addCopyButtonOnSampleCode() {
    const pres = document.querySelectorAll('.problem-content pre');

    pres.forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';

        copyButton.addEventListener('click', () => {
            let code = pre.textContent || '';

            // Remove trailing "复制" if exists
            const lastIndex = code.lastIndexOf('复制');
            if (lastIndex !== -1) {
                code = code.substring(0, lastIndex).trim();
            }

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

        pre.appendChild(copyButton);
    });
}
PRACTICE_ROUTE.addTweak(addCopyButtonOnSampleCode);

function removeStyleOfPracticeDescription() {
    const description = document.querySelector('.problem-page .problem-content dd p');
    console.log('description :>> ', description);
    // remove all style attributes from the description
    if (description) {
        description.removeAttribute('style');
        // remove all <span> elements with style attributes
        const spans = description.querySelectorAll('span[style]');
        spans.forEach(span => {
            span.removeAttribute('style');
        });
    }
}
PRACTICE_ROUTE.addTweak(removeStyleOfPracticeDescription);

function practiceSubmitStatusTitleTweak() {
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
}
SOLUTION_RUOTE.addTweak(practiceSubmitStatusTitleTweak);

function moveRelatedProblemsToInfomation() {
    const infomation = document.querySelector('#side .compile-info');

    const ratingButton = document.querySelector('button#create-rating');
    const relatedProblems = document.querySelector('#pagebody .wrapper > div:last-child');

    if (infomation && ratingButton) {
        infomation.appendChild(ratingButton);
    }
    if (infomation && relatedProblems) {
        infomation.appendChild(relatedProblems);
    }
}
SOLUTION_RUOTE.addTweak(moveRelatedProblemsToInfomation);
