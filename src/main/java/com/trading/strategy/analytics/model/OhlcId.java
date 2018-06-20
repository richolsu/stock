package com.trading.strategy.analytics.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Embeddable
public class OhlcId implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name = "granularityinms")
	private Long granularityInMs;

	private String exchange;
	private String symbol;
	@Column(name = "startms")
	private Long startMs;

	@JsonIgnore
	public Long getGranularityInMs() {
		return granularityInMs;
	}

	public void setGranularityInMs(Long granularityInMs) {
		this.granularityInMs = granularityInMs;
	}

	@JsonIgnore
	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	@JsonIgnore
	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	@JsonProperty("date")
	public Long getStartMs() {
		return startMs;
	}

	public void setStartMs(Long startMs) {
		this.startMs = startMs;
	}

}