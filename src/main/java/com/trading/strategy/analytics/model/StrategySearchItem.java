package com.trading.strategy.analytics.model;

public interface StrategySearchItem {

	Long getStartMs();

	Double getImportance();

	Double getVolume();

	Double getHigh();

	Double getLow();

	Long getCount();

}
