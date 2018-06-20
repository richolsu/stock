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
import com.trading.strategy.analytics.repository.OhlcRepository;

@Controller
public class HomeController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private OhlcRepository ohlcRepository;

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

		logger.info(startMs + " ~ " + endMs);
		// Ohlc ohlc = new Ohlc();
		//
		// OhlcId ohlcId = new OhlcId();
		// ohlcId.setExchange(exchange);
		// ohlcId.setSymbol(symbol);
		// ohlcId.setGranularityInMs(Long.parseLong(granularityInMs) * 3600000);
		// ohlc.setId(ohlcId);
		//
		// // Example<Ohlc> example = Example.of(ohlc);
		//
		// ExampleMatcher exampleMatcher = ExampleMatcher.matching()
		// .withMatcher("exchange", match -> match.equals(exchange))
		// .withMatcher("symbol", match -> match.equals(symbol))
		// .withMatcher("granularityInMs", match ->
		// match.equals(Long.parseLong(granularityInMs) * 3600000));
		// Example<Ohlc> example = Example.of(ohlc, exampleMatcher);
		//
		// PageRequest request = PageRequest.of(0, 1000);
		// Page<Ohlc> result = ohlcRepository.findAll(example, request);

		Long granularityMs = Long.parseLong(granularityInMs) * 3600000;
		logger.info("granularityMs= " + granularityMs);
		List<Ohlc> result = ohlcRepository.findAllForHistory(exchange, symbol, granularityMs, startMs, endMs);
		logger.info("result=" + result.size());
		return result;
	}

}
