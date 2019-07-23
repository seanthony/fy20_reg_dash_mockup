var cmRetention = {
    '2cm': {
        'none': 68,
        'low': 13,
        'med': 2,
        'high': 3,
        'inactive': 14
    },
    '1cm': {
        'none': 32,
        'low': 24,
        'med': 15,
        'high': 9,
        'inactive': 17
    }
}

function makeSubSpan(num, color) {
    let subSpan = '';
    for (var c = 0; c < num; c++) {
        subSpan += '<span style="color: ' + color + ';"><i class="fas fa-male fa-3x"></i></span>&emsp;';
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
    spanText += makeSubSpan(obj.none, green);
    spanText += makeSubSpan(obj.low, fontDark);
    spanText += makeSubSpan(obj.med, lightOrange);
    spanText += makeSubSpan(obj.high, red);
    spanText += makeInactiveSubSpan(obj.inactive);
    return spanText;
}

document.getElementById('2cm-people').innerHTML = createCMSpan(cmRetention['2cm']);
document.getElementById('1cm-people').innerHTML = createCMSpan(cmRetention['1cm']);