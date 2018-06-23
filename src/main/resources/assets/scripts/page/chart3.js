var formatTime = function(unixTimestamp) {
    var dt = new Date(unixTimestamp);

    var year = dt.getFullYear();
    var month = dt.getMonth();
    var day = dt.getDate() + 1;
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
    var millisecs = dt.getMilliseconds()

    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    
    if (month < 10) 
    	month = '0' + month;
    
    if (day < 10) 
    	day = '0' + day;
    
    if (hours < 10) 
     hours = '0' + hours;

    if (minutes < 10) 
     minutes = '0' + minutes;

    if (seconds < 10) 
     seconds = '0' + seconds;
    
    if (millisecs < 10) 
    	millisecs = '00' + millisecs;
    else if (millisecs < 100)
    	millisecs = '0' + millisecs;

    return month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":" + seconds + "." + millisecs;
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
    }, {
        fromField: "color",
        toField: "color"        	
    }, {
        fromField: "count",
        toField: "count"
    }];
    dataSet.color = "#fff";
    dataSet.dataProvider = [];
    dataSet.title = "Stock";
    dataSet.categoryField = "date";
    dataSet.compared = false;

	chart.dataSets = [dataSet];
	
	var plSettings = new AmCharts.PanelsSettings();
	plSettings.color = "#888";
	plSettings.plotAreaFillColors = "#333";
	plSettings.plotAreaFillAlphas = 1;

	chart.panelsSettings = plSettings;
	
    var cateAxes = new AmCharts.CategoryAxesSettings();
    cateAxes.equalSpacing = true;
    cateAxes.maxSeries = 2400;
    cateAxes.minPeriod = "hh";
    cateAxes.groupToPeriods = ["ss", "10ss", "30ss", "mm", "10mm", "30mm", "hh", "DD", "WW", "MM", "YYYY"];	
    cateAxes.gridColor = "#acacac";
    cateAxes.gridAlpha = 1;

    chart.categoryAxesSettings = cateAxes;
    
    var valAxes = new AmCharts.ValueAxesSettings();
    valAxes.gridColor = "#acacac";
    valAxes.gridAlpha = 1;
    //valAxes.inside = false;
    valAxes.showLastLabel = true;

    chart.valueAxesSettings = valAxes;    
    
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
    graph.lineColor = "#11edf1";
    graph.fillColors = "#11edf1";
    graph.negativeLineColor = "#db4c3c";
    graph.negativeFillColors = "#db4c3c";
    graph.proCandlesticks = true;
    graph.fillAlphas = 1;
    graph.useDataSetColors = false;
    graph.showBalloon = false;
    stockPanel.addStockGraph(graph);

    var stockLegend = new AmCharts.StockLegend();
    stockLegend.valueTextRegular = "Open: [[open]] High: [[high]] Low: [[low]] Close: [[close]]";
    //stockLegend.periodValueTextComparing = "[[percents.value.close]]%";
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
    graph2.countField = "count";
    graph2.type = "column";
    graph2.showBalloon = true;
    graph2.balloonText = "Count: <b>[[count]]</b>";
    graph2.fillColorsField = "color";
    graph2.fillAlphas = 1;
    stockPanel2.addStockGraph(graph2);

    var legend2 = new AmCharts.StockLegend();
    legend2.markerType = "none";
    legend2.markerSize = 0;
    legend2.labelText = "";
    //legend2.periodValueTextRegular = "[[value.close]]";*/
    legend2.valueTextRegular = "Volume: [[volume]]";
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
    sbsettings.usePeriod = "hh";
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
    
    var chartCursorSettings = new AmCharts.ChartCursorSettings();
    chartCursorSettings.fullWidth = true;
