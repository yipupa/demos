const $btn = document.querySelector('#btn');

$btn.addEventListener('click', function (e) {
    let color = e.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
});

chrome.storage.sync.get('color', function (data) {
    $btn.style.backgroundColor = data.color;
    $btn.setAttribute('value', data.color);
});