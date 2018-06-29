package com.trading.strategy.analytics.repository;

import java.math.BigInteger;
import java.util.List;

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
	@Query(value = "SELECT a.high, a.low, a.volume, a.startMs, a.count, round(b.importance*100, 2) importance, a.open, a.close  FROM OHLC a left join strategy b on a.exchange=b.exchange and a.symbol=b.symbol and a.granularityInMs=b.granularityInMs and a.startMs=b.startMs and b.strategyName= :strategy "
			+ "where a.exchange = :exchange and a.symbol = :symbol and a.granularityInMs = :granularityInMs and b.importance> :importance and "
			+ "a.startMs>= :startMs and a.startMs < :endMs", nativeQuery = true)

	public Page<StrategySearchItem> findAllForStrategy(@Param("strategy") String strategy,
			@Param("exchange") String exchange, @Param("symbol") String symbol,
			@Param("granularityInMs") Long granularityInMs, @Param("importance") Double importance,
			@Param("startMs") Long startMs, @Param("endMs") Long endMs, Pageable pageable);

	@Query(value = "SELECT count(*) total,round(100*avg(importance),2) percent, avg(volume) volume FROM strategy WHERE strategyName=:strategy and exchange = :exchange and symbol = :symbol and granularityInMs = :granularityInMs and importance> :importance and startMs>= :startMs and startMs < :endMs", nativeQuery = true)

	public StrategyResult findResultOfStrategy(@Param("strategy") String strategy, @Param("exchange") String exchange,
			@Param("symbol") String symbol, @Param("granularityInMs") Long granularityInMs,
			@Param("importance") Double importance, @Param("startMs") Long startMs, @Param("endMs") Long endMs);

	@Query(value = "SELECT a.startMs from strategy a "
			+ "where a.strategyName= :strategy and a.exchange = :exchange and a.symbol = :symbol and a.granularityInMs = :granularityInMs and importance > :importance and a.startMs>= :startMs and a.startMs < :endMs", nativeQuery = true)

	public List<BigInteger> findListForResult(@Param("strategy") String strategy, @Param("exchange") String exchange,
			@Param("symbol") String symbol, @Param("granularityInMs") Long granularityInMs,
			@Param("importance") Double importance, @Param("startMs") Long startMs, @Param("endMs") Long endMs);

	@Query(value = "SELECT DISTINCT strategyName FROM strategy", nativeQuery = true)
	public List<String> findAllStrategyName();
}
