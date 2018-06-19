package com.trading.strategy.analytics.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "ohlc")
public class Ohlc {

	@EmbeddedId
	OhlcId id;
	private Double open;
	private Double high;
	private Double low;
	private Double close;
	private Double volume;
	private Long count;

	public OhlcId getId() {
		return id;
	}

	public void setId(OhlcId id) {
		this.id = id;
	}

	public Double getOpen() {
		return open;
	}

	public void setOpen(Double open) {
		this.open = open;
	}

	public Double getHigh() {
		return high;
	}

	public void setHigh(Double high) {
		this.high = high;
	}

	public Double getLow() {
		return low;
	}

	public void setLow(Double low) {
		this.low = low;
	}

	public Double getClose() {
		return close;
	}

	public void setClose(Double close) {
		this.close = close;
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

}

@Embeddable
class OhlcId implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long granularityInMs;
	private String exchange;
	private String symbol;
	private Long startMs;

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