var size = 400;

var width = size,
    height = size,
    outerFullRadius = Math.min(width, height) / 2,
    radius = outerFullRadius * .9,
    innerRadius = 0.2 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
        return d.width;
    });

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([0, 0])
    .html(function (d) {
        return d.data.label + ": <span style='color:#" + lightOrange + "'>" + d.data.text + "</span>";
    });

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(function (d) {
        return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius;
    });

var outlineArc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

var data = [];
for (line of info) {
    let obj = {};
    for (var i = 0; i < header.length; i++) {
        obj[header[i]] = line[i];
    }
    data.push(obj);
}

data.forEach(function (d) {
    d.id = d.id;
    d.order = +d.order;
    d.color = d.color;
    d.hoverColor = d.hoverColor;
    d.weight = +d.weight;
    d.score = +d.score;
    d.width = +d.weight;
    d.label = d.label;
    d.text = d.text;
});


var path = svg.selectAll(".solidArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", function (d) {
        return d.data.color;
    })
    .attr("class", function (d) {
        return d.data.hoverColor;
    })
    .attr("stroke", fontDark)
    .attr("d", arc)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);


var outerPath = svg.selectAll(".outlineArc")
    .data(pie(data))
    .enter().append("path")
    .attr("fill", "none")
    .attr("stroke", fontDark)
    .attr("class", "outlineArc")
    .attr("d", outlineArc);


// calculate the weighted mean score
var score =
    data.reduce(function (a, b) {
        //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
        return a + (b.score * b.weight);
    }, 0) /
    data.reduce(function (a, b) {
        return a + b.weight;
    }, 0);

svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));