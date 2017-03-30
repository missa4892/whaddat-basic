var plotWidth;
var plotHeight;

function generatePlot() {

	resizePlotSize();

	var data = [[0, 5],[1, 8],[2, 18],[3, 8],[4, 15],[5, 13]];
	var dataset = [{ data: data, color: "#5482FF" }];
	var ticks = [[0, "Science"], [1, "History"], [2, "Art"], [3, "Music"],[4, "Maths"], [5, "Languages"]];

	var options = {
		series: {
			bars: {
				show: true
			}
		},
		bars: {
			align: "center",
			barWidth: 0.5
		},
		xaxis: {
			//axisLabel: "World Cities",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 16,
			axisLabelFontFamily: 'Verdana, Arial',
			axisLabelPadding: 10,
			ticks: ticks
		},
		yaxis: {
			//axisLabel: "Average Temperature",
			axisLabelUseCanvas: true,
			axisLabelFontSizePixels: 16,
			axisLabelFontFamily: 'Verdana, Arial',
			axisLabelPadding: 3,
			tickFormatter: function (v, axis) {
				return v;
			}
		},
		legend: {
			noColumns: 0,
			labelBoxBorderColor: "#000000",
			position: "nw"
		},
		grid: {
			hoverable: true,
			borderWidth: 2,
			backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
		}
	};

	$.plot($("#placeholder"), dataset, options);
	$("<div class='axisLabel xaxisLabel'></div>").text("Subject Matter").appendTo($('#placeholder'));
	$('#placeholder').append($('<div/>').addClass('axisLabel yaxisLabel').html('Count').attr('style', 'width:' + plotHeight + 'px;top:' + plotHeight + 'px;'));
	//$("<div class='axisLabel yaxisLabel'></div>").text("Count").appendTo($('#placeholder'));
}

function resizePlotSize() {
	console.log('screen.width=' + screen.width);
	console.log('screen.height=' + screen.height);

	plotWidth = Math.round(screen.width*0.8);
	plotHeight = Math.round(plotWidth*0.6);

	console.log('style=width:' + plotWidth + 'px;height:' + plotHeight + 'px;');
	$("#placeholder").attr('style', 'width:' + plotWidth + 'px;height:' + plotHeight + 'px;');
}
