package com.trading.strategy.analytics.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.trading.strategy.analytics.model.Strategy;
import com.trading.strategy.analytics.model.StrategyResult;
import com.trading.strategy.analytics.model.StrategySearchItem;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StrategyRepository extends JpaRepository<Strategy, Long> {
	@Query(value = "SELECT *, round((high-low)/high, 4) percent FROM ohlc WHERE "
			+ "exchange = :exchange and symbol = :symbol and granularityInMs = :granularityInMs and ((high-low)/high > :importance) and startMs> :startMs and startMs < :endMs", countQuery = "SELECT count(*) FROM ohlc WHERE exchange = :exchange and symbol = :symbol and granularityInMs = :granularityInMs and ((high-low)/high > :importance) and startMs> :startMs and startMs < :endMs", nativeQuery = true)

	public Page<StrategySearchItem> findAllForStrategy(@Param("exchange") String exchange,
			@Param("symbol") String symbol, @Param("granularityInMs") Long granularityInMs,
			@Param("importance") Double importance, @Param("startMs") Long startMs, @Param("endMs") Long endMs,
			Pageable pageable);

	@Query(value = "select a.total, a.percent, volume from (SELECT 1 id, count(high) total, round(avg((high-low)/high),4) percent FROM ohlc WHERE "
			+ "exchange = :exchange and symbol = :symbol and granularityInMs = :granularityInMs and ((high-low)/high > :importance) and startMs> :startMs and startMs < :endMs) a left join "
			+ "(SELECT 1 id, round(avg(volume),4) volume FROM strategy WHERE strategyName=:strategy and exchange = :exchange and symbol = :symbol and granularityInMs = :granularityInMs and importance> :importance and startMs> :startMs and startMs < :endMs) b on a.id=b.id", nativeQuery = true)

	public StrategyResult findResultOfStrategy(@Param("strategy") String strategy, @Param("exchange") String exchange,
			@Param("symbol") String symbol, @Param("granularityInMs") Long granularityInMs,
			@Param("importance") Double importance, @Param("startMs") Long startMs, @Param("endMs") Long endMs);
}
