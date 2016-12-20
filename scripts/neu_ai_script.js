var AIS = {};
AIS.data = {
  total: {
    Age: [{label: "30+", countStart: 0, countEnd: 67}, {label: "<30", countStart: 67, countEnd: 167}],
    Gender: [{label: "Male", countStart: 0, countEnd: 83}, {label: "Female", countStart: 83, countEnd: 167}]
  }
};
AIS.basicButtons = ["Big Picture", "Gender", "Age", "Work", "Income"]

// init controller
AIS.controller = new ScrollMagic.Controller({
		globalSceneOptions:{
			triggerHook:'onLeave'
		}
	});

AIS.setup = function() {
  AIS.scene1 = new ScrollMagic.Scene({
		duration:document.getElementById('scene-1').clientHeight, //controlled by height of the #scene-1 <section>, as specified in CSS
		triggerElement:'#scene-1',
		reverse:true //should the scene reverse, scrolling up?
	})
  .addIndicators()
	.on('enter',function(){
		//what happens when we 'enter' the scene i.e. #scene-1 reaches the top of the screen
		console.log('Enter Scene 1');
		// d3.select('#plot').transition().style('background','red');
    $("#scene-1-typed").typed({
      strings:["The <strong>ROBOTS</strong> are coming","for our <strong>JOBS</strong>","Or <strong>ARE THEY ?</strong>"],
      typeSpeed: 10,
      cursorChar: "",
      startDelay: 500,
      backDelay:400
    });
	})
	.addTo(AIS.controller);


  var svg2 = d3.select("#scene-2-svg");
  svg2.attr("width", svg2.node().parentNode.clientWidth)
    .attr("height", 280);

  AIS.scene2 = new ScrollMagic.Scene({
		duration:document.getElementById('scene-2').clientHeight, //controlled by height of the #scene-1 <section>, as specified in CSS
		triggerElement:'#scene-2',
		reverse:true //should the scene reverse, scrolling up?
	})
  .addIndicators()
	.on('enter',function(){
		//what happens when we 'enter' the scene i.e. #scene-1 reaches the top of the screen
		console.log('Enter Scene 2');
		// d3.select('#plot').transition().style('background','red');
    $("#scene-2-typed").typed({
      strings:["What do they make of robot revolution?"],
      typeSpeed: 10,
      cursorChar: "",
      startDelay: 500,
      backDelay:400,
      callback: function() {
        // paragraph DOM elements
        var ps = d3.select("#scene-2-button-div")
          .selectAll("button")
          .data(AIS.basicButtons)
          .enter()
          .append("button")
          .attr("class", function(d){ return d == "Big Picture" ? "btn scene-2-btn btn-primary" : "btn scene-2-btn btn-default"; })
          .attr("id", function(d){ return d.toLowerCase().replace(" ", "-"); })
          .attr("scene", 2)
          .text(function(d){ return d; })
          .style("opacity", 0);
          ps.on("click", function(d){
            d3.selectAll(".scene-2-btn")
              .classed("btn-primary", false).classed("btn-default", true);
            d3.select(this)
              .classed("btn-primary", true).classed("btn-default", false);
          });
          ps.transition().duration(500)
          .style("opacity", 1);

        var polygons = svg2.selectAll("polygon")
          .data(d3.range(0, 100, 1), function(d){ return d; })
          .enter()
          .append("polygon")
          .attr("points", AIS.genderMan)
          .attr("transform", function(d, i){
            var x = i%10 * 40 + (parseInt(i/10)%2 == 0 ? 0 : 20);
            var y = parseInt(i/10) * 20;

            return "translate("+x+","+y+"), scale(0.3)";
          })
          .style("opacity", 0)
          .transition().duration(500)
          .style("opacity", 1);;
      }
    });
	})
	.addTo(AIS.controller);

  var svg3left = d3.select("#scene-3-svg-left");
  svg3left.attr("width", svg2.node().parentNode.clientWidth)
    .attr("height", 280);
  var svg3right = d3.select("#scene-3-svg-right");
  svg3right.attr("width", svg2.node().parentNode.clientWidth)
    .attr("height", 280);
  AIS.scene3 = new ScrollMagic.Scene({
		duration:document.getElementById('scene-3').clientHeight, //controlled by height of the #scene-1 <section>, as specified in CSS
		triggerElement:'#scene-3',
		reverse:true //should the scene reverse, scrolling up?
	})
  .addIndicators()
	.on('enter',function(){
		//what happens when we 'enter' the scene i.e. #scene-1 reaches the top of the screen
		console.log('Enter Scene 3');
		// d3.select('#plot').transition().style('background','red');
    var ps = d3.select("#scene-3-button-div")
      .selectAll("button")
      .data(AIS.basicButtons)
      .enter()
      .append("button")
      .attr("class", function(d){ return d == "Big Picture" ? "btn scene-3-btn btn-primary" : "btn scene-3-btn btn-default"; })
      .attr("id", function(d){ return d.toLowerCase().replace(" ", "-"); })
      .attr("scene", 3)
      .text(function(d){ return d; })
      .style("opacity", 0);
      ps.on("click", function(d){
        d3.selectAll(".scene-3-btn")
          .classed("btn-primary", false).classed("btn-default", true);
        d3.select(this)
          .classed("btn-primary", true).classed("btn-default", false);
      });
      ps.transition().duration(500)
      .style("opacity", 1);

    $("#scene-3-typed-left").typed({
      strings:["<span class='highlight'>58%</span> <br/>expect AI and robotics to transform the US economy"],
      typeSpeed: 10,
      cursorChar: "",
      startDelay: 500,
      backDelay:400,
      callback: function() {
        var polygons = svg3left.selectAll("polygon")
          .data(d3.range(0, 100, 1), function(d){ return d; })
          .enter()
          .append("polygon")
          .attr("points", AIS.genderMan)
          .attr("transform", function(d, i){
            var x = i%10 * 40 + (parseInt(i/10)%2 == 0 ? 0 : 20);
            var y = parseInt(i/10) * 20;

            return "translate("+x+","+y+"), scale(0.3)";
          })
          .style("opacity", 0)
          .transition().duration(500)
          .style("opacity", function(d, i) {
            return i < 58 ? 1 : 0.2;
          });

          $("#scene-3-typed-right").typed({
            strings:["<strong>Although</strong> <span class='highlight'>48%</span>  <br/>worry that the US workforce will not adapt quickly enough"],
            typeSpeed: 10,
            cursorChar: "",
            startDelay: 500,
            backDelay:400,
            callback: function() {
              var polygons = svg3right.selectAll("polygon")
                .data(d3.range(0, 100, 1), function(d){ return d; })
                .enter()
                .append("polygon")
                .attr("points", AIS.genderMan)
                .attr("transform", function(d, i){
                  var x = i%10 * 40 + (parseInt(i/10)%2 == 0 ? 0 : 20);
                  var y = parseInt(i/10) * 20;

                  return "translate("+x+","+y+"), scale(0.3)";
                })
                .style("opacity", 0)
                .transition().duration(500)
                .style("opacity", function(d, i) {
                  return i < 48 ? 1 : 0.2;
                });
            }
          });
      }
    });
	})
	.addTo(AIS.controller);
}

