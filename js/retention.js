var cmRetention = {
    '2018': {
        'green': [],
        'neutral': [],
        'orange': [],
        'red': [],
        'inactive': 14
    },
    '2019': {
        'green': [],
        'neutral': [],
        'orange': [],
        'red': [],
        'inactive': 17
    }
}

cmData.sort(function (a, b) {
    if (a.name > b.name) {
        return 1;
    } else {
        return -1;
    }
});

for (var c = 0; c < cmData.length; c++) {
    cmData[c]['id'] = 'cm-' + c;
}

for (var c = 0; c < cmData.length; c++) {
    let obj = JSON.parse(JSON.stringify(cmData[c]));
    if (obj['corps year'] == 2018) {
        if (obj.retention == 'High') {
            cmRetention['2018']['red'].push(obj);
        } else if (obj.retention == 'Medium') {
            cmRetention['2018']['orange'].push(obj);
        } else if (obj.alum.indexOf('Highly') > -1 || obj.alum.indexOf('Will') > -1) {
            cmRetention['2018']['green'].push(obj);
        } else {
            cmRetention['2018']['neutral'].push(obj);
        }
    } else {
        if (obj.retention == 'High') {
            cmRetention['2019']['red'].push(obj);
        } else if (obj.retention == 'Medium') {
            cmRetention['2019']['orange'].push(obj);
        } else if (obj.alum.indexOf('Likely') > -1) {
            cmRetention['2019']['green'].push(obj);
        } else {
            cmRetention['2019']['neutral'].push(obj);
        }
    }
}

function makeSubSpan(arr, color) {
    let subSpan = '';
    for (var c = 0; c < arr.length; c++) {
        subSpan += `<span id="${arr[c].id}" style="color:${color};" class="clickable-cm-icon"><i class="fas fa-male fa-3x"></i></span>&emsp;`;
    }
    return subSpan;
}

function makeInactiveSubSpan(num) {
    let subSpan = '';
    for (var c = 0; c < num; c++) {
        subSpan += '<span style="text-shadow: 0px 1px 1px #71727A; color: white;"><i class="fas fa-male fa-3x"></i></span>&emsp;';
    }
    return subSpan;
}

function createCMSpan(obj) {
    let spanText = '';
    spanText += makeSubSpan(obj.green, green);
    spanText += makeSubSpan(obj.neutral, fontDark);
    spanText += makeSubSpan(obj.orange, lightOrange);
    spanText += makeSubSpan(obj.red, red);
    spanText += makeInactiveSubSpan(obj.inactive);
    return spanText;
}

document.getElementById('2cm-people').innerHTML = createCMSpan(cmRetention['2018']);
document.getElementById('1cm-people').innerHTML = createCMSpan(cmRetention['2019']);

