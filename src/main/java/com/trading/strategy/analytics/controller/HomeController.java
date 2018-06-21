package com.trading.strategy.analytics.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trading.strategy.analytics.model.Ohlc;
import com.trading.strategy.analytics.model.Strategy;
import com.trading.strategy.analytics.repository.OhlcRepository;
import com.trading.strategy.analytics.repository.StrategyRepository;

@Controller
public class HomeController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private OhlcRepository ohlcRepository;

	@Autowired
	private StrategyRepository strategyRepository;

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/history_data", produces = "application/json")
	public @ResponseBody List<Ohlc> vendor(@RequestParam Map<String, String> requestParams) {

		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");
		String startDate = requestParams.get("start_date");
		String endDate = requestParams.get("end_date");

		SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

		Long startMs = Instant.now().getEpochSecond() * 1000, endMs = Instant.now().getEpochSecond() * 1000;
		try {
			startMs = dateFormat.parse(startDate).getTime();
			endMs = dateFormat.parse(endDate).getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Long granularityMs = Long.parseLong(granularityInMs) * 60000;

		List<Ohlc> result = ohlcRepository.findAllForHistory(exchange, symbol, granularityMs, startMs, endMs);

		return result;
	}

	@RequestMapping(value = "/strategy_data", produces = "application/json")
	public @ResponseBody List<Strategy> strategy(@RequestParam Map<String, String> requestParams) {

		String strategy = requestParams.get("strategy");
		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");
		String threshold = requestParams.get("threshold");
		String startDate = requestParams.get("start_date");
		String endDate = requestParams.get("end_date");

		SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

		Long startMs = Instant.now().getEpochSecond() * 1000, endMs = Instant.now().getEpochSecond() * 1000;
		try {
			startMs = dateFormat.parse(startDate).getTime();
			endMs = dateFormat.parse(endDate).getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Long granularityMs = Long.parseLong(granularityInMs) * 60000;
		Float importance = Float.parseFloat(threshold);

		List<Strategy> result = strategyRepository.findAllForStrategy(strategy, exchange, symbol, granularityMs,
				importance, startMs, endMs);

		return result;
	}
}
