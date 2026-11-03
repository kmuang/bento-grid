const suggestions = ['Mon, 9:00 AM', 'Wed, 2:00 PM', 'Fri, 11:00 AM'];
const suggestedTime = document.querySelector('#suggested-time');
const nextSuggestion = document.querySelector('#next-suggestion');

if (suggestedTime && nextSuggestion) {
    let suggestionIndex = 0;

    nextSuggestion.addEventListener('click', () => {
        suggestionIndex = (suggestionIndex + 1) % suggestions.length;
        suggestedTime.textContent = suggestions[suggestionIndex];
    });
}

const postForm = document.querySelector('#post-form');
const saveDraft = document.querySelector('#save-draft');
const draftStatus = document.querySelector('#draft-status');

if (postForm && saveDraft && draftStatus) {
    const postDate = document.querySelector('#post-date');
    const platformInputs = [...postForm.querySelectorAll('input[name="platforms[]"]')];

    const showDraftError = () => {
        draftStatus.textContent = 'Could not create a draft file. Your draft has not been saved.';
        draftStatus.dataset.state = 'error';
    };

    saveDraft.addEventListener('click', () => {
        const draft = {
            content: postContent.value,
            scheduledAt: postDate?.value ?? '',
            platforms: platformInputs.filter((input) => input.checked).map((input) => input.value),
        };

        try {
            const file = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
            const downloadUrl = URL.createObjectURL(file);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `bento-grid-draft-${new Date().toISOString().replaceAll(':', '-')}.json`;
            document.body.append(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
            draftStatus.textContent = 'Draft download started. Check your browser downloads.';
            draftStatus.dataset.state = 'success';
        } catch {
            showDraftError();
        }
    });

    postForm.addEventListener('submit', () => {
        draftStatus.textContent = 'Sending your request through the configured form service...';
        draftStatus.dataset.state = 'success';
    });
}

const growthToggle = document.querySelector('#growth-toggle');
const growthDetail = document.querySelector('#growth-detail');

if (growthToggle && growthDetail) {
    growthToggle.addEventListener('click', () => {
        const isExpanded = growthToggle.getAttribute('aria-expanded') === 'true';
        growthToggle.setAttribute('aria-expanded', String(!isExpanded));
        growthDetail.hidden = isExpanded;
    });
}

const scheduleDots = [...document.querySelectorAll('.dot-row .dot')];
const scheduleCount = document.querySelector('#schedule-count');

if (scheduleCount && scheduleDots.length > 0) {
    const updateScheduleCount = () => {
        const scheduledCount = scheduleDots.filter((dot) => dot.getAttribute('aria-checked') === 'true').length;
        scheduleCount.textContent = `${scheduledCount} of ${scheduleDots.length} demo posts marked`;
    };

    scheduleDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const isScheduled = dot.getAttribute('aria-checked') === 'true';
            dot.setAttribute('aria-checked', String(!isScheduled));
            dot.classList.toggle('checked', !isScheduled);
            dot.classList.toggle('unchecked', isScheduled);
            updateScheduleCount();
        });
    });
}

const contentPrompt = document.querySelector('#content-prompt');
const usePrompt = document.querySelector('#use-prompt');

if (contentPrompt && usePrompt) {
    usePrompt.addEventListener('click', (event) => {
        const prompt = contentPrompt.value.trim();

        if (!prompt) {
            event.preventDefault();
            contentPrompt.focus();
            return;
        }

        const url = new URL(usePrompt.href);
        url.searchParams.set('content', prompt);
        usePrompt.href = url.href;
    });
}

const postContent = document.querySelector('#post-content');

if (postContent) {
    const prompt = new URLSearchParams(window.location.search).get('content');
    if (prompt) {
        postContent.value = prompt;
    }
}

const goalBars = [...document.querySelectorAll('.goal-bar')];
const goalDetail = document.querySelector('#goal-detail');

if (goalDetail) {
    goalBars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            goalBars.forEach((item) => item.classList.remove('is-selected'));
            bar.classList.add('is-selected');
            goalDetail.textContent = `Week ${index + 1}: ${bar.dataset.growth}% of sample goal.`;
        });
    });
}

const accountOptions = [...document.querySelectorAll('.account-option')];
const accountSummary = document.querySelector('#account-summary');

if (accountSummary) {
    const updateAccountSummary = () => {
        const selectedCount = accountOptions.filter((option) => option.getAttribute('aria-pressed') === 'true').length;
        accountSummary.textContent = `${selectedCount} demo account type${selectedCount === 1 ? '' : 's'} selected · not connected`;
    };

    accountOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const isSelected = option.getAttribute('aria-pressed') === 'true';
            option.setAttribute('aria-pressed', String(!isSelected));
            option.classList.toggle('is-selected', !isSelected);
            updateAccountSummary();
        });
    });
}
