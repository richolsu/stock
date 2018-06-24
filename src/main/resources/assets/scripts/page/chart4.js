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

  return month + "-" + day + "-" + year + " " + hours + ":" + minutes + ":"
      + seconds + "." + millisecs;
}

function createStockChart(tragetDivId) {
  var chart = AmCharts
      .makeChart(
          tragetDivId,
          {
            "type" : "stock",
            "theme" : "none",

            // "color": "#fff",
            "dataSets" : [ {
              "dataProvider" : [],
              "fieldMappings" : [ {
                "fromField" : "open",
                "toField" : "open"
              }, {
                "fromField" : "high",
                "toField" : "high"
              }, {
                "fromField" : "low",
                "toField" : "low"
              }, {
                "fromField" : "close",
                "toField" : "close"
              }, {
                "fromField" : "volume",
                "toField" : "volume"
              }, {
                "fromField" : "color",
                "toField" : "color"
              }, {
                "fromField" : "count",
                "toField" : "count"
              } ],
              "color" : "#777",
              "title" : "Stock",
              "compared" : false,
              "categoryField" : "date",
            } ],

            "panels" : [
                {
                  "showCategoryAxis" : false,
                  "valueAxis" : {
                    "dashLength" : 50,
                    "maxiumum" : 80
                  },
                  "categoryAxis" : {
                    "dashLength" : 5
                  },
                  "title" : "Value",
                  "percentHeight" : 70,

                  "stockGraphs" : [ {
                    "type" : "candlestick",
                    "id" : "g1",
                    "openField" : "open",
                    "closeField" : "close",
                    "highField" : "high",
                    "lowField" : "low",
                    "valueField" : "close",
                    "lineColor" : "#00ff00",
                    "fillColors" : "#00ff00",
                    "negativeLineColor" : "#e05f2f",
                    "negativeFillColors" : "#e05f2f",
                    "fillAlphas" : 1,
                    "comparedGraphLineThickness" : 2,
                    "columnWidth" : 0.7,
                    "useDataSetColors" : false,
                    "comparable" : true,
                    "compareField" : "close",
                    "showBalloon" : false,
                    "proCandlesticks" : true
                  } ],

                  "stockLegend" : {
                    "valueTextRegular" : "Open: [[open]] High: [[high]] Low: [[low]] Close: [[close]]",
                  // "periodValueTextComparing": "[[percents.value.close]]%"
                  }
                }, {
                  "title" : "Volume",
                  "percentHeight" : 30,
                  "marginTop" : 1,
                  "columnWidth" : 0.7,
                  "showCategoryAxis" : true,

                  "stockGraphs" : [ {
                    "valueField" : "volume",
                    "countField" : "count",
                    "fillColorsField" : "color",
                    "type" : "column",
                    "showBalloon" : true,
                    "balloonText" : "Count: <b>[[count]]</b>",
                    "fillAlphas" : 1,
                    "lineColor" : "#22272c",
                    "fillColors" : "#22272c",
                  } ],
                  "stockLegend" : {
                    "markerType" : "none",
                    "markerSize" : 0,
                    "labelText" : "",
                    "periodValueTextRegular" : "[[volume]]"
                  },
                  "valueAxes" : [ {
                    "usePrefixes" : true
                  } ]
                } ],

            "panelsSettings" : {
              "color" : "#080e15",
              "plotAreaFillColors" : "#080e15",
              "plotAreaFillAlphas" : 1,
              "marginLeft" : 60,
              "marginTop" : 5,
              "marginBottom" : 5
            },

            "chartScrollbarSettings" : {
              "graph" : "g1",
              "graphType" : "line",
              "usePeriod" : "DD",
              "backgroundColor" : "#080e15",
              "graphFillColor" : "#666",
              "graphFillAlpha" : 0.5,
              "gridColor" : "#fff",
              "gridAlpha" : 1,
              "selectedBackgroundColor" : "#444",
              "selectedGraphFillAlpha" : 1
            },

            "categoryAxesSettings" : {
              "equalSpacing" : false,
              "gridAlpha" : 0.5,
              "maxSeries" : 240000,
              "minPeriod" : "1DD",
              "gridColor" : "#ffffff",
              "dateFormats" : [ {
                period : 'fff',
                format : 'JJ:NN:SS.fff'
              }, {
                period : 'ss',
                format : 'JJ:NN:SS'
              }, {
                period : 'mm',
                format : 'JJ:NN'
              }, {
                period : 'hh',
                format : 'LA'
              }, {
                period : 'DD',
                format : 'MMM DD'
              }, {
                period : 'WW',
                format : 'MMM DD'
              }, {
                period : 'MM',
                format : 'MMM'
              }, {
                period : 'YYYY',
                format : 'YYYY'
              } ]
            },

            "valueAxesSettings" : {
              "gridColor" : "#ffffff",
              "gridAlpha" : 0.5,
              "inside" : false,
              "dateFormats" : [ {
                period : 'fff',
                format : 'JJ:NN:SS.fff'
              }, {
                period : 'ss',
                format : 'JJ:NN:SS'
              }, {
                period : 'mm',
                format : 'JJ:NN'
              }, {
                period : 'hh',
                format : 'LA'
              }, {
                period : 'DD',
                format : 'MMM DD'
              }, {
                period : 'WW',
                format : 'MMM DD'
              }, {
                period : 'MM',
                format : 'MMM'
              }, {
                period : 'YYYY',
                format : 'YYYY'
              } ]
            },

            "chartCursorSettings" : {
              "fullWidth" : true,
              "cursorColor" : '#e05f2f',
              "cursorAlpha" : 0.7,
              "pan" : true,
              "cursorPosition" : "middle",
              "valueLineEnabled" : true,
              "valueLineBalloonEnabled" : true,
              "categoryBalloonDateFormats" : [ {
                period : "YYYY",
                format : "YYYY"
              }, {
                period : "MM",
                format : "MMM, YYYY"
              }, {
                period : "WW",
                format : "MMM DD, YYYY"
              }, {
                period : "DD",
                format : "MMM DD, YYYY"
              }, {
                period : "hh",
                format : "LA"
              }, {
                period : "mm",
                format : "JJ:NN"
              }, {
                period : "ss",
                format : "JJ:NN:SS"
              }, {
                period : "fff",
                format : "JJ:NN:SS.fff"
              } ]
            },

            "legendSettings" : {
            // "color": "#fff"
            },

            "stockEventsSettings" : {
              "showAt" : "high",
              "type" : "pin"
            },

            "balloon" : {
              "textAlign" : "left",
              "offsetY" : 10
            },

            "periodSelector" : {
              "hideOutOfScopePeriods" : true,
              "inputFieldsEnabled" : false,
              "position" : "bottom",
              "periods" : [ {
                "period" : "hh",
                "count" : 1,
                "label" : "1 Hour"
              }, {
                "period" : "DD",
                "count" : 1,
                "label" : "1 Day"
              }, {
                "period" : "DD",
                "count" : 15,
                "label" : "15 Days"
              }, {
                "period" : "MM",
                "count" : 1,
                "label" : "1 Month"
              }, {
                "period" : "MAX",
                "label" : "MAX"
              } ]
            },
            "listeners": [{
              "event": "dataUpdated",
              "method": function(e) {
                for (var x in e.chart.periodSelector.periods) {
                  var period = e.chart.periodSelector.periods[x];
                  if ('MAX' == period.period) {
                    period.selected = true;
                  } else {
                    period.selected = false;
                  }
                }

                e.chart.periodSelector.setDefaultPeriod();
              }
            }]
          });

  return chart;
}

