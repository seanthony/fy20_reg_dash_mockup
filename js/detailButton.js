function normalizeButtons() {
    let buttons = document.getElementsByClassName('results-button');
    let width = 0;
    for (let button of buttons) {
        width = Math.max(width, button.offsetWidth);
    }
    for (let button of buttons) {
        button.style.width = width + 'px';
    }
}
normalizeButtons();

function updateButtonBars() {
    let progBars = document.getElementsByClassName('button-bar');
    for (let i in progBars) {
        if (i < buttonInfo.length) {
            let progBar = progBars[i];
            let progBarValue = buttonInfo[i].ptg;
            progBar.style.width = progBarValue + '%';
            progBar.setAttribute('aria-valuenow', progBarValue);
            progBar.classList.add(buttonInfo[i].class);
        }
    }
}
updateButtonBars();

function updateProgressCard(index) {
    let obj = buttonInfo[index];
    let shortName = obj.name + ' | ' + obj.ptg + '% of Goal Met';
    let barHTML = `<div id="prog-bar-title" class="card-header ${obj.colorBg} custom-bg">${shortName}` +
        '</div><div class="card-body">';

    let barData = obj.data;
    for (var i = 0; i < barData.length; i++) {
        let row = barData[i].slice();

        let progBarValue = Math.floor(row[2]);
        let longTitle = row[6];
        let color = row[5];
        let goalDescription = row[7] + ` (${progBarValue}% of goal met)`;
        let html = `<span class="card-text font-weight-bold">${longTitle}</span>` +
            '<div class="progress">' +
            `<div id="prog-bar" class="progress-bar ${color}"` +
            `role="progressbar" style="width: ${progBarValue}%" aria-valuenow="${progBarValue}" aria-valuemin="0"` +
            'aria-valuemax="100"></div>' +
            '</div>' +
            `<p class="card-text">${goalDescription}</p>`;
        barHTML += html;
    }

    barHTML += `<p class="font-italic mt-2">${obj.description}</p></div>`;
    document.getElementById('prog-bar-card').innerHTML = barHTML;

    let buttons = document.getElementsByClassName('results-button');
    for (let button of buttons) {
        button.classList.remove('active');
    }

    let button = buttons[index];
    button.classList.add('active');
}

updateProgressCard(Math.floor(Math.random() * buttonInfo.length));

function addButtonEventListeners() {
    let buttons = document.getElementsByClassName('results-button');
    for (let i in buttons) {
        let button = buttons[i];
        button.onclick = function () {
            updateProgressCard(i);
        }
    }
}
addButtonEventListeners()