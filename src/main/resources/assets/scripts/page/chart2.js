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
	var chart = AmCharts.makeChart(tragetDivId, {
	  "type": "stock",
	  "theme": "none",
	
	  // "color": "#fff",
	  "dataSets": [ {
		"dataProvider":[],
	    "title": "MSFT",
	    "fieldMappings": [ {
	      "fromField": "open",
	      "toField": "open"
	    }, {
	      "fromField": "high",
	      "toField": "high"
	    }, {
	      "fromField": "low",
	      "toField": "low"
	    }, {
	      "fromField": "close",
	      "toField": "close"
	    }, {
	      "fromField": "volume",
	      "toField": "volume"
	    } ],
	    "compared": false,
	    "categoryField": "date",
	  } ],
	
	  "panels": [ {
	      "title": "Value",
	      "percentHeight": 70,
	
	      "stockGraphs": [ {
	        "type": "candlestick",
	        "id": "g1",
	        "openField": "open",
	        "closeField": "close",
	        "highField": "high",
	        "lowField": "low",
	        "valueField": "close",
	        "lineColor": "#fff",
	        "fillColors": "#fff",
	        "negativeLineColor": "#db4c3c",
	        "negativeFillColors": "#db4c3c",
	        "fillAlphas": 1,
	        "comparedGraphLineThickness": 2,
	        "columnWidth": 0.7,
	        "useDataSetColors": false,
	        "comparable": true,
	        "compareField": "close",
	        "showBalloon": false,
	        "proCandlesticks": true
	      } ],
	
	      "stockLegend": {
	        "valueTextRegular": undefined,
	        "periodValueTextComparing": "[[percents.value.close]]%"
	      }
	
	    },
	
	    {
	      "title": "Volume",
	      "percentHeight": 30,
	      "marginTop": 1,
	      "columnWidth": 0.6,
	      "showCategoryAxis": false,
	
	      "stockGraphs": [ {
	        "valueField": "volume",
	        "openField": "open",
	        "type": "column",
	        "showBalloon": false,
	        "fillAlphas": 1,
	        "lineColor": "#fff",
	        "fillColors": "#fff",
	        "negativeLineColor": "#db4c3c",
	        "negativeFillColors": "#db4c3c",
	        "useDataSetColors": false
	      } ],
	
	      "stockLegend": {
	        "markerType": "none",
	        "markerSize": 0,
	        "labelText": "",
	        "periodValueTextRegular": "[[value.close]]"
	      },
	
	      "valueAxes": [ {
	        "usePrefixes": true
	      } ]
	    }
	  ],
	
	  "panelsSettings": {
	    // "color": "#fff",
	    "plotAreaFillColors": "#333",
	    "plotAreaFillAlphas": 1,
	    "marginLeft": 60,
	    "marginTop": 5,
	    "marginBottom": 5
	  },
	
	  "chartScrollbarSettings": {
	    "graph": "g1",
	    "graphType": "line",
	    "usePeriod": "WW",
	    "backgroundColor": "#333",
	    "graphFillColor": "#666",
	    "graphFillAlpha": 0.5,
	    "gridColor": "#555",
	    "gridAlpha": 1,
	    "selectedBackgroundColor": "#444",
	    "selectedGraphFillAlpha": 1
	  },
	
	  "categoryAxesSettings": {
	    "equalSpacing": true,
	    "gridColor": "#555",
	    "gridAlpha": 1
	  },
	
	  "valueAxesSettings": {
	    "gridColor": "#555",
	    "gridAlpha": 1,
	    "inside": false,
	    "showLastLabel": true
	  },
	
	  "chartCursorSettings": {
	    "pan": true,
	    "valueLineEnabled": true,
	    "valueLineBalloonEnabled": true
	  },
	
	  "legendSettings": {
	    // "color": "#fff"
	  },
	
	  "stockEventsSettings": {
	    "showAt": "high",
	    "type": "pin"
	  },
	
	  "balloon": {
	    "textAlign": "left",
	    "offsetY": 10
	  },
	
	  "periodSelector": {
	    "position": "bottom",
	    "periods": [ {
	        "period": "DD",
	        "count": 10,
	        "label": "10D"
	      }, {
	        "period": "MM",
	        "count": 1,
	        "label": "1M"
	      }, {
	        "period": "MM",
	        "count": 6,
	        "label": "6M"
	      }, {
	        "period": "YYYY",
	        "count": 1,
	        "label": "1Y"
	      }, {
	        "period": "YYYY",
	        "count": 2,
	        "selected": true,
	        "label": "2Y"
	      },
	      /*
			 * { "period": "YTD", "label": "YTD" },
			 */
	      {
	        "period": "MAX",
	        "label": "MAX"
	      }
	    ]
	  }
	});
	
	return {chart:chart, dataSet:chart.dataSet};
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
              
        	  histo.chart.dataSets[0].dataProvider = data;
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
              
              detail.chart.dataSets[0].dataProvider = data;
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