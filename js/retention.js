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
    if (obj['year'] == 2018) {
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

function updateRetentionValues(obj) {
    for (let key in obj) {
        let total = 0;
        let active = 0;
        let subObj = obj[key];
        for (let subKey in subObj) {
            if (subKey == 'inactive') {
                total += subObj[subKey];
            } else {
                total += subObj[subKey].length;
                active += subObj[subKey].length;
            }
        }
        document.getElementById(`${key}-active`).innerText = active;
        document.getElementById(`${key}-cms`).innerText = total;
        for (let subKey in subObj) {
            let num = 0;
            if (subKey == 'inactive') {
                num = subObj[subKey];
            } else {
                num = subObj[subKey].length;
            }
            let perc = Math.round((num / total) * 100) + '%';
            let text = `${num} | ${perc}`
            let id = key + '-' + subKey;
            document.getElementById(id).innerText = text;
        }

    }
}
updateRetentionValues(cmRetention);

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

function cmInfo(index) {
    let cm = cmData[index];
    document.getElementById('cm-name').innerText = cm.name;
    document.getElementById('cm-year').innerText = cm.year;
    document.getElementById('cm-coach').innerText = cm.coach;
    document.getElementById('cm-specialist').innerText = cm.specialist;
    document.getElementById('cm-years').innerText = cm.years;
    document.getElementById('cm-risk').innerText = cm.retention;
    document.getElementById('cm-alum').innerText = cm.alum;

    var cms = document.getElementsByClassName('clickable-cm-icon');
    for (let cm of cms) {
        cm.classList.remove('active');
    }

    let id = `cm-${index}`;
    document.getElementById(id).classList.add('active');
}
cmInfo(Math.floor(Math.random() * cmData.length));

function addCMEventListeners() {
    var cms = document.getElementsByClassName('clickable-cm-icon');
    for (let cm of cms) {
        if (cm['id']) {
            let id = cm.id;
            let index = Number(id.split('-')[1]);
            cm.onclick = function () {
                cmInfo(index);
            }
        }
    }
}
addCMEventListeners();