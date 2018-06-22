package com.trading.strategy.analytics.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.trading.strategy.analytics.model.Strategy;
import com.trading.strategy.analytics.model.StrategySearchItem;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StrategyRepository extends JpaRepository<Strategy, Long> {
	@Query(value = "SELECT *, (high-low)/high percent FROM ohlc WHERE "
			+ "exchange = ?1 and symbol = ?2 and granularityInMs = ?3 and ((high-low)/high > ?4) and startMs> ?5 and startMs < ?6", countQuery = "SELECT count(*) FROM ohlc WHERE exchange = ?1 and symbol = ?2 and granularityInMs = ?3 and ((high-low)/high > ?4) and startMs> ?5 and startMs < ?6", nativeQuery = true)

	public Page<StrategySearchItem> findAllForStrategy(String exchange, String symbol, Long granularityInMs,
			Double importance, Long startMs, Long endMs, Pageable pageable);
}