AIS.genderMan = "15.2,26.2 7.5,26.2 3.8,26.2 3.8,30 3.8,33.6 3.8,37.4 3.8,41.1 3.8,44.9 3.8,48.7 3.8,52.4 3.8,56.1 3.8,59.7 3.8,63.5 3.8,67.2 3.8,71 3.8,74.8 7.5,74.8 7.5,78.4 7.5,82.2 7.5,85.9 7.5,89.5 7.5,93.3 7.5,97.1 7.5,100.7 3.8,100.7 0,100.7 0,104.5 3.8,104.5 7.5,104.5 11.3,104.5 11.3,100.7 11.3,97.1 11.3,93.3 11.3,89.5 11.3,85.9 11.3,82.2 11.3,78.4 11.3,74.8 14.9,74.8 18.7,74.8 18.7,78.4 18.7,82.2 18.7,85.9 18.7,89.5 18.7,93.3 18.7,97.1 18.7,100.7 18.7,104.5 22.5,104.5 26.2,104.5 30,104.5 30,100.7 26.2,100.7 22.5,100.7 22.5,97.1 22.5,93.3 22.5,89.5 22.5,85.9 22.5,82.2 22.5,78.4 22.5,74.8 26.2,74.8 26.2,71 26.2,67.2 26.2,63.5 26.2,59.7 26.2,56.1 26.2,52.4 26.2,48.7 26.2,44.9 26.2,41.1 26.2,37.4 26.2,33.6 26.2,30 26.2,26.2 22.5,26.2 15.2,26.2 15.2,22.6 22.5,22.6 22.5,18.8 22.5,15.1 22.5,11.3 22.5,7.7 22.5,3.9 22.5,0.1 18.7,0.1 14.9,0.1 11.3,0.1 7.5,0.1 7.5,3.9 7.5,7.7 7.5,11.3 7.5,15.1 7.5,18.8 7.5,22.6 15.2,22.6";


AIS.setup();
