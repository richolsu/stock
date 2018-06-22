package com.trading.strategy.analytics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.trading.strategy.analytics.model.HistoryResult;
import com.trading.strategy.analytics.model.Ohlc;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OhlcRepository extends JpaRepository<Ohlc, Long> {

	@Query(value = "SELECT a.startMs, a.open, a.low, a.high, a.close, a.volume, b.importance, b.count FROM ohlc a "
			+ "left join strategy b on a.exchange=b.exchange and a.symbol=b.symbol and a.granularityInMs=b.granularityInMs and a.startMs=b.startMs and b.strategyName= :strategy and b.importance> :importance "
			+ "where a.exchange = :exchange and a.symbol = :symbol and a.granularityInMs = :granularityInMs and a.startMs> :startMs and a.startMs < :endMs order by startMs", nativeQuery = true)

	public List<HistoryResult> findAllForHistory(@Param("strategy") String strategy, @Param("exchange") String exchange,
			@Param("symbol") String symbol, @Param("granularityInMs") Long granularityInMs,
			@Param("importance") Double importance, @Param("startMs") Long startMs, @Param("endMs") Long endMs);

}