//    chartCursorSettings.cursorColor = '#fff';
    chartCursorSettings.cursorAlpha = 0.1;
    chartCursorSettings.valueLineAlpha = 0.5;
    chartCursorSettings.cursorPosition = "middle";
    chart.chartCursorSettings = chartCursorSettings;

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
			type: "POST",
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
					granularityInMs: $('#analytics_group_size').val(),
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
        deferLoading: 2,
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
        }],
        fnDrawCallback: function (oSettings, b, c) {
        	$('#strategy_result').DataTable().row(':eq(0)', { page: 'current' }).select();
        }
    }).on('select', function (e, dt, type, indexes) {
        refresh_detail_chart();
    });
	
	
	AmCharts.ready(function () {
		histo = createStockChart('history_chart');
		
		refresh_history_chart();
	});
	
	function refresh_history_chart() {

        $.ajax({
          type: "POST",
          url: history_url,
          data:  {
        	  strategy: $('#analytics_strategy').val(),
    		  exchange: $('#history_exchange').val(),
    		  symbol: $('#history_trading_pair').val(),
    		  granularityInMs: $('#history_granularity').val(),
    		  threshold: $('#analytics_threshold').val(),
    		  start_date: $('#history_from').val(),
    		  end_date: $('#history_to').val()
          },
          success: function(data, res){
        	  $.each(data, function(key, item){
            	  if (item.importance > $('#analytics_threshold').val()){
            		  console.log(item);
            		  item.color = '#ff00ff';
            	  }else{
            		  item.count = 0;
            		  item.color = '#00ffff';
            	  }        		  
        	  })
        	  
              histo.chart.categoryAxesSettings.groupToPeriods = ["12hh"];	
        	  histo.chart.categoryAxesSettings.minPeriod = "6hh";
        	  histo.chart.chartScrollbarSettings.usePeriod = "6hh";
              
        	  histo.dataSet.dataProvider = data;
        	  histo.chart.validateData();
    

          },
        });

    }
    
    function refresh_detail_chart() {

    	var selectedRowData = oTable.row({selected: true}).data();
    	startMs = selectedRowData.startMs;
    	granularityInMs = $('#time_range_select').val();
    	startMs = startMs - granularityInMs * 30;
    	endMs = startMs + granularityInMs * 60;
    	
        $.ajax({
          type: "POST",
          url: detail_url,
          data:  {
        	  strategy: $('#analytics_strategy').val(),
              exchange: $('#history_exchange').val(),
              symbol: $('#history_trading_pair').val(),
              threshold: $('#analytics_threshold').val(),
              granularityInMs: $('#time_range_select').val(),
              start_date: startMs,
              end_date: endMs
          },
          success: function(data, res){
        	  
        	  if (data.length == 0) {
        		  toastr.warning("There are no data to draw chart", "Sorry!");
        	  }
        	  
              $.each(data, function(key, item){
            	  if (item.importance > $('#analytics_threshold').val()){
            		  console.log(item);
            		  item.color = '#ff0000';
            	  }else{
            		  item.count = 0;
            		  item.color = '#00ff00';
            	  }  
              })
              
              detail.chart.categoryAxesSettings.groupToPeriods = ["2ss"];	
              detail.chart.categoryAxesSettings.minPeriod = "1ss";
              detail.chart.chartScrollbarSettings.usePeriod = "1ss";
              detail.dataSet.dataProvider = data;
              detail.chart.validateData();
    
          },
        });

    }
    
    function get_strategy_result() {

        $.ajax({
          type: "POST",
          url: strategy_run_url,
          data:  {
				strategy: $('#analytics_strategy').val(),
				exchange: $('#history_exchange').val(),
				symbol: $('#history_trading_pair').val(),
				threshold: $('#analytics_threshold').val(),
				granularityInMs: $('#analytics_group_size').val(),
				start_date: $('#history_from').val(),
				end_date: $('#history_to').val()
          },
          success: function(data, res){
        	  $('#result_total').html(data.total);
        	  $('#result_average_percent').html(data.percent);
        	  $('#result_average_volume').html(data.volume);
          },
        });

    }
    
    function refresh_compare1_chart() {

    	var selectedRowData = oTable.row({selected: true}).data();
    	startMs = selectedRowData.startMs;
    	granularityInMs = $('#time_range_select').val();
    	startMs = startMs - granularityInMs * 30;
    	endMs = startMs + granularityInMs * 60;
    	
        $.ajax({
          type: "POST",
          url: detail_url,
          data:  {
        	  strategy: $('#analytics_strategy').val(),
        	  threshold: $('#analytics_threshold').val(),
              exchange: $('#compare1_exchange').val(),
              symbol: $('#compare1_trading_pair').val(),
              granularityInMs: granularityInMs,
              start_date: startMs,
              end_date: endMs
          },
          success: function(data, res){
        	  
        	  if (data.length == 0) {
        		  toastr.warning("There are no data to draw chart", "Sorry!");
        	  }
        	  
              $.each(data, function(key, item){
            	  if (item.importance > $('#analytics_threshold').val()){
            		  console.log(item);
            	  }else{
            		  item.count = 0;
            	  }            	  
              })
              
              compare1.dataSet.dataProvider = data;
              compare1.chart.validateData();
    

          },
        });

    }
    
    function refresh_compare2_chart() {

    	var selectedRowData = oTable.row({selected: true}).data();
    	startMs = selectedRowData.startMs;
    	granularityInMs = $('#time_range_select').val();
    	startMs = startMs - granularityInMs * 30;
    	endMs = startMs + granularityInMs * 60;
    	
        $.ajax({
          type: "POST",
          url: detail_url,
          data:  {
        	  strategy: $('#analytics_strategy').val(),
        	  threshold: $('#analytics_threshold').val(),
              exchange: $('#compare2_exchange').val(),
              symbol: $('#compare2_trading_pair').val(),
              granularityInMs: granularityInMs,
              start_date: startMs,
              end_date: endMs
          },
          success: function(data, res){
        	  
        	  if (data.length == 0) {
        		  toastr.warning("There are no data to draw chart", "Sorry!");
        	  }
        	  
              $.each(data, function(key, item){
            	  if (item.importance > $('#analytics_threshold').val()){
            		  console.log(item);
            	  }else{
            		  item.count = 0;
            	  }            	  
              })
              
              compare2.dataSet.dataProvider = data;
              compare2.chart.validateData();
    

          },
        });

    }
    
    $('#run_strategy').click(function() {
    	$('#strategy_body').removeClass('hidden');
    	if (detail == undefined)
    		detail = createStockChart('detail_chart');
    	
    	get_strategy_result();
    	oTable.draw();
    })
    
    $('#history_exchange, #history_trading_pair, #history_granularity').change(function() {
        
        refresh_history_chart();
    })
    
    $('#compare1_exchange, #compare1_trading_pair').change(function() {

		if ($('#compare1_exchange').val() !=0 && $('#compare1_trading_pair').val() !=0) {
        	$('#compare_chart_1').removeClass('hidden');
        	if (compare1 == undefined)
        		compare1 = createStockChart('compare_chart_1');
        	refresh_compare1_chart();
    	}else{
    		$('#compare_chart_1').addClass('hidden');
    	}
    })
    
    $('#compare2_exchange, #compare2_trading_pair').change(function() {
    	if ($('#compare2_exchange').val() !=0 && $('#compare2_trading_pair').val() !=0) {
	    	$('#compare_chart_2').removeClass('hidden');
	    	if (compare2 == undefined)
	    		compare2 = createStockChart('compare_chart_2');
	    	refresh_compare2_chart();
    	}else{
    		$('#compare_chart_2').addClass('hidden');
    	}
    })
    
    $('#display_on_chart').change(function(){
    	alert("display on chart");
    })
    
    $('#time_range_select').change(function() {
    	refresh_detail_chart();
    })
})