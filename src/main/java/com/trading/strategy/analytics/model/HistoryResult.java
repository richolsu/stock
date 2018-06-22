package com.trading.strategy.analytics.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface HistoryResult {

	@JsonProperty("date")
	Long getStartMs();

	Double getOpen();

	Double getClose();

	Double getHigh();

	Double getLow();

	Double getVolume();

	Double getImportance();

	Long getCount();

}
