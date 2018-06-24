package com.trading.strategy.analytics.controller;

import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trading.strategy.analytics.model.HistoryResult;
import com.trading.strategy.analytics.model.StrategyResult;
import com.trading.strategy.analytics.model.StrategySearchItem;
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
	public @ResponseBody List<HistoryResult> historyData(@RequestParam Map<String, String> requestParams) {

		String strategy = requestParams.get("strategy");
		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");
		String threshold = requestParams.get("threshold");
		String groupSize = requestParams.get("group_size");
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
		Long groupSizeMs = Long.parseLong(groupSize);
		Double importance = Double.parseDouble(threshold);

		List<HistoryResult> result = ohlcRepository.findAllForHistory(strategy, groupSizeMs, exchange, symbol,
				granularityMs, importance, startMs, endMs);

		return result;
	}

	@RequestMapping(value = "/detail_data", produces = "application/json")
	public @ResponseBody List<HistoryResult> detailData(@RequestParam Map<String, String> requestParams) {

		String strategy = requestParams.get("strategy");
		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");
		String threshold = requestParams.get("threshold");
		String startDate = requestParams.get("start_date");
		String endDate = requestParams.get("end_date");
		String groupSize = requestParams.get("group_size");

		Long startMs = Long.parseLong(startDate);
		Long endMs = Long.parseLong(endDate);
		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold);
		Long groupSizeMs = Long.parseLong(groupSize);

		List<HistoryResult> result = ohlcRepository.findAllForHistory(strategy, groupSizeMs, exchange, symbol,
				granularityMs, importance, startMs, endMs);

		return result;
	}

	@RequestMapping(value = "/strategy/run", produces = "application/json")
	public @ResponseBody StrategyResult runStrategy(@RequestParam Map<String, String> requestParams) {

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

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold);

		logger.info(strategy + " " + exchange + " " + symbol + " " + granularityMs + " " + importance + " " + startMs
				+ " " + endMs);
		StrategyResult result = strategyRepository.findResultOfStrategy(strategy, exchange, symbol, granularityMs,
				importance, startMs, endMs);

		return result;
	}

	@RequestMapping(value = "/strategy/page", produces = "application/json")
	public @ResponseBody Page<StrategySearchItem> strategyPageResult(@RequestParam Map<String, String> requestParams) {

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

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold);

		int rows_per_page = Integer.parseInt(requestParams.getOrDefault("rows_per_page", "3"));
		int page_index = Integer.parseInt(requestParams.getOrDefault("page_index", "1"));
		String order = requestParams.getOrDefault("order", "name");
		String dir = requestParams.getOrDefault("dir", "asc");

		page_index--;
		PageRequest request = PageRequest.of(page_index, rows_per_page,
				dir.equals("asc") ? Direction.ASC : Direction.DESC, order);

		logger.info(strategy + " " + exchange + " " + symbol + " " + granularityMs + " " + importance + " " + startMs
				+ " " + endMs);
		Page<StrategySearchItem> result = strategyRepository.findAllForStrategy(strategy, exchange, symbol,
				granularityMs, importance, startMs, endMs, request);

		return result;
	}

	@RequestMapping(value = "/strategy/all", produces = "application/json")
	public @ResponseBody List<BigInteger> strategyAll(@RequestParam Map<String, String> requestParams) {

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

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold);

		logger.info(strategy + " " + exchange + " " + symbol + " " + granularityMs + " " + importance + " " + startMs
				+ " " + endMs);
		List<BigInteger> result = strategyRepository.findListForResult(strategy, exchange, symbol, granularityMs,
				importance, startMs, endMs);

		return result;
	}
}
