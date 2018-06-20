package com.trading.strategy.analytics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.trading.strategy.analytics.model.Ohlc;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OhlcRepository extends JpaRepository<Ohlc, Long> {

	@Query(value = "SELECT * FROM ohlc t WHERE "
			+ "t.exchange = ?1 and t.symbol = ?2 and granularityInMs = ?3 and startMs> ?4 and startMs < ?5", nativeQuery = true)

	public List<Ohlc> findAllForHistory(String exchange, String symbol, Long granularityInMs, Long startMs, Long endMs);
}
