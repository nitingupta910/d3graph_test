// $() is jQuery provided shortcut for $(document).ready()
$(function() {

var width = 950,
    height = 500;

var svg = d3.select("#graphdiv").append("svg")
    .attr("width", width)
    .attr("height", height);


d3.json("gtest.json", function(error, json) {
    var force = d3.layout.force()
        .size([width, height])
        .nodes(json.nodes)
        .links(json.links);

    force.gravity(0.1)
        .charge(-300);
    force.linkDistance(width/3.5);

    var link = svg.selectAll(".link")
        .data(json.links)
        .enter().append('line')
        .attr('class', 'link');

    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('cx', 50)
        .attr('cy', 50)
        .attr('r', width/100)
        .attr('name', function(d) { return d.name; });

    var animating = false;

    // duration of each animation step (in milliseconds).
    var animationStep = 100;

    force.on('tick', function() {
        console.log("tick called");
        node //.transition().ease('linear').duration(animationStep)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; })
            .call(force.drag);

        link //.transition().ease('linear').duration(animationStep)
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        if (animating) {
            force.stop();
            setTimeout(
                function() { force.start(); },
                animationStep
            );
        }
    });


    $(".node").click(function() {
        console.log("click called ", this.getAttribute("name"));
    });

    force.start();
});

}); // document onready