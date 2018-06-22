var formatTime = function(unixTimestamp) {
    var dt = new Date(unixTimestamp);

    var year = dt.getFullYear();
    var month = dt.getMonth();
    var day = dt.getDate() + 1;
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();

    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;

    return month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
}     

function createStockChart(tragetDivId) {
	var chart = new AmCharts.AmStockChart();


	// DATASET //////////////////////////////////////////
	var dataSet = new AmCharts.DataSet();
	dataSet.fieldMappings = [{
		fromField: "open",
		toField: "open"
	}, {
		fromField: "close",
		toField: "close"
	}, {
		fromField: "high",
		toField: "high"
	}, {
		fromField: "low",
		toField: "low"
	}, {
		fromField: "volume",
		toField: "volume"
	}, {
		fromField: "value",
		toField: "value"
	}];
	dataSet.color = "#7f8da9";
	dataSet.dataProvider = [];
	dataSet.title = "West Stock";
	dataSet.categoryField = "date";

	var dataSet2 = new AmCharts.DataSet();
	dataSet2.fieldMappings = [{
		fromField: "value",
		toField: "value"
	}];
	dataSet2.color = "#fac314";
	dataSet2.dataProvider = [];
	dataSet2.compared = true;
	dataSet2.title = "East Stock";
	dataSet2.categoryField = "date";

	chart.dataSets = [dataSet];

	// PANELS ///////////////////////////////////////////
	var stockPanel = new AmCharts.StockPanel();
	stockPanel.title = "Value";
	stockPanel.showCategoryAxis = false;
	stockPanel.percentHeight = 70;

	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.dashLength = 5;
	stockPanel.addValueAxis(valueAxis);

	stockPanel.categoryAxis.dashLength = 5;

	// graph of first stock panel
	var graph = new AmCharts.StockGraph();
	graph.type = "candlestick";
	graph.openField = "open";
	graph.closeField = "close";
	graph.highField = "high";
	graph.lowField = "low";
	graph.valueField = "close";
	graph.lineColor = "#7f8da9";
	graph.fillColors = "#7f8da9";
	graph.negativeLineColor = "#db4c3c";
	graph.negativeFillColors = "#db4c3c";
	graph.proCandlesticks = true;
	graph.fillAlphas = 1;
	graph.useDataSetColors = false;
	graph.comparable = true;
	graph.compareField = "value";
	graph.showBalloon = false;
	stockPanel.addStockGraph(graph);

	var stockLegend = new AmCharts.StockLegend();
	stockLegend.valueTextRegular = undefined;
	stockLegend.periodValueTextComparing = "[[percents.value.close]]%";
	stockPanel.stockLegend = stockLegend;

	var chartCursor = new AmCharts.ChartCursor();
	chartCursor.valueLineEnabled = true;
	chartCursor.valueLineAxis = valueAxis;
	stockPanel.chartCursor = chartCursor;

	var stockPanel2 = new AmCharts.StockPanel();
	stockPanel2.title = "Volume";
	stockPanel2.percentHeight = 30;
	stockPanel2.marginTop = 1;
	stockPanel2.showCategoryAxis = true;

	var valueAxis2 = new AmCharts.ValueAxis();
	valueAxis2.dashLength = 5;
	stockPanel2.addValueAxis(valueAxis2);

	stockPanel2.categoryAxis.dashLength = 5;

	var graph2 = new AmCharts.StockGraph();
	graph2.valueField = "volume";
	graph2.type = "column";
	graph2.showBalloon = false;
	graph2.fillAlphas = 1;
	stockPanel2.addStockGraph(graph2);

	var legend2 = new AmCharts.StockLegend();
	legend2.markerType = "none";
	legend2.markerSize = 0;
	legend2.labelText = "";
	legend2.periodValueTextRegular = "[[value.close]]";
	stockPanel2.stockLegend = legend2;

	var chartCursor2 = new AmCharts.ChartCursor();
	chartCursor2.valueLineEnabled = true;
	chartCursor2.valueLineAxis = valueAxis2;
	stockPanel2.chartCursor = chartCursor2;

	chart.panels = [stockPanel, stockPanel2];


	// OTHER SETTINGS ////////////////////////////////////
	var sbsettings = new AmCharts.ChartScrollbarSettings();
	sbsettings.graph = graph;
	sbsettings.graphType = "line";
	sbsettings.usePeriod = "WW";
	sbsettings.updateOnReleaseOnly = false;
	chart.chartScrollbarSettings = sbsettings;


	// PERIOD SELECTOR ///////////////////////////////////
	var periodSelector = new AmCharts.PeriodSelector();
	periodSelector.position = "bottom";
	periodSelector.periods = [{
		period: "DD",
		count: 10,
		label: "10 days"
	}, {
		period: "MM",
		selected: true,
		count: 1,
		label: "1 month"
	}, {
		period: "YYYY",
		count: 1,
		label: "1 year"
	}, {
		period: "YTD",
		label: "YTD"
	}, {
		period: "MAX",
		label: "MAX"
	}];
	chart.periodSelector = periodSelector;

	chart.write(tragetDivId);
	
	return {chart:chart, dataSet:dataSet};
}

var histo, detail, compare1, compare2;




