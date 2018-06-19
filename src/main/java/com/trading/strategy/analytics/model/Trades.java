package com.trading.strategy.analytics.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "trades")
public class Trades {

	@EmbeddedId
	TradesId id;

	private Double price;
	private Double size;
	private Long timeInMs;
	private Integer sellerIsMaker;
	private Integer isBestMatch;

	public TradesId getId() {
		return id;
	}

	public void setId(TradesId id) {
		this.id = id;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getSize() {
		return size;
	}

	public void setSize(Double size) {
		this.size = size;
	}

	public Long getTimeInMs() {
		return timeInMs;
	}

	public void setTimeInMs(Long timeInMs) {
		this.timeInMs = timeInMs;
	}

	public Integer getSellerIsMaker() {
		return sellerIsMaker;
	}

	public void setSellerIsMaker(Integer sellerIsMaker) {
		this.sellerIsMaker = sellerIsMaker;
	}

	public Integer getIsBestMatch() {
		return isBestMatch;
	}

	public void setIsBestMatch(Integer isBestMatch) {
		this.isBestMatch = isBestMatch;
	}

}

@Embeddable
class TradesId implements Serializable {
	private static final long serialVersionUID = 1L;

	private String exchange;
	private String symbol;
	private Long id;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
