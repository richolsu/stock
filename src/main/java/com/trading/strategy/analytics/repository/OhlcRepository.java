package com.trading.strategy.analytics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.trading.strategy.analytics.model.ExchangeSymbolItem;
import com.trading.strategy.analytics.model.HistoryResult;
import com.trading.strategy.analytics.model.Ohlc;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OhlcRepository extends JpaRepository<Ohlc, Long> {

	@Query(value = "SELECT a.startMs, a.open, a.low, a.high, a.close, a.volume FROM OHLC a "
			+ "where a.exchange = :exchange and a.symbol = :symbol and a.granularityInMs = :granularityInMs and a.startMs>= :startMs and a.startMs < :endMs order by startMs", nativeQuery = true)

	public List<HistoryResult> findAllForHistory(@Param("exchange") String exchange, @Param("symbol") String symbol,
			@Param("granularityInMs") Long granularityInMs, @Param("startMs") Long startMs, @Param("endMs") Long endMs);

	@Query(value = "SELECT a.startMs, a.open, a.low, a.high, a.close, a.volume, b.count FROM OHLC a "
			+ "left join (select count(*) count, (round(startms/ :granularityInMs,0)* :granularityInMs) groupStartMs from strategy where strategyName= :strategy and granularityInMs= :groupSize and exchange= :exchange and importance> :importance and  symbol= :symbol group by (round(startms/:granularityInMs,0)*:granularityInMs) ) b "
			+ "on a.startMs = b.groupStartMs "
			+ "where a.exchange = :exchange and a.symbol = :symbol and a.granularityInMs = :granularityInMs and a.startMs>= :startMs and a.startMs < :endMs order by startMs", nativeQuery = true)

	public List<HistoryResult> findAllForHistory2(@Param("strategy") String strategy,
			@Param("groupSize") Long groupSize, @Param("exchange") String exchange, @Param("symbol") String symbol,
			@Param("granularityInMs") Long granularityInMs, @Param("importance") Double importance,
			@Param("startMs") Long startMs, @Param("endMs") Long endMs);

	@Query(value = "SELECT DISTINCT exchange, symbol, granularityInMs  FROM OHLC", nativeQuery = true)
	public List<ExchangeSymbolItem> findAllExchangeSymbol();
}