jQuery(document).ready(function() {
	var today = new Date();
	$('#history_to').datepicker( "setDate", today);
	$('#history_from').datepicker("setDate", new Date(today.setMonth(today.getMonth() - 3)));
	
	var oTable = $('#strategy_result').DataTable({
		processing : true,
		serverSide : true,
		lengthChange : false,
		searching : false,
		ordering: true,
		ajax : {
			url : strategy_list_url,
			data : function(data) {
				var filter = {
					rows_per_page : data.length,
		            page_index : data.start / data.length + 1,
		            order: data.columns[data.order[0].column].data,
		            dir:data.order[0].dir,
		            strategy: $('#analytics_strategy').val(),
		            exchange: $('#history_exchange').val(),
					symbol: $('#history_trading_pair').val(),
					threshold: $('#analytics_threshold').val(),
					granularityInMs: $('#history_granularity').val(),
					start_date: $('#history_from').val(),
					end_date: $('#history_to').val()
				}
				return filter;
			},
			dataSrc : function(json) {
	          json.recordsTotal = json.totalElements;
	          json.recordsFiltered = json.totalElements;
	          return json.content;
	        },
		},
        pageLength: 5,
        select: true,
        columns : [ {
            data : 'startMs',
            render: function(data, display, record) {
            	return formatTime(data);
            },
            title : 'Time',
            defaultContent : ''
        }, {
            data : 'percent',
            title : '%',
            defaultContent : ''
        }, {
            data : 'volume',
            title : 'Trading Volume',
            defaultContent : ''
        }, {
            data : 'high',
            title : 'High Price',
            defaultContent : ''
        }, {
            data : 'low',
            title : 'Low Price',
            defaultContent : ''
        }]
    }).on('select', function ( e, dt, type, cell, originalEvent ) {
      refresh_detail_chart();
    });
	
	AmCharts.ready(function () {
		histo = createStockChart('history_chart');
		detail = createStockChart('detail_chart');
		compare1 = createStockChart('compare_chart_1');
		compare2 = createStockChart('compare_chart_2');
		
		refresh_history_chart();
	});
	
	function refresh_history_chart() {

        $.ajax({
          type: "POST",
          url: url,
          data:  {
    		  exchange: $('#history_exchange').val(),
    		  symbol: $('#history_trading_pair').val(),
    		  granularityInMs: $('#history_granularity').val(),
    		  start_date: $('#history_from').val(),
    		  end_date: $('#history_to').val()
          },
          success: function(data, res){
        	  $.each(data, function(key, item){
        		  var date = new Date(item.id.date);
        		  delete item.id;
        		  item.date = date;
        	  })
        	  
        	  histo.dataSet.dataProvider = data;
        	  histo.chart.validateData();
    

          },
        });

    }
    
    function refresh_detail_chart() {

        $.ajax({
          type: "POST",
          url: url,
          data:  {
              exchange: $('#history_exchange').val(),
              symbol: $('#history_trading_pair').val(),
              granularityInMs: $('#history_granularity').val(),
              start_date: $('#history_from').val(),
              end_date: $('#history_to').val()
          },
          success: function(data, res){
              $.each(data, function(key, item){
                  var date = new Date(item.id.date);
                  delete item.id;
                  item.date = date;
              })
              
              detail.dataSet.dataProvider = data;
              detail.chart.validateData();
    

          },
        });

    }
    
    function refresh_compare1_chart() {

        $.ajax({
          type: "POST",
          url: url,
          data:  {
              exchange: $('#history_exchange').val(),
              symbol: $('#history_trading_pair').val(),
              granularityInMs: $('#history_granularity').val(),
              start_date: $('#history_from').val(),
              end_date: $('#history_to').val()
          },
          success: function(data, res){
              $.each(data, function(key, item){
                  var date = new Date(item.id.date);
                  delete item.id;
                  item.date = date;
              })
              
              compare1.dataSet.dataProvider = data;
              compare1.chart.validateData();
    

          },
        });

    }
    
    function refresh_compare2_chart() {

        $.ajax({
          type: "POST",
          url: url,
          data:  {
              exchange: $('#history_exchange').val(),
              symbol: $('#history_trading_pair').val(),
              granularityInMs: $('#history_granularity').val(),
              start_date: $('#history_from').val(),
              end_date: $('#history_to').val()
          },
          success: function(data, res){
              $.each(data, function(key, item){
                  var date = new Date(item.id.date);
                  delete item.id;
                  item.date = date;
              })
              
              compare2.dataSet.dataProvider = data;
              compare2.chart.validateData();
    

          },
        });

    }
    
    function run_strategy() {
        $.ajax({
          type: "POST",
          url: url,
          data:  {
              exchange: $('#history_exchange').val(),
              symbol: $('#history_trading_pair').val(),
              granularityInMs: $('#history_granularity').val(),
              start_date: $('#history_from').val(),
              end_date: $('#history_to').val()
          },
          success: function(data, res){
              $.each(data, function(key, item){
                  var date = new Date(item.id.date);
                  delete item.id;
                  item.date = date;
              })
              
              detail.dataSet.dataProvider = data;
              detail.chart.validateData();
          },
        });
    }
    
    
    $('#run_strategy').click(function() {
    	$('#strategy_body').removeClass('hidden');
    	run_strategy();    	
    })
    
    $('#history_exchange, #history_trading_pair, #history_granularity').change(function() {
        
        refresh_history_chart();
    })
    
    $('#compare1_exchange, #compare1_trading_pair').change(function() {
    	if ($('#compare1_exchange').val() !=0 && $('#compare1_trading_pair').val() !=0) {
        	$('#compare_chart_1').removeClass('hidden');
        	refresh_compare1_chart();
    	}
    })
    
    $('#compare2_exchange, #compare2_trading_pair').change(function() {
    	if ($('#compare2_exchange').val() !=0 && $('#compare2_trading_pair').val() !=0) {
	    	$('#compare_chart_2').removeClass('hidden');
	    	refresh_compare2_chart();
    	}
    })
    
    $('#display_on_chart').change(function(){
    	oTable.draw();
    })
    
    $('#time_range_select').change(function() {
    	alert("time range");
    })
})