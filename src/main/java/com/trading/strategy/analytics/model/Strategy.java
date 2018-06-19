package com.trading.strategy.analytics.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "strategy")
public class Strategy {

	@EmbeddedId
	StrategyId id;
	private Double volume;
	private Long count;
	private Double importance;

	public StrategyId getId() {
		return id;
	}

	public void setId(StrategyId id) {
		this.id = id;
	}

	public Double getVolume() {
		return volume;
	}

	public void setVolume(Double volume) {
		this.volume = volume;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Double getImportance() {
		return importance;
	}

	public void setImportance(Double importance) {
		this.importance = importance;
	}

}

@Embeddable
class StrategyId implements Serializable {
	private static final long serialVersionUID = 1L;

	private String strategyName;
	private Long granularityInMs;
	private String exchange;
	private String symbol;
	private Long startMs;

	public String getStrategyName() {
		return strategyName;
	}

	public void setStrategyName(String strategyName) {
		this.strategyName = strategyName;
	}

	public Long getGranularityInMs() {
		return granularityInMs;
	}

	public void setGranularityInMs(Long granularityInMs) {
		this.granularityInMs = granularityInMs;
	}

	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public Long getStartMs() {
		return startMs;
	}

	public void setStartMs(Long startMs) {
		this.startMs = startMs;
	}

}
