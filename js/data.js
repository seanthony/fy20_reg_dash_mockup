var header = ["id", "order", "score", "weight", "color", "hoverColor", "label", "text"];

var info = [
    ["DEV", 1, 100, 1, teal, "solidArc-green", "Raise Full Funding", "$6.0 Million of $5.7 Million Raised"],
    ["TM1", 2.1, 29, .33, neutralTan, "solidArc-red", "2CM Leadership Projects", "25 of 83 2CMs have a plan for leadership projects."],
    ["TM2", 2.2, 37, .33, neutralTan, "solidArc-red", "1CM Leadership Projects", "29 of 77 1CMs have/are executing their plan."],
    ["TM3", 2.3, 72, .34, neutralTan, "solidArc-orange", "Staff Community Engagement", "72 of 100 Stories of Success"],
    ["AL1", 3.1, 90, .33, purple, "solidArc-orange", "Engage 50% In-Region Alum", "218 of 453 alum on pace for engagement."],
    ["AL2", 3.2, 80, .33, purple, "solidArc-neutral", "Engage 60% of 3-5 Year Alum", "48 of 60 3-5 Year alums engaged."],
    ["AL3", 3.3, 24, .34, purple, "solidArc-red", "Retain 50% of Rising 2CM", "10% of 2CMs will stay in region."],
    ["CT1", 4.1, 50, .33, darkBlue, "solidArc-orange", "CALI", "39% Net CALI (Goal: 80% Net Str.)"],
    ["CT1", 4.2, 40, .33, darkBlue, "solidArc-red", "CSI", "20% Net CSI (Goal: 50% Net Str.)"],
    ["STF", 4.3, 89, .34, darkBlue, "solidArc-green", "Staff GPTW", "89% of staff say we are a Great Place to Work"],
    ["CM1", 5.1, 62, .2, blue, "solidArc-red", "2CMs earn 2 Years of Learning", "Expected 1.25 of 2 YOL"],
    ["CM2", 5.2, 83, .2, blue, "solidArc-neutral", "1CMs earn 1.5 Years of Learning", "Expected 1.25 of 1.5 YOL"],
    ["CM3", 5.3, 68, .2, blue, "solidArc-red", "All CMs earn at least 1 year.", "68% of CMs On Pace for 1+ Year"],
    ["CM4", 5.4, 45, .2, blue, "solidArc-red", "CMs average 4+ on Student Surveys", "45% of classrooms average 4+ on Student Surveys"],
    ["CM5", 5.5, 1, .2, blue, "solidArc-red", "Average 3+ on Principal Surveys", "No available data."]
];

var buttonInfo = [{
        "name": "OUTCOMES",
        'ptg': 52,
        'class': 'bar-red',
        "data": [
            ["CM1", 5.1, 62, .2, blue, "bar-red", "2CMs earn 2 Years of Learning", "Expected 1.25 of 2 YOL"],
            ["CM2", 5.2, 83, .2, blue, "bar-neutral", "1CMs earn 1.5 Years of Learning", "Expected 1.25 of 1.5 YOL"],
            ["CM3", 5.3, 68, .2, blue, "bar-red", "All CMs earn at least 1 year.", "68% of CMs On Pace for 1+ Year"],
            ["CM4", 5.4, 45, .2, blue, "bar-red", "CMs average 4+ on Student Surveys", "45% of classrooms average 4+ on Student Surveys"],
            ["CM5", 5.5, 1, .2, blue, "bar-red", "Average 3+ on Principal Surveys", "No available data."]
        ],
        "colorBg": 'bg-blue',
        "description": 'Students get an average of at least  1.5 years (1CM) and at least 2 years (2CM) of learning in a school year (every classroom at no less than 1 year of learning); 3 or higher on principal and 4+ student surveys'
    },
    {
        "name": "CULTURE",
        'ptg': 60,
        'class': 'bar-orange',
        "data": [
            ["CT1", 4.1, 50, .33, darkBlue, "bar-orange", "CALI", "39% Net CALI (Goal: 80% Net Str.)"],
            ["CT1", 4.2, 40, .33, darkBlue, "bar-red", "CSI", "20% Net CSI (Goal: 50% Net Str.)"],
            ["STF", 4.3, 89, .34, neutralTan, "bar-green", "Staff GPTW", "89% of staff say we are a Great Place to Work"]
        ],
        "colorBg": 'bg-darkBlue',
        "description": 'We see 80% CALI, 50% CSI; 90% of staff report TFA Greater Delta as a Great Place to Work'
    },
    {
        "name": "NETWORK",
        'ptg': 62,
        'class': 'bar-orange',
        "data": [
            ["AL1", 3.1, 90, .33, purple, "bar-green", "Engage 50% In-Region Alum", "218 of 453 alum on pace for engagement."],
            ["AL2", 3.2, 80, .33, purple, "bar-neutral", "Engage 60% of 3-5 Year Alum", "48 of 60 3-5 Year alums engaged."],
            ["AL3", 3.3, 24, .34, purple, "bar-red", "Retain 50% of Rising 2CM", "10% of 2CMs will stay in region."]
        ],
        "colorBg": 'bg-purple',
        "description": 'Engage 50% all current in-region alumni (60% of  3-5 year in-region alumni) and retain 50%+ of our second year corps members into Greater Delta alumnihood.'
    },
    {
        "name": "COMMUNITY",
        'ptg': 46,
        'class': 'bar-red',
        "data": [
            ["TM1", 2.1, 29, .33, lightBlue, "bar-red", "2CM Leadership Projects", "25 of 83 2CMs have a plan for leadership projects."],
            ["TM2", 2.2, 37, .33, lightBlue, "bar-red", "1CM Leadership Projects", "29 of 77 1CMs have/are executing their plan."],
            ["TM3", 2.3, 72, .34, lightBlue, "bar-orange", "Staff Community Engagement", "72 of 100 Stories of Success"]
        ],
        "colorBg": 'bg-neutralTan',
        "description": '100% of our staff and teachers are engaged with our students and communities through student leadership projects, leadership legacy projects, and a variety of leadership pathways.'
    },
    {
        "name": "FUNDING",
        'ptg': 100,
        'class': 'bar-green',
        "data": [
            ["DEV", 1, 100, 1, teal, "bar-green", "Raise Full Funding", "$6.0 Million of $5.7 Million Raised"]
        ],
        "colorBg": 'bg-teal',
        "description": 'Raise full funding through national, state, and local investors.'
    }
];

// var indicators = [
//     ["CM", 0.1, 100, 1, darkOrange, "Achieve in the Classroom", "Make significant progress in classrooms"],
//     ["AL", 0.2, 100, 1, darkOrange, "Engage and Retain Alumni", "Build a diverse coalition of alumni in region"],
//     ["TM", 0.3, 100, 1, darkBlue, "Community Engagement", "Corps members and staff are engaging in community leadership"],
//     ["DV", 0.4, 100, 1, green, "Fiscal Sustainability", "Raise Full Funding"],
//     ["SF", 0.5, 100, 1, green, "Healthy Staff Culture", "Make our regional team a GPTW"],
//     ["CT", 0.6, 100, 1, red, "Healthy Corps Culture", "Make breakthroughs on CSI and CALI"]
// ]