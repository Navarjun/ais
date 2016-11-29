var AIS = {};
AIS.data = {
  total: {
    Age: [{label: "30+", countStart: 0, countEnd: 67}, {label: "<30", countStart: 67, countEnd: 167}],
    Gender: [{label: "Male", countStart: 0, countEnd: 83}, {label: "Female", countStart: 83, countEnd: 167}]
  }
};

// init controller
AIS.controller = new ScrollMagic.Controller();
AIS.buttons = ["Gender", "Age"];
AIS.draw = function(dataCategory, info){

  var x = AIS.plot.selectAll(".people")
    .data(d3.range(0, 167, 1), function(d){return d;});
  var padding = (AIS.canvasHeight/13)*(0.6), radius = (AIS.canvasHeight/13)*(0.35);

  var enter = x.enter()
    .append("circle")
    .classed("people", true)
    .attr("id", function(d){return "people-"+d;})
    .style("opacity", 0)
    .attr("r", radius)
    .attr("cx", function(_, i){
      var pos = parseInt(i/13) * (radius+padding);
      d3.select(this).attr("abs-x", pos + AIS.canvasWidth/2 - (padding+radius)*5.5)
      return pos + AIS.canvasWidth/2 - (padding+radius)*5.7;
    })
    .attr("cy", function(_, i){
      d3.select(this).attr("abs-y", (i%13) * (radius+padding))
      return (i%13) * (radius+padding);
    })
    .transition()
    .delay(function(_, i){return i*10;})
    .duration(100)
    .style("opacity", 1);

  x = x.merge(enter);

  var data = AIS.data[dataCategory][info];
  if (data) {
    data.forEach(function(d,i){
      var positive = (i) >= data.length/2 ? (1) : (-1);
      AIS.plot.selectAll(".people")
        .data(d3.range(d.countStart, d.countEnd, 1), function(d){return d;})
        .transition().duration(500)
        .attr("cx", function(_, i){
            return (+d3.select(this).attr("abs-x")) + positive*100;
        });

      var label = AIS.svg.select("#label-"+i);
      if (!label.node()) {
        label = AIS.svg.append("text")
          .attr("class", d.label)
          .classed("label", true)
          .attr("id", "label-"+i)
          .style("opacity", 0)
      }
      var x = (+AIS.plot.select("#people-"+d.countStart).attr("abs-x")) + positive*100;
      label
        .attr("x", x)
        .attr("y", AIS.canvasHeight+3)
        .transition().duration(500)
        .style("opacity", 1)
        .text(d.label)
    })
  }
}

AIS.setup = function() {
  AIS.svg = d3.select(".canvas")
    .style("height", window.innerHeight/3)
    .style("width", window.innerWidth)
    .style("opacity", 0);
  AIS.plot = AIS.svg.append("g")
    .attr("transform", "translate(10, 10)");
  AIS.canvasHeight = window.innerHeight/3 - 20;
  AIS.canvasWidth = window.innerWidth - 20;

  AIS.buttonsDiv = d3.select(".button-div")
    .style("height", "30px")
    .style("bottom", window.innerHeight/2.8)
    .selectAll("button")
    .data(AIS.buttons)
    .enter()
    .append("button")
    .attr("id", function(d){return d;})
    .classed("btn", true)
    .classed("btn-default", true)
    .html(function(d){return d;})
    .style("opacity", 0)
    .on("click", function(d){
      d3.selectAll(".button-div button")
        .classed("btn-primary", false)
        .classed("btn-default", true);
      d3.select(this)
        .classed("btn-primary", true)
        .classed("btn-default", false);
      AIS.draw("total", d3.select(this).attr("id"));
    });

  var i = 1;
  while(true){
    var slideID = "#slide-"+i;
    var slide = d3.select(slideID);
    if (slide.node()) {
      var j = 1;
      while(true) {
        var divID = "#div-"+j;
        var div = slide.select(divID);
        if (div.node()) {
          if (!(i == 1 && j == 1)) {
            div.style("opacity", 0);
          } else {
            div.style("opacity", 1);
          }
          div.style("margin-top", j == 1 ? 0 :(window.innerHeight/2));

          if (d3.select(slideID+" "+"#div-"+(j+1)).node()) {
            new ScrollMagic.Scene({
              duration: window.innerHeight/2,
              offset:10,
              triggerElement: slideID+" "+divID
            }).triggerHook(0.4)
            .setTween(new TimelineMax()
          			.add([
          				TweenMax.to(slideID+" "+"#div-"+(j+1), 0.5, {opacity: 1}),
                  TweenMax.to(slideID+" "+divID, 0.5, {opacity: 0})
          			]))
              // .addIndicators({name: "slide-"+i+" : div-"+j})
              .addTo(AIS.controller);
          } else {
            new ScrollMagic.Scene({
              duration: window.innerHeight/2,
              offset:10,
              triggerElement: slideID+" "+divID
            }).triggerHook(0.2)
            .setTween(new TimelineMax()
          			.add([
          				TweenMax.to("#slide-"+(i+1)+" "+"#div-1", 0.5, {opacity: 1}),
                  TweenMax.to(slideID+" "+divID, 0.5, {opacity: 0})
          			]))
              // .addIndicators({name: "slide-"+(i+1)+" : div-1"})
              .addTo(AIS.controller)
              .on("start enter", function(event){
                if (i == 3 && j == 2) {
                  AIS.draw("total");
                  AIS.buttonsDiv
                    .transition().duration(500)
                    .style("opacity", event.type == "start" && event.scrollDirection == "REVERSE" ? 0 : 1);
                  AIS.svg
                    .transition().duration(500)
                    .style("opacity", event.type == "start" && event.scrollDirection == "REVERSE" ? 0 : 1);
                }
              });
          }
        } else break;
        j++;
      }
      slide.style("padding-top", (window.innerHeight/2))
        // .style("padding-bottom", (window.innerHeight/2));
    } else break;
    i++;
  }
  d3.select("body").style("height", window.innerHeight*i);
}

AIS.setup();
