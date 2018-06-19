package com.trading.strategy.analytics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trading.strategy.analytics.model.Strategy;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StrategyRepository extends JpaRepository<Strategy, Long> {

}
