package com.trading.strategy.analytics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.trading.strategy.analytics.model.Strategy;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StrategyRepository extends JpaRepository<Strategy, Long> {
	@Query(value = "SELECT * FROM strategy t WHERE "
			+ "t.strategyName = ?1 and t.exchange = ?2 and t.symbol = ?3 and granularityInMs = ?4 and importance=?5 and startMs> ?6 and startMs < ?7", nativeQuery = true)

	public List<Strategy> findAllForStrategy(String strategyName, String exchange, String symbol, Long granularityInMs,
			Float importance, Long startMs, Long endMs);
}