var histo, detail, compare1, compare2, strategy_result;

jQuery(document).ready(
    function() {
      var today = new Date();
      $('#history_to').datepicker("setDate", today);
      $('#history_from').datepicker("setDate",
          new Date(today.setMonth(today.getMonth() - 3)));

      var oTable = $('#strategy_result').DataTable({
        processing : true,
        serverSide : true,
        lengthChange : false,
        searching : false,
        ordering : true,
        ajax : {
          url : strategy_page_url,
          type : "POST",
          data : function(data) {
            var filter = {
              rows_per_page : data.length,
              page_index : data.start / data.length + 1,
              order : data.columns[data.order[0].column].data,
              dir : data.order[0].dir,
              strategy : $('#analytics_strategy').val(),
              exchange : $('#history_exchange').val(),
              symbol : $('#history_trading_pair').val(),
              threshold : $('#analytics_threshold').val(),
              granularityInMs : $('#analytics_group_size').val(),
              start_date : $('#history_from').val(),
              end_date : $('#history_to').val()
            }
            return filter;
          },
          dataSrc : function(json) {
            json.recordsTotal = json.totalElements;
            json.recordsFiltered = json.totalElements;
            return json.content;
          },
        },
        pageLength : 5,
        deferLoading : 2,
        select : true,
        columns : [ {
          data : 'startMs',
          render : function(data, display, record) {
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
        } ],
        fnDrawCallback : function(oSettings, b, c) {
          $('#strategy_result').DataTable().row(':eq(0)', {
            page : 'current'
          }).select();
        }
      }).on('select', function(e, dt, type, indexes) {
        refresh_detail_chart();
      });

      AmCharts.ready(function() {
        histo = createStockChart('history_chart');

        refresh_history_chart();
      });

      function refresh_history_chart() {

        $.ajax({
          type : "POST",
          url : history_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            granularityInMs : $('#history_granularity').val(),
            threshold : $('#analytics_threshold').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            $.each(data, function(key, item) {
              if (item.importance > $('#analytics_threshold').val()) {
                item.color = '#ff00ff';
              } else {
                item.count = 0;
                item.color = '#00ffff';
              }

              if (item.date % 2500000 == 0) {
                item.color = '#F7CA18';
                item.count = item.date;
              } else {
                item.color = '#22272c';
              }
            })

            switch ($('#history_granularity').val()) {
              case "1440":
                histo.categoryAxesSettings.minPeriod = "DD";
                histo.chartScrollbarSettings.usePeriod = "DD";
                break;
              case "360":
                histo.categoryAxesSettings.minPeriod = "6hh";
                histo.chartScrollbarSettings.usePeriod = "6hh";
                break;
              case "60":
                histo.categoryAxesSettings.minPeriod = "1hh";
                histo.chartScrollbarSettings.usePeriod = "1hh";
                break;
              case "15":
                histo.categoryAxesSettings.minPeriod = "15mm";
                histo.chartScrollbarSettings.usePeriod = "15mm";
                break;
            }

            histo.dataSets[0].dataProvider = data;
            histo.validateData();

          },
        });

      }

      function refresh_detail_chart() {

        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            threshold : $('#analytics_threshold').val(),
            granularityInMs : $('#time_range_select').val(),
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              if (item.importance > $('#analytics_threshold').val()) {
                item.color = '#ff0000';
              } else {
                item.count = 0;
                item.color = '#00ff00';
              }
            })

            switch ($('#time_range_select').val()) {
              case "100":
                detail.categoryAxesSettings.minPeriod = "100fff";
                detail.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                detail.categoryAxesSettings.minPeriod = "1ss";
                detail.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                detail.categoryAxesSettings.minPeriod = "3ss";
                detail.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                detail.categoryAxesSettings.minPeriod = "6ss";
                detail.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            detail.dataSets[0].dataProvider = data;
            detail.validateData();

          },
        });

      }

      function get_strategy_result() {

        $.ajax({
          type : "POST",
          url : strategy_run_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            threshold : $('#analytics_threshold').val(),
            granularityInMs : $('#analytics_group_size').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            $('#result_total').html(data.total);
            $('#result_average_percent').html(data.percent);
            $('#result_average_volume').html(data.volume);
          },
        });

      }

      function refresh_compare1_chart() {

        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#compare1_exchange').val(),
            symbol : $('#compare1_trading_pair').val(),
            granularityInMs : granularityInMs,
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              if (item.importance > $('#analytics_threshold').val()) {
              } else {
                item.count = 0;
              }
            })
            
            switch ($('#time_range_select').val()) {
              case "100":
                compare1.categoryAxesSettings.minPeriod = "100fff";
                compare1.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                compare1.categoryAxesSettings.minPeriod = "1ss";
                compare1.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                compare1.categoryAxesSettings.minPeriod = "3ss";
                compare1.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                compare1.categoryAxesSettings.minPeriod = "6ss";
                compare1.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            compare1.dataSets[0].dataProvider = data;
            compare1.validateData();
          },
        });

      }

      function refresh_compare2_chart() {

        var selectedRowData = oTable.row({
          selected : true
        }).data();
        startMs = selectedRowData.startMs;
        granularityInMs = $('#time_range_select').val();
        startMs = startMs - granularityInMs * 30;
        endMs = startMs + granularityInMs * 60;

        $.ajax({
          type : "POST",
          url : detail_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            threshold : $('#analytics_threshold').val(),
            exchange : $('#compare2_exchange').val(),
            symbol : $('#compare2_trading_pair').val(),
            granularityInMs : granularityInMs,
            start_date : startMs,
            end_date : endMs
          },
          success : function(data, res) {

            if (data.length == 0) {
              toastr.warning("There are no data to draw chart", "Sorry!");
            }

            $.each(data, function(key, item) {
              if (item.importance > $('#analytics_threshold').val()) {
              } else {
                item.count = 0;
              }
            })

            switch ($('#time_range_select').val()) {
              case "100":
                compare2.categoryAxesSettings.minPeriod = "100fff";
                compare2.chartScrollbarSettings.usePeriod = "100fff";
                break;
              case "1000":
                compare2.categoryAxesSettings.minPeriod = "1ss";
                compare2.chartScrollbarSettings.usePeriod = "1ss";
                break;
              case "3000":
                compare2.categoryAxesSettings.minPeriod = "3ss";
                compare2.chartScrollbarSettings.usePeriod = "3ss";
                break;
              case "6000":
                compare2.categoryAxesSettings.minPeriod = "6ss";
                compare2.chartScrollbarSettings.usePeriod = "6ss";
                break;
            }

            compare2.dataSets[0].dataProvider = data;
            compare2.validateData();

          },
        });

      }

      function update_strategy_all_result() {
        $.ajax({
          type : "POST",
          url : strategy_all_url,
          data : {
            strategy : $('#analytics_strategy').val(),
            exchange : $('#history_exchange').val(),
            symbol : $('#history_trading_pair').val(),
            threshold : $('#analytics_threshold').val(),
            granularityInMs : $('#analytics_group_size').val(),
            start_date : $('#history_from').val(),
            end_date : $('#history_to').val()
          },
          success : function(data, res) {
            strategy_result = data;
          }
        });
      }
      
      $('#run_strategy').click(function() {
        $('#strategy_body').removeClass('hidden');
        if (detail == undefined)
          detail = createStockChart('detail_chart');

        get_strategy_result();
        update_strategy_all_result();
        
        oTable.draw();
      })

      $('#history_exchange, #history_trading_pair, #history_granularity')
          .change(function() {

            refresh_history_chart();
          })

      $('#compare1_exchange, #compare1_trading_pair').change(
          function() {

            if ($('#compare1_exchange').val() != 0
                && $('#compare1_trading_pair').val() != 0) {
              $('#compare_chart_1').removeClass('hidden');
              if (compare1 == undefined)
                compare1 = createStockChart('compare_chart_1');
              refresh_compare1_chart();
            } else {
              $('#compare_chart_1').addClass('hidden');
            }
          })

      $('#compare2_exchange, #compare2_trading_pair').change(
          function() {
            if ($('#compare2_exchange').val() != 0
                && $('#compare2_trading_pair').val() != 0) {
              $('#compare_chart_2').removeClass('hidden');
              if (compare2 == undefined)
                compare2 = createStockChart('compare_chart_2');
              refresh_compare2_chart();
            } else {
              $('#compare_chart_2').addClass('hidden');
            }
          })

      $('#display_on_chart').change(function(a, b, c) {
        
        if ($('#display_on_chart').is(':checked')) {
          if (strategy_result != undefined) {
            $.each(histo.dataSets[0], function(key, value) {
              console.log(value);
            })
            $.each(strategy_result, function(key, value) {
              console.log(value);
            })
          }
        }else{
          
        }
        
      })

      $('#time_range_select').change(function() {
        refresh_detail_chart();
      })
    })