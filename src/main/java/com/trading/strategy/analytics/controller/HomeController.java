package com.trading.strategy.analytics.controller;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

	private Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
	private SimpleDateFormat dateFormat2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("select_list", ohlcRepository.findAllExchangeSymbol());
		model.addAttribute("strategy_list", strategyRepository.findAllStrategyName());
		return "index";
	}

	@GetMapping("/test1")
	public String index2(Model model) {
		model.addAttribute("select_list", ohlcRepository.findAllExchangeSymbol());
		model.addAttribute("strategy_list", strategyRepository.findAllStrategyName());
		return "index1";
	}

	@GetMapping("/test2")
	public String index3(Model model) {
		model.addAttribute("select_list", ohlcRepository.findAllExchangeSymbol());
		model.addAttribute("strategy_list", strategyRepository.findAllStrategyName());
		return "index2";
	}

	@RequestMapping(value = "/history_data", produces = "application/json")
	public @ResponseBody List<HistoryResult> historyData(@RequestParam Map<String, String> requestParams) {

		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");

		String startDate = requestParams.get("start_date");
		String endDate = requestParams.get("end_date");

		Long startMs = getStartDate(startDate).getTime();
		Long endMs = getEndDate(endDate).getTime();

		Long granularityMs = Long.parseLong(granularityInMs) * 60000;

		List<HistoryResult> result = ohlcRepository.findAllForHistory(exchange, symbol, granularityMs, startMs, endMs);

		return result;
	}

	@RequestMapping(value = "/detail_data", produces = "application/json")
	public @ResponseBody List<HistoryResult> detailData(@RequestParam Map<String, String> requestParams) {

		String exchange = requestParams.get("exchange");
		String symbol = requestParams.get("symbol");
		String granularityInMs = requestParams.get("granularityInMs");

		String startDate = requestParams.get("start_date");
		String endDate = requestParams.get("end_date");

		Long startMs = Long.parseLong(startDate);
		Long endMs = Long.parseLong(endDate);
		Long granularityMs = Long.parseLong(granularityInMs);

		List<HistoryResult> result = ohlcRepository.findAllForHistory(exchange, symbol, granularityMs, startMs, endMs);

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

		Long startMs = getStartDate(startDate).getTime();
		Long endMs = getEndDate(endDate).getTime();

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold) / 100;

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
		String order = requestParams.getOrDefault("order", "name");
		String dir = requestParams.getOrDefault("dir", "asc");

		Long startMs = getStartDate(startDate).getTime();
		Long endMs = getEndDate(endDate).getTime();

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold) / 100;

		if (order.equals("importance"))
			order = "b.importance";

		PageRequest request = PageRequest.of(0, Integer.MAX_VALUE, dir.equals("asc") ? Direction.ASC : Direction.DESC,
				order);

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

		Long startMs = getStartDate(startDate).getTime();
		Long endMs = getEndDate(endDate).getTime();

		Long granularityMs = Long.parseLong(granularityInMs);
		Double importance = Double.parseDouble(threshold) / 100;

		List<BigInteger> result = strategyRepository.findListForResult(strategy, exchange, symbol, granularityMs,
				importance, startMs, endMs);

		return result;
	}

	private Date getNextDate(Date date) {
		Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT"));
		c.setTime(date);
		c.add(Calendar.DATE, 1); // number of days to add
		return c.getTime();
	}

	private Date getStartDate(String startDateStr) {

		Date date = calendar.getTime();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
		dateFormat2.setTimeZone(TimeZone.getTimeZone("UTC"));
		try {
			date = dateFormat.parse(startDateStr);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}

	private Date getEndDate(String endDateStr) {
		Date date = calendar.getTime();
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
		try {
			date = dateFormat.parse(endDateStr);
			calendar.setTime(date);
			calendar.add(Calendar.DATE, 1); // number of days to add
			date = calendar.getTime();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		dateFormat2.setTimeZone(TimeZone.getTimeZone("UTC"));
		return date;
	}
}
